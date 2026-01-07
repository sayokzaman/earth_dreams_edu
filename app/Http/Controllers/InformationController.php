<?php

namespace App\Http\Controllers;

class InformationController extends Controller
{
    public function aboutUs()
    {
        return inertia('public/information/about-us');
    }

    public function howWeOperate()
    {
        return inertia('public/information/how-we-operate');
    }

    public function offices()
    {
        return inertia('public/information/offices');
    }

    public function successStories()
    {
        return inertia('public/information/success-stories');
    }
}
