<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->active();

        // Filter by category
        if ($request->has('category') && $request->category != 'all') {
            $category_id_or_slug = $request->category;
            $query->whereHas('category', function ($q) use ($category_id_or_slug) {
                if (is_numeric($category_id_or_slug)) {
                    $q->where('id', $category_id_or_slug);
                } else {
                    $q->where('slug', $category_id_or_slug);
                }
            });
        }
        
        // Filter by origin
        if ($request->has('origin') && $request->origin != 'all') {
            $query->where('origin', $request->origin);
        }

        // Filter by ripeness
        if ($request->has('ripeness') && $request->ripeness != 'all') {
            $query->where('ripeness', $request->ripeness);
        }

        // Filter by price range
        if ($request->has('min') && $request->has('max')) {
            $query->whereBetween('price', [$request->min, $request->max]);
        }



        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        if ($request->has('order')) {
            switch ($request->order) {
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // Pagination with limit parameter
        $limit = $request->get('limit', 10); // Default to 12 if not specified
        $products = $query->paginate($limit);



        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    public function show($id_or_slug)
    {
        $query = Product::with(['category'])->active();

        if (is_numeric($id_or_slug)) {
            $product = $query->where('id', $id_or_slug)->first();
        } else {
            $product = $query->where('slug', $id_or_slug)->first();
        }

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }



        return response()->json([
            'success' => true,
            'product' => $product
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'ripeness' => 'nullable|in:ripe,unripe',
            'origin' => 'nullable|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Thêm validation cho hình ảnh
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $imageUrl = null;
            $imageKey = null;

            // Xử lý upload hình ảnh
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . Str::slug($request->name) . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $imageName);
                $imageUrl = '/uploads/products/' . $imageName;
                $imageKey = $imageName;
            }

            $product = Product::create([
                'sku' => 'DR' . strtoupper(Str::random(8)),
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'image_url' => $imageUrl,
                'image_key' => $imageKey,
                'description' => $request->description,
                'price' => $request->price,
                'quantity' => $request->quantity,
                'weight' => $request->weight,
                'ripeness' => $request->ripeness ?? 'ripe',
                'origin' => $request->origin ?? 'vietnam',
                'category_id' => $request->category_id,
                'is_active' => $request->is_active ?? true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'product' => $product->load('category')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'ripeness' => 'nullable|in:ripe,unripe',
            'origin' => 'nullable|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' // Thêm validation cho hình ảnh
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $imageUrl = $product->image_url;
            $imageKey = $product->image_key;

            // Xử lý upload hình ảnh mới
            if ($request->hasFile('image')) {
                // Xóa hình ảnh cũ nếu có
                if ($product->image_url && file_exists(public_path($product->image_url))) {
                    unlink(public_path($product->image_url));
                }

                $image = $request->file('image');
                $imageName = time() . '_' . Str::slug($request->name) . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/products'), $imageName);
                $imageUrl = '/uploads/products/' . $imageName;
                $imageKey = $imageName;
            }

            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'image_url' => $imageUrl,
                'image_key' => $imageKey,
                'description' => $request->description,
                'price' => $request->price,
                'quantity' => $request->quantity,
                'weight' => $request->weight,
                'ripeness' => $request->ripeness ?? 'ripe',
                'origin' => $request->origin ?? 'vietnam',
                'category_id' => $request->category_id,
                'is_active' => $request->is_active ?? true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'product' => $product->load('category')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        try {
            $product->delete();
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleActive($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }
        $product->update(['is_active' => !$product->is_active]);
        return response()->json(['success' => true, 'message' => 'Product status updated.']);
    }
} 