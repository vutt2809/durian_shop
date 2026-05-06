<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ShoppingCart;
use App\Models\User;
use Illuminate\Database\Seeder;

class ShoppingCartSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'customer')->inRandomOrder()->take(8)->get();
        $products = Product::active()->inRandomOrder()->get();

        $rows = 0;
        foreach ($users as $user) {
            $items = $products->shuffle()->take(2);
            foreach ($items as $product) {
                if ($rows >= 16) {
                    break 2;
                }
                ShoppingCart::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => (int) (1 + ($product->id % 3)),
                    'price' => $product->price,
                ]);
                $rows++;
            }
        }
    }
}

