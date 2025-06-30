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
            'sku' => 'nullable|string|max:255|unique:items,sku',
        ]);

        DB::table('items')->insert($validated);

        return redirect()->route('dashboard')->with('success', 'Item created successfully');
    }
}