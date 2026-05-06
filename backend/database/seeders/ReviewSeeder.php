<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'customer')->inRandomOrder()->take(10)->get();
        $products = Product::active()->inRandomOrder()->take(10)->get();

        $titles = [
            'Thơm béo, đáng tiền',
            'Giao nhanh, đóng gói kỹ',
            'Cơm dày, hạt lép',
            'Hơi chín quá với mình',
            'Vị ngon, sẽ ủng hộ tiếp',
            'Hương thơm mạnh, ăn rất đã',
        ];
        $bodies = [
            'Sầu riêng thơm, cơm vàng, ăn rất đã. Lần sau mình sẽ đặt thêm.',
            'Đóng gói cẩn thận, nhận hàng còn lạnh/giữ nhiệt tốt. Chất lượng ổn.',
            'Giá hợp lý so với chất lượng, cơm dày và vị béo rõ.',
            'Mình thích chín vừa hơn nhưng vẫn ngon, phù hợp làm bánh/kem.',
            'Shop tư vấn nhiệt tình, giao đúng hẹn.',
        ];

        $created = 0;
        foreach ($users as $u) {
            foreach ($products->shuffle()->take(2) as $p) {
                if ($created >= 18) {
                    break 2;
                }
                $rating = 4 + (($u->id + $p->id) % 2);
                Review::create([
                    'user_id' => $u->id,
                    'product_id' => $p->id,
                    'title' => $titles[($created) % count($titles)],
                    'review' => $bodies[($created) % count($bodies)],
                    'rating' => $rating,
                    'is_recommended' => $rating >= 4,
                    'is_active' => true,
                ]);
                $created++;
            }
        }
    }
}

