<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use App\Models\UserAddress;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::where('role', 'customer')->orderBy('id')->get();
        $products = Product::active()->inRandomOrder()->get();

        $statuses = ['pending', 'processing', 'waiting_carrier', 'shipped', 'delivered', 'cancelled'];
        $methods = ['cod', 'bank_transfer', 'momo', 'vnpay'];

        $created = 0;
        foreach ($customers as $customer) {
            $address = UserAddress::where('user_id', $customer->id)->where('is_default', true)->first()
                ?? UserAddress::where('user_id', $customer->id)->first();
            if (!$address) {
                continue;
            }

            $orderCountForUser = ($customer->id % 2 === 0) ? 2 : 1;
            for ($i = 0; $i < $orderCountForUser; $i++) {
                if ($created >= 10) {
                    break 2;
                }

                DB::transaction(function () use (
                    $customer,
                    $address,
                    $products,
                    $statuses,
                    $methods,
                    &$created
                ) {
                    $status = $statuses[$created % count($statuses)];
                    $paymentMethod = $methods[$created % count($methods)];

                    $items = $products->shuffle()->take(1 + ($created % 2));
                    $subtotal = 0;
                    foreach ($items as $p) {
                        $qty = 1 + ($p->id % 2);
                        $subtotal += ((float) $p->price) * $qty;
                    }

                    $shippingFee = ($subtotal >= 500000) ? 0 : 25000;
                    $total = $subtotal + $shippingFee;

                    $paymentStatus = 'pending';
                    if ($status === 'delivered') {
                        $paymentStatus = 'paid';
                    }
                    if ($status === 'cancelled') {
                        $paymentStatus = 'failed';
                    }

                    $order = Order::create([
                        'user_id' => $customer->id,
                        'shipping_address_id' => $address->id,
                        'order_number' => 'DS' . Carbon::now()->format('Y') . strtoupper(Str::random(8)),
                        'subtotal' => $subtotal,
                        'shipping_fee' => $shippingFee,
                        'total' => $total,
                        'status' => $status,
                        'payment_status' => $paymentStatus,
                        'payment_method' => $paymentMethod,
                        'notes' => ($created % 3 === 0) ? 'Giao nhanh giúp mình' : null,
                        'delivery_date' => in_array($status, ['shipping', 'delivered'], true)
                            ? Carbon::now()->addDays(1 + ($created % 4))
                            : null,
                    ]);

                    foreach ($items as $p) {
                        $qty = 1 + ($p->id % 2);
                        $lineSubtotal = ((float) $p->price) * $qty;
                        OrderDetail::create([
                            'order_id' => $order->id,
                            'product_id' => $p->id,
                            'product_name' => $p->name,
                            'quantity' => $qty,
                            'price' => $p->price,
                            'subtotal' => $lineSubtotal,
                        ]);
                    }

                    $created++;
                });
            }
        }
    }
}

