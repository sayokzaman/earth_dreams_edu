<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('blogs');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->input('search').'%');
        }

        $categories = $query->take(10)->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        $category = Category::create($data);

        if ($request->wantsJson() && ! $request->header('X-Inertia')) {
            return response()->json([
                'category' => $category,
                'message' => 'Category added successfully.',
            ], 201);
        }

        return redirect()->back()->with([
            'success' => 'Category added successfully.',
        ]);
    }

    public function destroy(Category $category)
    {
        if ($category->blogs()->count() > 0) {
            return redirect()->back()->with([
                'success' => false,
                'message' => 'Cannot delete category with associated blogs.',
            ]);
        }

        $category->delete();

        return redirect()->back()->with([
            'success' => true,
            'message' => 'Category deleted successfully.',
        ]);
    }
}
