<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index()
    {
        //
    }

    public function adminIndex()
    {
        $courses = Course::with('faculty')->paginate(10);

        return inertia('admin/courses/index', [
            'courses' => $courses,
            'filters' => request()->all('search', 'trashed'),
        ]);
    }

    public function create()
    {
        return inertia('admin/courses/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'title' => 'required|string|max:255',
            'study_level' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'cover' => 'nullable|image|max:2048',
            'contents' => 'required|array',
            'contents.*.type' => 'required|in:text,video',
            'contents.*.section' => 'required|string|max:255',
            'contents.*.heading' => 'nullable|string|max:255',
            'contents.*.paragraph' => 'nullable|string',
            'contents.*.video_url' => 'nullable|url',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('courses/covers', 'public');
        }

        DB::transaction(function () use ($data, $coverPath) {
            $course = Course::create([
                'faculty_id' => $data['faculty_id'],
                'title' => $data['title'],
                'study_level' => $data['study_level'],
                'duration' => $data['duration'],
                'cover' => $coverPath,
            ]);

            foreach ($data['contents'] as $contentItem) {
                $course->contents()->create([
                    'type' => $contentItem['type'],
                    'section' => $contentItem['section'],
                    'heading' => $contentItem['heading'] ?? null,
                    'paragraph' => $contentItem['paragraph'] ?? null,
                    'video_url' => $contentItem['video_url'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function adminShow(Course $course)
    {
        return inertia('admin/courses/show', [
            'course' => $course->load('faculty', 'contents'),
        ]);
    }

    public function update(Course $course, Request $request)
    {
        $data = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'title' => 'required|string|max:255|unique:courses,title,'.$course->id,
            'study_level' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'cover' => 'nullable|image|max:2048',
            'contents' => 'required|array',
            'contents.*.type' => 'required|in:text,video',
            'contents.*.section' => 'required|string|max:255',
            'contents.*.heading' => 'nullable|string|max:255',
            'contents.*.paragraph' => 'nullable|string',
            'contents.*.video_url' => 'nullable|url',
        ]);

        $coverPath = $course->cover;
        if ($request->hasFile('cover')) {
            // delete old cover if exists
            if ($course->cover && Storage::disk('public')->exists($course->cover)) {
                Storage::disk('public')->delete($course->cover);
            }

            $coverPath = $request->file('cover')->store('courses/covers', 'public');
        }

        DB::transaction(function () use ($course, $data, $coverPath) {
            $course->update([
                'faculty_id' => $data['faculty_id'],
                'title' => $data['title'],
                'study_level' => $data['study_level'],
                'duration' => $data['duration'],
                'cover' => $coverPath,
            ]);

            $course->contents()->delete();

            foreach ($data['contents'] as $contentItem) {
                $course->contents()->create([
                    'type' => $contentItem['type'],
                    'section' => $contentItem['section'],
                    'heading' => $contentItem['heading'] ?? null,
                    'paragraph' => $contentItem['paragraph'] ?? null,
                    'video_url' => $contentItem['video_url'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }
}
