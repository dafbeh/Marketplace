<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Success', [
            'message' => 'Order placed successfully.',
        ]);
    }

    public function delete($order) {
        $userId = auth()->id();

        $orderId = $order;

        DB::table('orders')
            ->where('id', $orderId)
            ->where('user_id', $userId)
            ->delete();
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