<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class NftDash
{
    public function getDashNFT()
    {
        return Cache::remember('top_nfts', now()->addMinutes(30), function () {
            try {
                $response = Http::withHeaders([
                    'x-api-key' => config('services.opensea.key'),
                ])->get('https://api.opensea.io/api/v2/collections', [
                    'chain' => 'ethereum',
                    'order_by' => 'market_cap',
                    'order_direction' => 'desc',
                    'limit' => 10
                ]);
            
                if ($response->successful()) {
                    return $response->json();
                }
            
                \Log::error('OpenSea API error: ' . $response->body());
                return null;
            
            } catch (\Exception $e) {
                \Log::error('Error fetching NFTs: ' . $e->getMessage());
                return null;
            }
        });
    }
}