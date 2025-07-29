<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class NftDash
{
    public function getDashNFT() {
        return Cache::remember('top_nfts', now()->addMinutes(30), function () {
            $response = Http::withHeaders([
                'x-api-key' => config('services.opensea.key'),
            ])->get('https://api.opensea.io/api/v2/collections', [
                'chain' => 'ethereum',
                'order_by' => 'market_cap',
                'order_direction' => 'desc'
            ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
        });
    }
}
