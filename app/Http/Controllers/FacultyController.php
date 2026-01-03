<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index(Request $request)
    {
        $query = Faculty::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->input('search').'%');
        }

        $faculties = $query->take(10)->get();

        return response()->json([
            'faculties' => $faculties,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:faculties,name',
        ]);

        $faculty = Faculty::create($data);

        if ($request->wantsJson() && ! $request->header('X-Inertia')) {
            return response()->json([
                'faculty' => $faculty,
                'message' => 'Faculty added successfully.',
            ], 201);
        }

        return redirect()->back()->with([
            'success' => 'Faculty added successfully.',
        ]);
    }

    public function getFacultiesList(Request $request)
    {
        $query = $request->input('query');
        $faculties = Faculty::orderBy('name', 'asc')
            ->when($query, fn ($q) => $q->where('name', 'like', "%{$query}%"))
            ->take(12)
            ->get();

        return response()->json($faculties);
    }

    public function destroy(Faculty $faculty)
    {
        if ($faculty->courses()->count() > 0) {
            return redirect()->back()->with([
                'success' => false,
                'message' => 'Cannot delete faculty with associated courses.',
            ]);
        }

        $faculty->delete();

        return redirect()->back()->with([
            'success' => true,
            'message' => 'Faculty deleted successfully.',
        ]);
    }
}
