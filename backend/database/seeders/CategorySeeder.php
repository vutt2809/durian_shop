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
            [
                'name' => 'Sầu Riêng Dona',
                'slug' => 'sau-rieng-dona',
                'description' => 'Sầu riêng Dona (Monthong trồng tại Việt Nam), cơm dày, ngọt béo',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Cơm Sầu (Tách Múi)',
                'slug' => 'com-sau-tach-mui',
                'description' => 'Cơm sầu riêng đã tách múi, tiện lợi bảo quản và sử dụng',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Sấy',
                'slug' => 'sau-rieng-say',
                'description' => 'Sầu riêng sấy giòn/sấy dẻo, đóng gói tiện lợi',
                'is_active' => true,
            ],
            [
                'name' => 'Bánh/Kẹo Sầu Riêng',
                'slug' => 'banh-keo-sau-rieng',
                'description' => 'Các sản phẩm bánh kẹo có hương vị sầu riêng',
                'is_active' => true,
            ],
            [
                'name' => 'Sầu Riêng Black Thorn',
                'slug' => 'sau-rieng-black-thorn',
                'description' => 'Sầu riêng Black Thorn (Malaysia), hương thơm mạnh, hậu vị béo ngậy',
                'is_active' => true,
            ],
            [
                'name' => 'Combo/Quà Tặng',
                'slug' => 'combo-qua-tang',
                'description' => 'Combo sầu riêng/đồ chế biến phù hợp làm quà',
                'is_active' => true,
            ],
        ];

        $bySlug = [];
        foreach ($categories as $category) {
            $bySlug[$category['slug']] = Category::create($category);
        }

        Category::where('slug', 'sau-rieng-ri-6')->update([
            'parent_id' => $bySlug['sau-rieng-tuoi']->id,
        ]);
        Category::where('slug', 'sau-rieng-monthong')->update([
            'parent_id' => $bySlug['sau-rieng-tuoi']->id,
        ]);
        Category::where('slug', 'sau-rieng-dona')->update([
            'parent_id' => $bySlug['sau-rieng-tuoi']->id,
        ]);
        Category::where('slug', 'sau-rieng-musang-king')->update([
            'parent_id' => $bySlug['sau-rieng-tuoi']->id,
        ]);
        Category::where('slug', 'sau-rieng-black-thorn')->update([
            'parent_id' => $bySlug['sau-rieng-tuoi']->id,
        ]);
        Category::where('slug', 'com-sau-tach-mui')->update([
            'parent_id' => $bySlug['sau-rieng-dong-lanh']->id,
        ]);
        Category::where('slug', 'sau-rieng-say')->update([
            'parent_id' => $bySlug['sau-rieng-che-bien']->id,
        ]);
        Category::where('slug', 'banh-keo-sau-rieng')->update([
            'parent_id' => $bySlug['sau-rieng-che-bien']->id,
        ]);
    }
} 