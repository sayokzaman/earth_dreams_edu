<?php

use App\Http\Controllers\BlogsController;
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

    Route::prefix('/blogs')->name('blogs.')->group(function () {
        Route::get('/', [BlogsController::class, 'index'])->name('index');
        Route::get('/{blog}', [BlogsController::class, 'show'])->name('show');
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
        Route::get('/', [DashboardController::class, 'adminIndex'])->name('dashboard');

        Route::prefix('/blogs')->name('admin.blogs.')->group(function () {
            Route::get('/', [BlogsController::class, 'adminIndex'])->name('index');
            Route::get('/create', [BlogsController::class, 'adminCreate'])->name('create');
            Route::post('/', [BlogsController::class, 'store'])->name('store');
            Route::get('/{blog}', [BlogsController::class, 'adminShow'])->name('show');
            Route::post('/{blog}/update', [BlogsController::class, 'update'])->name('update');
        });
    });
});

require __DIR__.'/settings.php';
