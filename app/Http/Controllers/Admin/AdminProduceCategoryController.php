<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProduceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProduceCategoryController extends Controller
{
    public function index()
    {
        $categories = ProduceCategory::latest()->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_name' => 'required|string|max:255|unique:produce_categories,category_name',
            'description' => 'nullable|string',
        ]);

        ProduceCategory::create($data);

        return back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, ProduceCategory $category)
    {
        $data = $request->validate([
            'category_name' => 'required|string|max:255|unique:produce_categories,category_name,'.$category->id,
            'description' => 'nullable|string',
        ]);

        $category->update($data);

        return back()->with('success', 'Category updated successfully.');
    }

    public function destroy(ProduceCategory $category)
    {
        // Check if category has produce
        if ($category->produce()->exists()) {
            return back()->with('error', 'Cannot delete category that contains produce.');
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully.');
    }
}
