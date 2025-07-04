<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Middleware\AdminOnly;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/items/{item}', [ItemController::class, 'show'])->name('items.show');
});

Route::middleware(['auth', 'verified', AdminOnly::class])->group(function () {
        Route::get('/items/create', function () {
        return Inertia::render('Create');
    })->name('items.create');

    Route::post('/items', [ItemController::class, 'store'])->name('items.store');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';