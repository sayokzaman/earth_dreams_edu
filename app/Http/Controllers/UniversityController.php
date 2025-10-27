<?php

namespace App\Http\Controllers;

use App\Models\University;
use App\Models\UniversityContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UniversityController extends Controller
{
    public function index()
    {
        return Inertia::render('public/universities/index', [
            'universities' => University::all(),
        ]);
    }

    public function adminIndex()
    {
        $universities = University::query()
            ->orderBy('created_at', 'desc');

        $universities = $universities->paginate($request->per_page ?? 20);

        return Inertia::render('admin/universities/index', [
            'universities' => $universities,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/universities/create');
    }

    public function show($name)
    {
        $university = University::where('name', $name)->firstOrFail();

        return Inertia::render('public/universities/show', [
            'university' => $university->load('contents'),
        ]);
    }

    public function adminShow(University $university)
    {
        return inertia('admin/universities/show', [
            'university' => $university->load('contents'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:universities,name',
            'location' => 'required|string|max:255',
            'location_url' => 'required|url',
            'logo' => 'required|image|max:2048',
            'cover' => 'required|image|max:2048',
            'founded' => 'required|string|max:255',
            'guardian_ranking' => 'nullable|string|max:255',
            'world_ranking' => 'nullable|string|max:255',
            'qs_ranking' => 'nullable|string|max:255',
            'scholarship' => 'nullable|string|max:255',
            'content' => 'required|array|min:1',
            'content.*.type' => 'required|in:text,video',
            'content.*.section' => 'required|string|max:255',
            'content.*.heading' => 'nullable|string|max:255',
            'content.*.paragraph' => 'nullable|string',
            'content.*.video_url' => 'nullable|url',
        ]);

        $logo_path = null;
        if ($request->hasFile('logo')) {
            $logo_path = $request->file('logo')->store('universities/logos', 'public');
        }

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('universities/covers', 'public');
        }

        DB::transaction(function () use ($validated, $logo_path, $coverPath) {
            $university = University::create([
                'created_by' => Auth::user()->id,
                'name' => $validated['name'],
                'location' => $validated['location'],
                'location_url' => $validated['location_url'],
                'logo' => $logo_path,
                'cover' => $coverPath,
                'founded' => $validated['founded'],
                'guardian_ranking' => $validated['guardian_ranking'],
                'world_ranking' => $validated['world_ranking'],
                'qs_ranking' => $validated['qs_ranking'],
                'scholarship' => $validated['scholarship'],
            ]);

            // ✅ save content sections
            foreach ($validated['content'] as $section) {
                UniversityContent::create([
                    'university_id' => $university->id,
                    'type' => $section['type'],
                    'section' => $section['section'],
                    'heading' => $section['heading'] ?? null,
                    'paragraph' => $section['paragraph'] ?? null,
                    'video_url' => $section['video_url'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.universities.index')->with('success', 'University created successfully!');
    }

    public function update(Request $request, University $university)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:universities,name',
            'location' => 'required|string|max:255',
            'location_url' => 'required|url',
            'logo' => 'nullable|image|max:2048',
            'cover' => 'nullable|image|max:2048',
            'founded' => 'required|string|max:255',
            'guardian_ranking' => 'nullable|string|max:255',
            'world_ranking' => 'nullable|string|max:255',
            'qs_ranking' => 'nullable|string|max:255',
            'scholarship' => 'nullable|string|max:255',
            'content' => 'required|array|min:1',
            'content.*.type' => 'required|in:text,video',
            'content.*.section' => 'required|string|max:255',
            'content.*.heading' => 'nullable|string|max:255',
            'content.*.paragraph' => 'nullable|string',
            'content.*.video_url' => 'nullable|url',
        ]);

        $logo_path = $university->logo; // keep old one by default
        if ($request->hasFile('logo')) {
            // delete old logo if exists
            if ($university->logo && Storage::disk('public')->exists($university->logo)) {
                Storage::disk('public')->delete($university->logo);
            }

            $logo_path = $request->file('logo')->store('universities/logos', 'public');
        }

        $coverPath = $university->cover; // keep old one by default
        if ($request->hasFile('cover')) {
            // delete old cover if exists
            if ($university->cover && Storage::disk('public')->exists($university->cover)) {
                Storage::disk('public')->delete($university->cover);
            }

            $coverPath = $request->file('cover')->store('universities/covers', 'public');
        }

        DB::transaction(function () use ($validated, $logo_path, $coverPath, $university) {
            $university->update([
                'name' => $validated['name'],
                'location' => $validated['location'],
                'location_url' => $validated['location_url'],
                'logo' => $logo_path,
                'cover' => $coverPath,
                'founded' => $validated['founded'],
                'guardian_ranking' => $validated['guardian_ranking'],
                'world_ranking' => $validated['world_ranking'],
                'qs_ranking' => $validated['qs_ranking'],
                'scholarship' => $validated['scholarship'],
            ]);

            $university->contents()->delete();

            // ✅ save content sections
            foreach ($validated['content'] as $section) {
                $university->contents()->create([
                    'type' => $section['type'],
                    'section' => $section['section'],
                    'heading' => $section['heading'] ?? null,
                    'paragraph' => $section['paragraph'] ?? null,
                    'video_url' => $section['video_url'] ?? null,
                ]);
            }
        });

        return redirect()->route('admin.universities.index')->with('success', 'University updated successfully!');
    }
}
