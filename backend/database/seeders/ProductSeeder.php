<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            [
                'name' => 'Sầu Riêng Ri 6 Tươi',
                'description' => 'Sầu riêng Ri 6 tươi ngon, thịt vàng đậm, hạt lép, vị ngọt đậm đà. Được thu hoạch từ vườn tại Đồng Nai.',
                'price' => 85000,
                'weight' => 2.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 100,
                'category_id' => $categories->where('slug', 'sau-rieng-ri-6')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Monthong Thái Lan',
                'description' => 'Sầu riêng Monthong Thái Lan, thịt dày, hạt nhỏ, vị ngọt thanh. Nhập khẩu trực tiếp từ Thái Lan.',
                'price' => 120000,
                'weight' => 3.0,
                'ripeness' => 'ripe',
                'origin' => 'thailand',
                'quantity' => 50,
                'category_id' => $categories->where('slug', 'sau-rieng-monthong')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Musang King Malaysia',
                'description' => 'Sầu riêng Musang King - vua của các loại sầu riêng. Thịt vàng cam, béo ngậy, hương vị đặc trưng.',
                'price' => 180000,
                'weight' => 2.0,
                'ripeness' => 'ripe',
                'origin' => 'malaysia',
                'quantity' => 30,
                'category_id' => $categories->where('slug', 'sau-rieng-musang-king')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Ri 6 Đông Lạnh',
                'description' => 'Sầu riêng Ri 6 được bảo quản đông lạnh, giữ nguyên hương vị và độ tươi ngon.',
                'price' => 95000,
                'weight' => 2.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 80,
                'category_id' => $categories->where('slug', 'sau-rieng-dong-lanh')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Chưa Chín',
                'description' => 'Sầu riêng chưa chín, phù hợp cho những ai muốn để chín tự nhiên tại nhà.',
                'price' => 70000,
                'weight' => 2.5,
                'ripeness' => 'unripe',
                'origin' => 'vietnam',
                'quantity' => 60,
                'category_id' => $categories->where('slug', 'sau-rieng-tuoi')->first()->id,
            ],
            [
                'name' => 'Kem Sầu Riêng',
                'description' => 'Kem sầu riêng tự nhiên, được làm từ sầu riêng tươi, không chất bảo quản.',
                'price' => 45000,
                'weight' => 0.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 200,
                'category_id' => $categories->where('slug', 'sau-rieng-che-bien')->first()->id,
            ],
            [
                'name' => 'Bánh Sầu Riêng',
                'description' => 'Bánh sầu riêng truyền thống, được làm từ sầu riêng tươi và bột gạo.',
                'price' => 35000,
                'weight' => 0.3,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 150,
                'category_id' => $categories->where('slug', 'sau-rieng-che-bien')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Indonesia',
                'description' => 'Sầu riêng Indonesia, thịt vàng đậm, vị ngọt đặc trưng của vùng nhiệt đới.',
                'price' => 95000,
                'weight' => 2.8,
                'ripeness' => 'ripe',
                'origin' => 'indonesia',
                'quantity' => 40,
                'category_id' => $categories->where('slug', 'sau-rieng-tuoi')->first()->id,
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            $product['sku'] = 'DR' . strtoupper(Str::random(8));
            Product::create($product);
        }
    }
} 