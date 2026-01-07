<?php

namespace App\Http\Controllers;

class ServicesController extends Controller
{
    public function studentAccommodation()
    {
        return inertia('public/services/student-accommodation');
    }

    public function travelSupport()
    {
        return inertia('public/services/travel-support');
    }
}
