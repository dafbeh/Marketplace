<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $userId = auth()->id();
        
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'total_price' => 'required|numeric',
        ]);

        DB::table('orders')->insert([
            'item_id' => $validated['item_id'],
            'user_id' => $userId,
            'total_price' => $validated['total_price'],
        ]);

        return Inertia::location('/dashboard')->with('success', 'Order created successfully!');
    }
}