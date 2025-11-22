<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\University;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $universities = University::inRandomOrder()->limit(18)->get();

        $blogs = Blog::where('type', 'blog')->latest()->limit(3)->with('contents')->get();
        $news = Blog::where('type', 'news')->latest()->limit(3)->with('contents')->get();

        return Inertia::render('public/home/index', [
            'universities' => $universities,
            'blogs' => $blogs,
            'news' => $news,
        ]);
    }

    public function adminIndex()
    {
        return Inertia::render('admin/dashboard');
    }
}
