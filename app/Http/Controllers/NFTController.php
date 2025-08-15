<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NFTController extends Controller
{
    function show() {
        return Inertia::render('MyNft');
    }

    function showIndv($address) {
        return Inertia::render('MyNft', [
            'input' => $address,
        ]);
    }
}
