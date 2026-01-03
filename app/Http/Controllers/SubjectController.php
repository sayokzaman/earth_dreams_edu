<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Subject::query();

        if ($request->filled('search')) {
            $query->where('subject_name', 'like', '%'.$request->input('search').'%');
        }

        $subjects = $query->take(10)->get();

        return response()->json([
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject_name' => 'required|string|max:255|unique:subjects,subject_name',
        ]);

        $subject = Subject::create($data);

        if ($request->wantsJson() && ! $request->header('X-Inertia')) {
            return response()->json([
                'subject' => $subject,
                'message' => 'Subject added successfully.',
            ], 201);
        }

        return redirect()->back()->with([
            'success' => 'Subject added successfully.',
        ]);
    }

    public function getSubjectsList(Request $request)
    {
        $query = $request->input('query');
        $subjects = Subject::orderBy('subject_name', 'asc')
            ->when($query, fn ($q) => $q->where('subject_name', 'like', "%{$query}%"))
            ->get();

        return response()->json([
            'subjects' => $subjects,
        ]);
    }
}
