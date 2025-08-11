<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
        ]);

        $validated['user_id'] = auth()->id();

        DB::table('items')->insert($validated);

        return redirect()->route('dashboard')->with('success', 'Item created successfully');
    }

    public function delete($item)
    {
        $userId = auth()->id();

        DB::table('items')
            ->where('id', $item)
            ->where('user_id', $userId)
            ->delete();

        return redirect()->route('dashboard')->with('success', 'Item deleted successfully');
    }

    public function show($slug, $address, $id)
    {
        $isFavourite = DB::table('favourites')
            ->where('user_id', auth()->id())
            ->where('nft_id', $id)
            ->where('address', $address)
            ->exists();

        return Inertia::render('Item', [
            'address' => $address,
            'id' => $id,
            'slug' => $slug,
            'favourited' => $isFavourite,
        ]);
    }
}