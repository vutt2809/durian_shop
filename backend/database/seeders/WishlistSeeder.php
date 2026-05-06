<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;

class WishlistSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'customer')->inRandomOrder()->take(10)->get();
        $products = Product::active()->pluck('id')->all();

        $pairs = [];
        foreach ($users as $user) {
            $picked = collect($products)->shuffle()->take(2)->values()->all();
            foreach ($picked as $pid) {
                $key = $user->id . ':' . $pid;
                $pairs[$key] = ['user_id' => $user->id, 'product_id' => $pid];
                if (count($pairs) >= 18) {
                    break 2;
                }
            }
        }

        foreach ($pairs as $row) {
            Wishlist::create($row);
        }
    }
}

