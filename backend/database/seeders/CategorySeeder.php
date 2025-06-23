<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Sầu Riêng Tươi',
                'slug' => 'sau-rieng-tuoi',
                'description' => 'Sầu riêng tươi được thu hoạch trực tiếp từ vườn',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Đông Lạnh',
                'slug' => 'sau-rieng-dong-lanh',
                'description' => 'Sầu riêng được bảo quản đông lạnh để giữ hương vị',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Chế Biến',
                'slug' => 'sau-rieng-che-bien',
                'description' => 'Các sản phẩm được chế biến từ sầu riêng',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Ri 6',
                'slug' => 'sau-rieng-ri-6',
                'description' => 'Sầu riêng Ri 6 - giống sầu riêng phổ biến tại Việt Nam',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Monthong',
                'slug' => 'sau-rieng-monthong',
                'description' => 'Sầu riêng Monthong - giống sầu riêng Thái Lan',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Musang King',
                'slug' => 'sau-rieng-musang-king',
                'description' => 'Sầu riêng Musang King - vua của các loại sầu riêng',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
} 