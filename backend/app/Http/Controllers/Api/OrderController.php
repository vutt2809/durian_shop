<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        
        $orders = $request->user()->orders()
            ->with(['orderDetails.product', 'shippingAddress'])
            ->orderBy('created_at', 'desc')
            ->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'orders' => $orders->items(),
            'totalPages' => $orders->lastPage(),
            'currentPage' => $orders->currentPage(),
            'count' => $orders->total()
        ]);
    }

    public function all(Request $request)
    {
        // Chỉ admin mới được phép truy cập
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        
        $orders = Order::with(['orderDetails.product', 'shippingAddress', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'orders' => $orders->items(),
            'totalPages' => $orders->lastPage(),
            'currentPage' => $orders->currentPage(),
            'count' => $orders->total()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'notes' => 'nullable|string',
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        $items = $request->items;
        
        if (empty($items)) {
            return response()->json([
                'error' => 'Cart is empty.'
            ], 400);
        }

        $total = 0;
        foreach ($items as $item) {
            $product = \App\Models\Product::find($item['product_id']);
            
            if (!$product) {
                return response()->json([
                    'error' => "Product not found."
                ], 400);
            }

            if (!$product->is_active) {
                return response()->json([
                    'error' => "Product {$product->name} is not available."
                ], 400);
            }

            if ($product->quantity < $item['quantity']) {
                return response()->json([
                    'error' => "Insufficient quantity for {$product->name}."
                ], 400);
            }

            $total += $item['price'] * $item['quantity'];
        }

        // Tạo địa chỉ giao hàng
        $shippingAddress = \App\Models\UserAddress::create([
            'user_id' => $request->user()->id,
            'full_name' => $request->full_name,
            'phone' => $request->phone,
            'address1' => $request->address,
            'city' => 'Hồ Chí Minh', // Có thể lấy từ form nếu cần
            'district' => 'Quận 1', // Có thể lấy từ form nếu cần
            'ward' => 'Phường 1', // Có thể lấy từ form nếu cần
            'is_default' => false,
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'shipping_address_id' => $shippingAddress->id,
            'order_number' => 'ORD-' . strtoupper(Str::random(8)),
            'subtotal' => $total,
            'total' => $total,
            'status' => 'pending',
            'notes' => $request->notes
        ]);

        // Tạo order details từ items được gửi từ frontend
        foreach ($items as $item) {
            $product = \App\Models\Product::find($item['product_id']);
            
            \App\Models\OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'product_name' => $product->name,
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['price'] * $item['quantity'],
            ]);
        }

        // Clear cart after order creation
        $request->user()->cart()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully.',
            'order' => $order->load('orderDetails', 'shippingAddress')
        ], 201);
    }

    public function show(Request $request, $id)
    {
        // Nếu là admin, có thể xem tất cả đơn hàng
        if ($request->user()->role === 'admin') {
            $order = Order::with(['orderDetails.product', 'shippingAddress', 'user'])
                ->find($id);
        } else {
            // User thường chỉ xem đơn hàng của mình
            $order = $request->user()->orders()
                ->with(['orderDetails.product', 'shippingAddress'])
                ->find($id);
        }

        if (!$order) {
            return response()->json([
                'error' => 'Order not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'order' => $order
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $order = $request->user()->orders()->find($id);

        if (!$order) {
            return response()->json([
                'error' => 'Order not found.'
            ], 404);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'error' => 'Order cannot be cancelled.'
            ], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully.',
            'order' => $order
        ]);
    }
} 