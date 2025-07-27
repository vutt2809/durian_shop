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
            // 1. Sầu Riêng Tươi (Category ID: 1)
            [
                'name' => 'Sầu Riêng Ri 6 Tươi Chọn Lọc',
                'description' => 'Sầu riêng Ri 6 tươi được chọn lọc kỹ lưỡng từ những quả đẹp nhất, thịt vàng đậm, hạt lép, vị ngọt đậm đà. Được thu hoạch trực tiếp từ vườn tại Đồng Nai, đảm bảo độ tươi ngon và chất lượng cao nhất.',
                'price' => 95000,
                'weight' => 2.8,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 120,
                'category_id' => $categories->where('slug', 'sau-rieng-tuoi')->first()->id,
            ],
            
            // 2. Sầu Riêng Đông Lạnh (Category ID: 2)
            [
                'name' => 'Sầu Riêng Ri 6 Đông Lạnh Cao Cấp',
                'description' => 'Sầu riêng Ri 6 được bảo quản đông lạnh theo công nghệ hiện đại, giữ nguyên hương vị và độ ngọt tự nhiên. Thích hợp cho việc chế biến và bảo quản lâu dài.',
                'price' => 110000,
                'weight' => 2.2,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 90,
                'category_id' => $categories->where('slug', 'sau-rieng-dong-lanh')->first()->id,
            ],
            
            // 3. Sầu Riêng Chế Biến (Category ID: 3)
            [
                'name' => 'Kem Sầu Riêng Ri 6 Đặc Biệt',
                'description' => 'Kem sầu riêng đặc biệt được làm từ sầu riêng Ri 6 tươi, kết hợp với sữa tươi và đường cát trắng. Hương vị đậm đà, mịn màng, thích hợp cho mọi lứa tuổi.',
                'price' => 55000,
                'weight' => 0.6,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 180,
                'category_id' => $categories->where('slug', 'sau-rieng-che-bien')->first()->id,
            ],
            
            // 4. Sầu Riêng Ri 6 (Category ID: 4)
            [
                'name' => 'Sầu Riêng Ri 6 Siêu Cao Cấp',
                'description' => 'Sầu riêng Ri 6 siêu cao cấp được tuyển chọn kỹ lưỡng từ những quả đẹp nhất, thịt vàng đậm, hạt lép, vị ngọt đậm đà. Đặc biệt thích hợp cho những dịp quan trọng.',
                'price' => 150000,
                'weight' => 3.5,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 40,
                'category_id' => $categories->where('slug', 'sau-rieng-ri-6')->first()->id,
            ],
            
            // 5. Sầu Riêng Monthong (Category ID: 5)
            [
                'name' => 'Sầu Riêng Monthong Thái Lan Cao Cấp',
                'description' => 'Sầu riêng Monthong cao cấp nhập khẩu trực tiếp từ Thái Lan, thịt vàng nhạt, hạt lép, vị ngọt thanh, ít mùi hăng. Được ưa chuộng bởi những người mới ăn sầu riêng.',
                'price' => 180000,
                'weight' => 3.2,
                'ripeness' => 'ripe',
                'origin' => 'thailand',
                'quantity' => 70,
                'category_id' => $categories->where('slug', 'sau-rieng-monthong')->first()->id,
            ],
            
            // 6. Sầu Riêng Musang King (Category ID: 6)
            [
                'name' => 'Sầu Riêng Musang King Malaysia Đặc Biệt',
                'description' => 'Sầu riêng Musang King đặc biệt - vua của các loại sầu riêng, nhập khẩu từ Malaysia. Thịt vàng đậm, béo ngậy, hương vị đặc trưng không thể nhầm lẫn. Sản phẩm cao cấp nhất.',
                'price' => 280000,
                'weight' => 2.5,
                'ripeness' => 'ripe',
                'origin' => 'malaysia',
                'quantity' => 25,
                'category_id' => $categories->where('slug', 'sau-rieng-musang-king')->first()->id,
            ],
            
            // 7. Sầu Riêng Tươi (Category ID: 1) - Thêm sản phẩm thứ 2
            [
                'name' => 'Sầu Riêng Ri 6 Tươi Hữu Cơ',
                'description' => 'Sầu riêng Ri 6 tươi hữu cơ được trồng theo phương pháp tự nhiên, không sử dụng thuốc bảo vệ thực vật. Thịt vàng đậm, mềm mịn, hạt lép, vị ngọt đậm đà.',
                'price' => 120000,
                'weight' => 2.6,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 85,
                'category_id' => $categories->where('slug', 'sau-rieng-tuoi')->first()->id,
            ],
            
            // 8. Sầu Riêng Chế Biến (Category ID: 3) - Thêm sản phẩm thứ 2
            [
                'name' => 'Bánh Sầu Riêng Ri 6 Đặc Biệt',
                'description' => 'Bánh sầu riêng đặc biệt được làm từ sầu riêng Ri 6 tươi, bột mì cao cấp và trứng gà ta. Bánh mềm xốp, hương vị đậm đà, thích hợp cho bữa sáng hoặc tráng miệng.',
                'price' => 45000,
                'weight' => 0.4,
                'ripeness' => 'ripe',
                'origin' => 'vietnam',
                'quantity' => 250,
                'category_id' => $categories->where('slug', 'sau-rieng-che-bien')->first()->id,
            ],
            
            // 9. Sầu Riêng Monthong (Category ID: 5) - Thêm sản phẩm thứ 2
            [
                'name' => 'Sầu Riêng Monthong Thái Lan Đông Lạnh',
                'description' => 'Sầu riêng Monthong được bảo quản đông lạnh theo công nghệ Thái Lan, giữ nguyên hương vị và độ ngọt. Thích hợp cho việc chế biến và bảo quản.',
                'price' => 160000,
                'weight' => 2.8,
                'ripeness' => 'ripe',
                'origin' => 'thailand',
                'quantity' => 55,
                'category_id' => $categories->where('slug', 'sau-rieng-monthong')->first()->id,
            ],
            
            // 10. Sầu Riêng Musang King (Category ID: 6) - Thêm sản phẩm thứ 2
            [
                'name' => 'Sầu Riêng Musang King Malaysia Siêu Cao Cấp',
                'description' => 'Sầu riêng Musang King siêu cao cấp được tuyển chọn từ những quả đẹp nhất, thịt vàng đậm, béo ngậy, hương vị đặc trưng. Sản phẩm dành cho những người sành ăn.',
                'price' => 350000,
                'weight' => 2.3,
                'ripeness' => 'ripe',
                'origin' => 'malaysia',
                'quantity' => 15,
                'category_id' => $categories->where('slug', 'sau-rieng-musang-king')->first()->id,
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            $product['sku'] = 'DR' . strtoupper(Str::random(8));
            $product['is_active'] = true;
            Product::create($product);
        }
    }
} 