<?php

namespace App\Http\Controllers;

use App\Models\University;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // get universities in random order
        $universities = University::inRandomOrder()->limit(18)->get();

        return Inertia::render('public/home/index',[
            'universities' => $universities
        ]);
    }

    public function adminIndex()
    {
        return Inertia::render('admin/dashboard');
    }
}
