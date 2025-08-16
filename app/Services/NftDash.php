<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class NftDash
{
    public function getDashNFT()
    {
        return Cache::remember('nfts', now()->addMinutes(30), function () {
            try {
                $response = Http::withHeaders([
                    'x-api-key' => config('services.opensea.key'),
                ])->get('https://api.opensea.io/api/v2/collections', [
                    'chain' => 'ethereum',
                    'order_by' => 'market_cap',
                    'order_direction' => 'desc',
                    'limit' => '10',
                ]);

                if (!$response->successful()) {
                    \Log::error('OpenSea API error: ' . $response->body());
                    return Cache::get('nfts');
                }

                $array = $response->json();

                if (!isset($array['collections']) || !is_array($array['collections'])) {
                    return $array;
                }

                $statsResponses = Http::pool(function ($pool) use ($array) {
                    foreach ($array['collections'] as $item) {
                        if (isset($item['collection'])) {
                            $pool->withHeaders([
                                'x-api-key' => config('services.opensea.key'),
                            ])->get("https://api.opensea.io/api/v2/collections/{$item['collection']}/stats");
                        }
                    }
                });

                $i = 0;
                foreach ($array['collections'] as $key => $item) {
                    if (isset($item['collection'])) {
                        $dataResponse = $statsResponses[$i] ?? null;
                        if ($dataResponse && $dataResponse->successful()) {
                            $data = $dataResponse->json();
                            $array['collections'][$key]['floor_price'] = $data['total']['floor_price'] ?? null;
                            $array['collections'][$key]['owners'] = $data['total']['num_owners'] ?? null;
                        } else {
                            $array['collections'][$key]['floor_price'] = null;
                            $array['collections'][$key]['owners'] = null;
                        }
                        $i++;
                    }
                }

                return $array;

            } catch (\Exception $e) {
                \Log::error('Error fetching NFTs: ' . $e->getMessage());
                return Cache::get('nfts');
            }
        });
    }
}