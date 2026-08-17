<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        // If request specifies pagination (e.g. from Admin Dashboard)
        if ($request->has('page') || $request->has('limit')) {
            $limit = $request->get('limit', 10);
            $query = Category::with('parent')->orderBy('created_at', 'desc');
            
            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $categories = $query->paginate($limit);

            return response()->json([
                'success' => true,
                'categories' => $categories
            ]);
        }

        // Storefront category tree (active root categories with active children)
        $categories = Category::where('is_active', true)
                             ->whereNull('parent_id')
                             ->with(['children' => function ($q) {
                                 $q->where('is_active', true);
                             }])
                             ->get();

        return response()->json([
            'success' => true,
            'categories' => $categories
        ]);
    }

    public function show($id)
    {
        $category = Category::where('id', $id)
                           ->where('is_active', true)
                           ->with(['products' => function ($query) {
                               $query->active();
                           }])
                           ->first();

        if (!$category) {
            return response()->json([
                'error' => 'Category not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'category' => $category
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'parent_id' => $request->parent_id,
            'is_active' => $request->is_active ?? true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'category' => $category
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'error' => 'Category not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        $data = $request->only(['name', 'description', 'parent_id', 'is_active']);
        if ($request->has('name') && $request->name !== $category->name) {
            $baseSlug = Str::slug($request->name);
            $slug = $baseSlug;
            $count = 1;
            while (Category::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }
            $data['slug'] = $slug;
        }

        $category->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'category' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'error' => 'Category not found.'
            ], 404);
        }

        // Cascade delete child categories
        Category::where('parent_id', $id)->delete();

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.'
        ]);
    }

    public function toggleActive($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'error' => 'Category not found.'
            ], 404);
        }

        $newStatus = !$category->is_active;
        $category->update(['is_active' => $newStatus]);

        if (!$newStatus) {
            Category::where('parent_id', $id)->update(['is_active' => false]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category status updated successfully.',
            'category' => $category
        ]);
    }
} 