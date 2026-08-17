<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
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
                'image_url' => '/uploads/products/1778073244_sau-rieng-ri-6-tuoi.jpg',
                'image_key' => '1778073244_sau-rieng-ri-6-tuoi.jpg',
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
                'image_url' => '/uploads/products/1778073255_sau-rieng-monthong-thai-lan.png',
                'image_key' => '1778073255_sau-rieng-monthong-thai-lan.png',
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
                'image_url' => '/uploads/products/1778073263_sau-rieng-musang-king-malaysia.jpg',
                'image_key' => '1778073263_sau-rieng-musang-king-malaysia.jpg',
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
                'image_url' => '/uploads/products/1778073275_sau-rieng-ri-6-dong-lanh.png',
                'image_key' => '1778073275_sau-rieng-ri-6-dong-lanh.png',
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
                'image_url' => '/uploads/products/1778073287_sau-rieng-chua-chin.jfif',
                'image_key' => '1778073287_sau-rieng-chua-chin.jfif',
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
                'image_url' => '/uploads/products/1778073298_kem-sau-rieng.jfif',
                'image_key' => '1778073298_kem-sau-rieng.jfif',
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
                'image_url' => '/uploads/products/1778073310_banh-sau-rieng.png',
                'image_key' => '1778073310_banh-sau-rieng.png',
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
                'image_url' => '/uploads/products/1778073328_sau-rieng-indonesia.png',
                'image_key' => '1778073328_sau-rieng-indonesia.png',
                'category_id' => $categories->where('slug', 'sau-rieng-tuoi')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Dona (Việt Nam) 2.5kg',
                'description' => 'Sầu riêng Dona tuyển chọn, cơm vàng thơm, vị béo vừa, phù hợp ăn tươi.',
                'price' => 99000,
                'weight' => 2.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 70,
                'image_url' => '/uploads/products/1778073441_sau-rieng-dona-viet-nam-25kg.jfif',
                'image_key' => '1778073441_sau-rieng-dona-viet-nam-25kg.jfif',
                'category_id' => $categories->where('slug', 'sau-rieng-dona')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Black Thorn Malaysia',
                'description' => 'Black Thorn hương thơm mạnh, cơm vàng sậm, hậu vị béo đặc trưng.',
                'price' => 250000,
                'weight' => 2.2,
                'ripeness' => 'ripe',
                'origin' => 'malaysia',
                'quantity' => 15,
                'image_url' => '/uploads/products/1778073454_sau-rieng-black-thorn-malaysia.jfif',
                'image_key' => '1778073454_sau-rieng-black-thorn-malaysia.jfif',
                'category_id' => $categories->where('slug', 'sau-rieng-black-thorn')->first()->id,
            ],
            [
                'name' => 'Cơm Sầu Riêng Tách Múi (500g)',
                'description' => 'Cơm sầu riêng tách múi, đóng hộp 500g, tiện lợi làm bánh hoặc ăn liền.',
                'price' => 135000,
                'weight' => 0.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 120,
                'image_url' => '/uploads/products/1778073465_com-sau-rieng-tach-mui-500g.jpg',
                'image_key' => '1778073465_com-sau-rieng-tach-mui-500g.jpg',
                'category_id' => $categories->where('slug', 'com-sau-tach-mui')->first()->id,
            ],
            [
                'name' => 'Sầu Riêng Sấy Giòn (200g)',
                'description' => 'Sầu riêng sấy giòn thơm béo, phù hợp ăn vặt hoặc làm quà.',
                'price' => 89000,
                'weight' => 0.2,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 180,
                'image_url' => '/uploads/products/1778073476_sau-rieng-say-gion-200g.jfif',
                'image_key' => '1778073476_sau-rieng-say-gion-200g.jfif',
                'category_id' => $categories->where('slug', 'sau-rieng-say')->first()->id,
            ],
            [
                'name' => 'Kẹo Sầu Riêng (250g)',
                'description' => 'Kẹo sầu riêng thơm nhẹ, ngọt vừa, đóng gói 250g.',
                'price' => 65000,
                'weight' => 0.25,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 160,
                'image_url' => '/uploads/products/1778073490_keo-sau-rieng-250g.png',
                'image_key' => '1778073490_keo-sau-rieng-250g.png',
                'category_id' => $categories->where('slug', 'banh-keo-sau-rieng')->first()->id,
            ],
            [
                'name' => 'Combo Quà Tặng Sầu Riêng (Mix)',
                'description' => 'Combo quà tặng gồm 1 sầu riêng tươi + 1 sấy + 1 kem (tùy tồn kho).',
                'price' => 299000,
                'weight' => 3.2,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 25,
                'image_url' => '/uploads/products/1778073499_combo-qua-tang-sau-rieng-mix.png',
                'image_key' => '1778073499_combo-qua-tang-sau-rieng-mix.png',
                'category_id' => $categories->where('slug', 'combo-qua-tang')->first()->id,
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            $product['sku'] = 'DR' . strtoupper(Str::random(8));
            Product::create($product);
        }
    }
}

