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
                'slug',
                'address',
                'nft_id',
                'image_url',
                'created_at'
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Favourites', [
            'items' => $favourites,
            'reload' => now()->toDateTimeString(),
        ]);
    }

    public function store(Request $request)
    {
        $userId = auth()->id();

        $validated = $request->validate([
            'address' => 'required|string',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'nft_id' => 'required|numeric',
            'image_url' => 'required|string',
        ]);

        $existing = DB::table('favourites')
            ->where('user_id', $userId)
            ->where('nft_id', $validated['nft_id'])
            ->where('address', $validated['address'])
            ->first();

        if ($existing) {
            DB::table('favourites')
            ->where('id', $existing->id)
            ->delete();
            return;
        }

        DB::table('favourites')->insert([
            'user_id' => $userId,
            'address' => $validated['address'],
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'nft_id' => $validated['nft_id'],
            'image_url' => $validated['image_url'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function delete($id) {
        DB::table('favourites')
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->delete();
    }
}