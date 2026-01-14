<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Course;
use App\Models\Lead;
use App\Models\University;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $universities = University::inRandomOrder()->limit(24)->get();

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
        // Get date ranges
        $today = Carbon::today();
        $lastWeek = Carbon::today()->subWeek();
        $lastMonth = Carbon::today()->subMonth();

        // Total counts
        $stats = [
            'universities' => [
                'total' => University::count(),
                'new_this_week' => University::where('created_at', '>=', $lastWeek)->count(),
                'new_this_month' => University::where('created_at', '>=', $lastMonth)->count(),
            ],
            'courses' => [
                'total' => Course::count(),
                'new_this_week' => Course::where('created_at', '>=', $lastWeek)->count(),
                'new_this_month' => Course::where('created_at', '>=', $lastMonth)->count(),
            ],
            'blogs' => [
                'total' => Blog::count(),
                'new_this_week' => Blog::where('created_at', '>=', $lastWeek)->count(),
                'new_this_month' => Blog::where('created_at', '>=', $lastMonth)->count(),
                'by_type' => Blog::select('type', DB::raw('count(*) as count'))
                    ->groupBy('type')
                    ->pluck('count', 'type'),
            ],
            'leads' => [
                'total' => Lead::count(),
                'new_this_week' => Lead::where('created_at', '>=', $lastWeek)->count(),
                'new_this_month' => Lead::where('created_at', '>=', $lastMonth)->count(),
                'by_study_type' => Lead::select('study_type', DB::raw('count(*) as count'))
                    ->groupBy('study_type')
                    ->pluck('count', 'study_type'),
            ],
            'users' => [
                'total' => User::count(),
                'new_this_week' => User::where('created_at', '>=', $lastWeek)->count(),
                'new_this_month' => User::where('created_at', '>=', $lastMonth)->count(),
            ],
        ];

        // Recent activities
        $recentUniversities = University::latest()->take(5)->get(['id', 'name', 'location', 'created_at']);
        $recentCourses = Course::with('faculty:id,name')->latest()->take(5)->get(['id', 'faculty_id', 'title', 'study_level', 'created_at']);
        $recentBlogs = Blog::with(['author:id,name', 'category:id,name'])->latest()->take(5)->get(['id', 'title', 'type', 'author_id', 'category_id', 'created_at']);
        $recentLeads = Lead::latest()->take(5)->get(['id', 'first_name', 'last_name', 'email', 'study_type', 'created_at']);
        $recentUsers = User::with('roles:name')->latest()->take(5)->get(['id', 'name', 'email', 'created_at']);

        // Monthly trends (last 6 months)
        $monthlyData = [];
        for ($i = 0; $i <= 5; $i++) {
            $month = Carbon::now()->subMonths($i);
            $startOfMonth = $month->copy()->startOfMonth();
            $endOfMonth = $month->copy()->endOfMonth();

            $monthlyData[] = [
                'month' => $month->format('M Y'),
                'universities' => University::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
                'courses' => Course::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
                'blogs' => Blog::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
                'leads' => Lead::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
                'users' => User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count(),
            ];
        }

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentUniversities' => $recentUniversities,
            'recentCourses' => $recentCourses,
            'recentBlogs' => $recentBlogs,
            'recentLeads' => $recentLeads,
            'recentUsers' => $recentUsers,
            'monthlyData' => $monthlyData,
        ]);
    }
}
