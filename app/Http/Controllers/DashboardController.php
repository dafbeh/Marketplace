<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard');
    }

    public function show($id)
    {
        return Inertia::render('NFTBoard', [
            'id' => $id,
        ]);
    }
}
