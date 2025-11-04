<?php

namespace App\Http\Controllers;

class StudyInUKController extends Controller
{
    public function index()
    {
        return inertia('public/study-in-uk/index');
    }

    public function whyStudyInUK()
    {
        return inertia('public/study-in-uk/why-study-in-uk');
    }

    public function canStudy()
    {
        return inertia('public/study-in-uk/what-i-can-study');
    }

    public function january()
    {
        return inertia('public/study-in-uk/intakes/january');
    }

    public function may()
    {
        return inertia('public/study-in-uk/intakes/may');
    }

    public function september()
    {
        return inertia('public/study-in-uk/intakes/september');
    }

    public function costOfStudy()
    {
        return inertia('public/study-in-uk/cost-of-study');
    }

    public function ucas()
    {
        return inertia('public/study-in-uk/ucas');
    }

    public function studentEssentials()
    {
        return inertia('public/study-in-uk/student-essentials');
    }
}
