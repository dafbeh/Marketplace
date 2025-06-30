<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $items = DB::table('items')->get();

        return Inertia::render('dashboard', [
            'items' => $items
        ]);
    }
}
