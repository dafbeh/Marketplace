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
                'name',
                'address',
                'nft_id',
                'image_url',
                'created_at'
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Favourites', ['items' => $favourites]);
    }

    public function store(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'address' => 'required|string',
            'name' => 'required|string|max:255',
            'nft_id' => 'required|numeric',
            'image_url' => 'required|string',
        ]);

        DB::table('favourites')->insert([
            'user_id' => $userId,
            'address' => $validated['address'],
            'name' => $validated['name'],
            'nft_id' => $validated['nft_id'],
            'image_url' => $validated['image_url'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}