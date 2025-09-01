<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

$publicDomain = config('app.domain');
$adminDomain = config('app.admin_domain');

/*
|--------------------------------------------------------------------------
| Public Routes (earthdreamsedu.com)
|--------------------------------------------------------------------------
*/
Route::domain($publicDomain)->group(function () {
    Route::get('/', [PublicController::class, 'home'])->name('home');
    // Route::get('/about', [PublicController::class, 'about'])->name('about');
    // Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
});

/*
|--------------------------------------------------------------------------
| Admin Routes (admin.earthdreamsedu.com)
|--------------------------------------------------------------------------
*/
Route::domain($adminDomain)->group(function () {
    require __DIR__.'/auth.php'; // keep auth routes here

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        // Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    });
});

require __DIR__.'/settings.php';
