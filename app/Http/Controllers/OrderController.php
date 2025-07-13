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

        return Inertia::render('Success', [
            'message' => 'Order placed successfully.',
        ]);
    }

    public function show() {
        $userId = auth()->id();
        
        $orders = DB::table('orders')
            ->join('items', 'orders.item_id', '=', 'items.id')
            ->where('orders.user_id', $userId)
            ->select(
                'orders.id',
                'items.name as item_name',
                'items.price as item_price',
            )
            ->orderBy('orders.id', 'desc')
            ->get();


        return Inertia::render('Orders', ['orders' => $orders]);
    }
}