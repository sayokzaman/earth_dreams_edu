<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UniversityController;
use Illuminate\Support\Facades\Route;

$publicDomain = config('app.domain');
$adminDomain = config('app.admin_domain');

/*
|--------------------------------------------------------------------------
| Public Routes (earthdreamsedu.com)
|--------------------------------------------------------------------------
*/
Route::domain($publicDomain)->name('public.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::prefix('/universities')->name('universities.')->group(function () {
        Route::get('/', [UniversityController::class, 'index'])->name('index');
        Route::get('/{university}', [UniversityController::class, 'show'])->name('show');
    });
});

/*
|--------------------------------------------------------------------------
| Admin Routes (admin.earthdreamsedu.com)
|--------------------------------------------------------------------------
*/
Route::domain($adminDomain)->group(function () {
    require __DIR__.'/auth.php'; // keep auth routes here

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [DashboardController::class, 'adminIndex'])->name('admin.dashboard');
        // Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    });
});

require __DIR__.'/settings.php';
