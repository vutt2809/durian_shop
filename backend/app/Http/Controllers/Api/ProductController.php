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

        // Filter by rating
        if ($request->has('rating') && $request->rating > 0) {
            $query->whereHas('reviews')
                  ->withAvg('reviews', 'rating')
                  ->having('reviews_avg_rating', '>=', $request->rating);
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

        $products = $query->paginate(12);

        if ($request->user()) {
            $userWishlistIds = $request->user()->wishlist()->pluck('product_id')->toArray();
            
            $products->getCollection()->transform(function ($product) use ($userWishlistIds) {
                $product->isLiked = in_array($product->id, $userWishlistIds);
                return $product;
            });
        }

        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    public function show($id_or_slug)
    {
        $query = Product::with(['category', 'reviews.user'])->active();

        if (is_numeric($id_or_slug)) {
            $product = $query->where('id', $id_or_slug)->first();
        } else {
            $product = $query->where('slug', $id_or_slug)->first();
        }

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        if (request()->user()) {
            $product->isLiked = request()->user()->wishlist()->where('product_id', $product->id)->exists();
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
            'sku' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'ripeness' => 'nullable|in:unripe,ripe,overripe',
            'origin' => 'nullable|in:vietnam,thailand,malaysia,indonesia',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $data = $request->all();
        $data['slug'] = Str::slug($request->name);
        $data['is_active'] = true;

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            'product' => $product->load('category')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'sku' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'weight' => 'nullable|numeric|min:0',
            'ripeness' => 'nullable|in:unripe,ripe,overripe',
            'origin' => 'nullable|in:vietnam,thailand,malaysia,indonesia',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $data = $request->all();
        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully.',
            'product' => $product->load('category')
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }
        $product->delete();
        return response()->json(['success' => true, 'message' => 'Product deleted successfully.']);
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