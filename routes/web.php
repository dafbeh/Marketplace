<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Middleware\AdminOnly;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavouritesController;
use App\Http\Controllers\NFTController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/collection/{id}', [DashboardController::class, 'show'])->name('collection.show');

    Route::get('/items/{slug}/{address}/{id}', [ItemController::class, 'show'])->name('items.show');
    
    Route::post('/items/buy/{item}', [OrderController::class, 'create'])->name('orders.create');

    Route::get('/orders', [OrderController::class, 'show'])->name('orders.show');

    Route::get('/favourites', [FavouritesController::class, 'show'])->name('favourites.show');

    Route::post('/items/favourites', [FavouritesController::class, 'store'])->name('favourites.store');

    Route::delete('/favourites/delete/{id}', [FavouritesController::class, 'delete'])->name('favourites.delete');

    Route::delete('/orders/delete/{order}', [OrderController::class, 'delete'])->name('orders.delete');

    Route::get('/MyNft', [NFTController::class, 'show'])->name('nft.show');
});

Route::middleware(['auth', 'verified', AdminOnly::class])->group(function () {
        Route::get('/items/create', function () {
        return Inertia::render('Create');
    })->name('items.create');

    Route::post('/items', [ItemController::class, 'store'])->name('items.store');

    Route::delete('/items/delete/{item}', [ItemController::class, 'delete'])->name('items.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';