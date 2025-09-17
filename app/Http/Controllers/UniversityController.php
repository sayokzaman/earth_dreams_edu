<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class UniversityController extends Controller
{
    public function index()
    {
        return Inertia::render('public/universities/index');
    }

    public function show($university)
    {
        return Inertia::render('public/universities/show', [
            'university' => $university,
        ]);
    }
}
