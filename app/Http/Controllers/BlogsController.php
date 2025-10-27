<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BlogsController extends Controller
{
    public function index()
    {
        return inertia('public/blogs/index', [
            'blogs' => Blog::query()->with('contents')->orderBy('created_at', 'desc')->get(),
        ]);
    }

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
            ->with('author')
            ->with('contents');

        $blogs = $blogs->paginate($request->per_page ?? 20);

        return inertia('admin/blogs/index', [
            'blogs' => $blogs,
        ]);
    }

    public function adminCreate()
    {
        return inertia('admin/blogs/create');
    }

    public function show(Blog $blog)
    {
        return inertia('public/blogs/show', [
            'blog' => $blog->load('contents'),
        ]);
    }

    public function adminShow(Blog $blog)
    {
        return inertia('admin/blogs/show', [
            'blog' => $blog->load('author')->load('contents'),
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'type' => 'required|in:blog,news,event',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'cover_img' => 'nullable|image|max:2048', // optional image
            'content' => 'required|array|min:1',
            'content.*.type' => 'required|in:text,video',
            'content.*.section' => 'required|string|max:255',
            'content.*.heading' => 'nullable|string|max:255',
            'content.*.paragraph' => 'nullable|string',
            'content.*.video_url' => 'nullable|url',
        ]);

        // ✅ upload cover image if present
        $coverPath = null;
        if ($request->hasFile('cover_img')) {
            $coverPath = $request->file('cover_img')->store('blogs', 'public');
        }

        // ✅ create blog
        DB::transaction(function () use ($validated, $coverPath, $request) {
            $blog = Blog::create([
                'author_id' => Auth::user()->id,
                'type' => $validated['type'],
                'title' => $validated['title'],
                'cover_img' => $coverPath,
                'category' => $validated['category'],
                'date' => now(),
            ]);

            // ✅ save content sections
            foreach ($request['content'] as $section) {
                BlogContent::create([
                    'blog_id' => $blog->id,
                    'type' => $section['type'],
                    'section' => $section['section'],
                    'heading' => $section['heading'] ?? null,
                    'paragraph' => $section['paragraph'] ?? null,
                    'video_url' => $section['video_url'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created successfully!');
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'type' => 'required|in:blog,news,event',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'cover_img' => 'nullable|image|max:2048', // optional new image
            'content' => 'required|array|min:1',
            'content.*.type' => 'required|in:text,video',
            'content.*.section' => 'required|string|max:255',
            'content.*.heading' => 'nullable|string|max:255',
            'content.*.paragraph' => 'nullable|string',
            'content.*.video_url' => 'nullable|url',
        ]);

        // ✅ upload new cover image if provided
        $coverPath = $blog->cover_img; // keep old one by default
        if ($request->hasFile('cover_img')) {
            // delete old cover if exists
            if ($blog->cover_img && Storage::disk('public')->exists($blog->cover_img)) {
                Storage::disk('public')->delete($blog->cover_img);
            }

            $coverPath = $request->file('cover_img')->store('blogs', 'public');
        }

        // ✅ update blog info
        DB::transaction(function () use ($validated, $coverPath, $blog) {
            $blog->update([
                'type' => $validated['type'],
                'title' => $validated['title'],
                'cover_img' => $coverPath,
                'category' => $validated['category'],
                'date' => now(), // you can keep old $blog->date if preferred
            ]);

            // ✅ replace existing content sections
            $blog->contents()->delete(); // assuming Blog has `contents()` relationship

            foreach ($validated['content'] as $section) {
                $blog->contents()->create([
                    'type' => $section['type'],
                    'section' => $section['section'],
                    'heading' => $section['heading'] ?? null,
                    'paragraph' => $section['paragraph'] ?? null,
                    'video_url' => $section['video_url'] ?? null,
                ]);
            }
        });

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog updated successfully!');
    }
}
