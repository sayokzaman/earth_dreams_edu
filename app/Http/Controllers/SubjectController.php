<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function getSubjects(Request $request)
    {
        $query = $request->input('query');
        $subjects = Subject::orderBy('subject_name', 'asc')
            ->when($query, fn ($q) => $q->where('subject_name', 'like', "%{$query}%"))
            ->get();

        return response()->json($subjects);
    }
}
