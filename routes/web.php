<?php

use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\StudyInUKController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\UserController;
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
        Route::get('/russell-group-universities', [UniversityController::class, 'russellGroup'])->name('russellGroup');
        Route::get('/rankings', [UniversityController::class, 'rankings'])->name('rankings');
        Route::get('/top-universities-in-uk', [UniversityController::class, 'topUniversities'])->name('topUniversities');
        Route::get('/api/list', [UniversityController::class, 'getUniversitiesList'])->name('list');
        Route::get('/{name}', [UniversityController::class, 'show'])->name('show');

    });

    Route::prefix('/courses')->name('courses.')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('index');
        Route::get('/foundation-courses', [CourseController::class, 'foundationCourses'])->name('foundationCourses');
        Route::get('/undergraduate-courses', [CourseController::class, 'undergraduateCourses'])->name('undergraduateCourses');
        Route::get('/masters-courses', [CourseController::class, 'mastersCourses'])->name('mastersCourses');
        Route::get('/top-up-courses', [CourseController::class, 'topUpCourses'])->name('topUpCourses');
        Route::get('/phd-courses', [CourseController::class, 'phdCourses'])->name('phdCourses');
        Route::get('/api/list', [CourseController::class, 'getCoursesList'])->name('list');
        Route::get('/{course}', [CourseController::class, 'show'])->name('show');
    });

    Route::prefix('/blogs')->name('blogs.')->group(function () {
        Route::get('/', [BlogsController::class, 'index'])->name('index');
        Route::get('/api/list', [BlogsController::class, 'getBlogsList'])->name('list');
        Route::get('/{blog}', [BlogsController::class, 'show'])->name('show');
    });

    Route::prefix('/consultation')->name('consultation.')->group(function () {
        Route::get('/', [LeadsController::class, 'index'])->name('index');
        Route::post('/', [LeadsController::class, 'store'])->name('store');
    });

    Route::prefix('/faculties')->name('faculties.')->group(function () {
        Route::get('/api/list', [FacultyController::class, 'getFacultiesList'])->name('list');
    });

    Route::prefix('/subjects')->name('subjects.')->group(function () {
        Route::get('/api/list', [SubjectController::class, 'getSubjectsList'])->name('list');
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
            Route::delete('/{university}', [UniversityController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('/courses')->name('admin.courses.')->group(function () {
            Route::get('/', [CourseController::class, 'adminIndex'])->name('index');
            Route::get('/create', [CourseController::class, 'create'])->name('create');
            Route::post('/', [CourseController::class, 'store'])->name('store');
            Route::get('/{course}', [CourseController::class, 'adminShow'])->name('show');
            Route::post('/{course}/update', [CourseController::class, 'update'])->name('update');
            Route::delete('/{course}', [CourseController::class, 'destroy'])->name('destroy');
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
            Route::get('/{lead}', [LeadsController::class, 'adminShow'])->name('show');
        });

        Route::prefix('/subjects')->name('admin.subjects.')->group(function () {
            Route::get('/', [SubjectController::class, 'getSubjects'])->name('list');
            Route::post('/', [SubjectController::class, 'store'])->name('store');
        });

        Route::middleware('role:super-admin|admin')->group(function () {
            Route::prefix('/users')->name('admin.users.')->group(function () {
                Route::get('/', [UserController::class, 'index'])->name('index');
                Route::post('/', [UserController::class, 'store'])->name('store');
                Route::patch('/{user}/update', [UserController::class, 'update'])->name('update');
                Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
            });
        });
    });

    Route::get('/invite/accept/{token}', [InviteController::class, 'accept'])
        ->name('invites.accept');

    Route::post('/invite/set-password', [InviteController::class, 'setPassword'])
        ->name('invites.setPassword');
});

require __DIR__.'/settings.php';
