<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use App\Services\NftDash;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $nftDash;

    public function __construct(NftDash $nftDash)
    {
        $this->nftDash = $nftDash;
    }

    public function index()
    {
        $topNfts = $this->nftDash->getDashNFT();

        return Inertia::render('dashboard', [
            'topNfts' => $topNfts,
        ]);
    }

    public function show($id)
    {
        return Inertia::render('NFTBoard', [
            'id' => $id,
        ]);
    }
}
