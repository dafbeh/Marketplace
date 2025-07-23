<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FavouritesController extends Controller
{

    public function show()
    {
        $userId = auth()->id();

        $favourites = DB::table('favourites')
            ->where('user_id', $userId)
            ->select(
                'id as favourite_id',
                'address',
                'nft_id',
                'created_at'
            )
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Favourites', ['items' => $favourites]);
    }

    public function store(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'address' => 'required|string',
            'nft_id' => 'required|numeric',
        ]);

        DB::table('favourites')->insert([
            'user_id' => $userId,
            'address' => $validated['address'],
            'nft_id' => $validated['nft_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}