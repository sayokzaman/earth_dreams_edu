<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    public function adminIndex(Request $request)
    {
        $sortableColumns = ['id', 'date'];

        $from = $request->get('from') ?: now()->startOfMonth()->toDateString();
        $to = $request->get('to') ?: now()->endOfMonth()->toDateString();

        $blogs = Blog::query()
            ->whereBetween('date', [$from, $to])
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($query) use ($request) {
                    $query->where('title', 'like', "%{$request->search}%");
                });
            })
            ->when(
                $request->filled('sort_by'),
                function ($q) use ($request, $sortableColumns) {
                    $direction = $request->sort_to === 'desc' ? 'DESC' : 'ASC';

                    if (in_array($request->sort_by, $sortableColumns)) {
                        $q->orderBy($request->sort_by, $direction);
                    } else {
                        $q->orderBy('created_at', 'desc')->orderBy('id', 'desc');
                    }
                },
                fn ($q) => $q->orderBy('created_at', 'desc')->orderBy('id', 'desc')
            )
            ->with('author');

        $blogs = $blogs->paginate($request->per_page ?? 20);

        return inertia('admin/blogs/index', [
            'blogs' => $blogs,
        ]);
    }

    public function adminCreate()
    {
        return inertia('admin/blogs/create');
    }

    public function adminShow(Blog $blog)
    {
        return inertia('admin/blogs/show', [
            'blog' => $blog,
        ]);
    }
}
