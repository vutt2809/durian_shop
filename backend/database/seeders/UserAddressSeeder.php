<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Seeder;

class UserAddressSeeder extends Seeder
{
    public function run(): void
    {
        $addressBook = [
            ['city' => 'TP. Hồ Chí Minh', 'district' => 'Quận 1', 'ward' => 'Phường Bến Nghé', 'postal_code' => '700000'],
            ['city' => 'TP. Hồ Chí Minh', 'district' => 'Quận 3', 'ward' => 'Phường 7', 'postal_code' => '700000'],
            ['city' => 'TP. Hồ Chí Minh', 'district' => 'TP. Thủ Đức', 'ward' => 'Phường Linh Trung', 'postal_code' => '700000'],
            ['city' => 'TP. Hồ Chí Minh', 'district' => 'Quận 7', 'ward' => 'Phường Tân Phong', 'postal_code' => '700000'],
            ['city' => 'Đồng Nai', 'district' => 'TP. Biên Hòa', 'ward' => 'Phường Tân Hiệp', 'postal_code' => '810000'],
            ['city' => 'Bình Dương', 'district' => 'TP. Dĩ An', 'ward' => 'Phường Dĩ An', 'postal_code' => '750000'],
            ['city' => 'Cần Thơ', 'district' => 'Ninh Kiều', 'ward' => 'An Hòa', 'postal_code' => '900000'],
            ['city' => 'Hà Nội', 'district' => 'Cầu Giấy', 'ward' => 'Dịch Vọng', 'postal_code' => '100000'],
            ['city' => 'Đà Nẵng', 'district' => 'Hải Châu', 'ward' => 'Hòa Thuận Tây', 'postal_code' => '550000'],
            ['city' => 'Khánh Hòa', 'district' => 'TP. Nha Trang', 'ward' => 'Phước Long', 'postal_code' => '650000'],
        ];

        $users = User::where('role', 'customer')->orderBy('id')->get();
        $i = 0;
        foreach ($users as $user) {
            $row = $addressBook[$i % count($addressBook)];

            UserAddress::create([
                'user_id' => $user->id,
                'full_name' => $user->full_name ?: trim(($user->first_name ?? '') . ' ' . ($user->last_name ?? '')),
                'phone' => $user->phone ?: ('0909' . str_pad((string) $user->id, 6, '0', STR_PAD_LEFT)),
                'address1' => 'Số ' . (10 + $user->id) . ' Đường ' . (chr(65 + ($user->id % 20))),
                'address2' => null,
                'city' => $row['city'],
                'district' => $row['district'],
                'ward' => $row['ward'],
                'postal_code' => $row['postal_code'],
                'is_default' => true,
                'notes' => 'Giao hàng giờ hành chính',
            ]);

            if ($user->id % 2 === 0) {
                $alt = $addressBook[($i + 3) % count($addressBook)];
                UserAddress::create([
                    'user_id' => $user->id,
                    'full_name' => $user->full_name ?: trim(($user->first_name ?? '') . ' ' . ($user->last_name ?? '')),
                    'phone' => $user->phone ?: ('0909' . str_pad((string) $user->id, 6, '0', STR_PAD_LEFT)),
                    'address1' => 'Số ' . (120 + $user->id) . ' Đường ' . (chr(65 + (($user->id + 5) % 20))),
                    'address2' => 'Chung cư ' . (1 + ($user->id % 8)) . ', Tầng ' . (2 + ($user->id % 12)),
                    'city' => $alt['city'],
                    'district' => $alt['district'],
                    'ward' => $alt['ward'],
                    'postal_code' => $alt['postal_code'],
                    'is_default' => false,
                    'notes' => 'Liên hệ trước khi giao',
                ]);
            }

            $i++;
        }
    }
}

