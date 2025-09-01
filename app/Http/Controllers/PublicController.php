<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('public/home/index');
    }
}
