<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\StudyInUKController;
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

    Route::prefix('/study-in-uk')->name('study.')->group(function () {
        Route::get('/', [StudyInUKController::class, 'index'])->name('index');
        Route::get('/why-study-in-uk', [StudyInUKController::class, 'whyStudyInUK'])->name('whyStudyInUK');
        Route::get('/what-i-can-study', [StudyInUKController::class, 'canStudy'])->name('canStudy');
        Route::prefix('/intake')->name('intake.')->group(function () {
            Route::get('/january', [StudyInUKController::class, 'january'])->name('january');
            Route::get('/may', [StudyInUKController::class, 'may'])->name('may');
            Route::get('/september', [StudyInUKController::class, 'september'])->name('september');
        });
        Route::get('/cost-of-study', [StudyInUKController::class, 'costOfStudy'])->name('costOfStudy');
        Route::get('/ucas', [StudyInUKController::class, 'ucas'])->name('ucas');
        Route::get('student-essentials', [StudyInUKController::class, 'studentEssentials'])->name('studentEssentials');
    });

    Route::prefix('/universities')->name('universities.')->group(function () {
        Route::get('/', [UniversityController::class, 'index'])->name('index');
        Route::get('/{name}', [UniversityController::class, 'show'])->name('show');
    });
    

    Route::prefix('/courses')->name('courses.')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('index');
    });

    Route::prefix('/blogs')->name('blogs.')->group(function () {
        Route::get('/', [BlogsController::class, 'index'])->name('index');
        Route::get('/{blog}', [BlogsController::class, 'show'])->name('show');
    });

    Route::prefix('/consultation')->name('consultation.')->group(function () {
        Route::get('/', [LeadsController::class, 'index'])->name('index');
        Route::post('/', [LeadsController::class, 'store'])->name('store');
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

        Route::prefix('/universities')->name('admin.universities.')->group(function () {
            Route::get('/', [UniversityController::class, 'adminIndex'])->name('index');
            Route::get('/create', [UniversityController::class, 'create'])->name('create');
            Route::post('/', [UniversityController::class, 'store'])->name('store');
            Route::get('/{university}', [UniversityController::class, 'adminShow'])->name('show');
            Route::post('/{university}/update', [UniversityController::class, 'update'])->name('update');
        });

        Route::prefix('/courses')->name('admin.courses.')->group(function () {
            Route::get('/', [CourseController::class, 'adminIndex'])->name('index');
            Route::get('/create', [CourseController::class, 'create'])->name('create');
            Route::post('/', [CourseController::class, 'store'])->name('store');
            Route::get('/{course}', [CourseController::class, 'adminShow'])->name('show');
            Route::post('/{course}/update', [CourseController::class, 'update'])->name('update');
        });

        Route::prefix('/faculties')->name('admin.faculties.')->group(function () {
            Route::get('/', [FacultyController::class, 'index'])->name('index');
            Route::post('/', [FacultyController::class, 'store'])->name('store');
        });

        Route::prefix('/blogs')->name('admin.blogs.')->group(function () {
            Route::get('/', [BlogsController::class, 'adminIndex'])->name('index');
            Route::get('/create', [BlogsController::class, 'adminCreate'])->name('create');
            Route::post('/', [BlogsController::class, 'store'])->name('store');
            Route::get('/{blog}', [BlogsController::class, 'adminShow'])->name('show');
            Route::post('/{blog}/update', [BlogsController::class, 'update'])->name('update');
        });

        Route::prefix('/leads')->name('admin.leads.')->group(function () {
            Route::get('/', [LeadsController::class, 'adminIndex'])->name('index');
        });
    });
});

require __DIR__.'/settings.php';
