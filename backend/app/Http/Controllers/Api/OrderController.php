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
        $orders = $request->user()->orders()
            ->with(['orderDetails.product', 'shippingAddress'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'orders' => $orders
        ]);
    }

    public function me(Request $request)
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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'notes' => 'nullable|string',
            'shipping_address' => 'required|array',
            'shipping_address.full_name' => 'required|string',
            'shipping_address.phone' => 'required|string',
            'shipping_address.address1' => 'required|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.district' => 'required|string',
            'payment_method' => 'nullable|string|in:cod,bank_transfer,momo,vnpay'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        $cart = $request->user()->cart()->with('product')->get();

        if ($cart->isEmpty()) {
            return response()->json([
                'error' => 'Cart is empty.'
            ], 400);
        }

        $total = 0;
        foreach ($cart as $item) {
            if (!$item->product->is_active) {
                return response()->json([
                    'error' => "Product {$item->product->name} is not available."
                ], 400);
            }

            if ($item->product->quantity < $item->quantity) {
                return response()->json([
                    'error' => "Insufficient quantity for {$item->product->name}."
                ], 400);
            }

            $total += $item->product->price * $item->quantity;
        }

        // Create shipping address
        $shippingAddress = $request->user()->userAddresses()->create([
            'full_name' => $request->shipping_address['full_name'],
            'phone' => $request->shipping_address['phone'],
            'address1' => $request->shipping_address['address1'],
            'city' => $request->shipping_address['city'],
            'district' => $request->shipping_address['district'],
            'is_default' => true
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'shipping_address_id' => $shippingAddress->id,
            'order_number' => 'ORD-' . strtoupper(Str::random(8)),
            'subtotal' => $total,
            'shipping_fee' => 0,
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $request->payment_method ?? 'cod',
            'notes' => $request->notes
        ]);

        // Create order details
        foreach ($cart as $item) {
            $order->orderDetails()->create([
                'product_id' => $item->product_id,
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
                'subtotal' => $item->product->price * $item->quantity,
            ]);
        }

        // Clear cart after order creation
        $request->user()->cart()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully.',
            'order' => $order->load(['orderDetails.product', 'shippingAddress'])
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()
            ->with(['orderDetails.product', 'shippingAddress'])
            ->find($id);

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