<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'email' => 'admin@durian.local',
            'phone' => '0900000000',
            'first_name' => 'Admin',
            'last_name' => 'Durian Shop',
            'password' => Hash::make('123456'),
            'provider' => 'email',
            'role' => 'admin',
        ]);

        $customers = [
            ['email' => 'khach1@durian.local', 'phone' => '0901000001', 'first_name' => 'Nguyễn', 'last_name' => 'Minh Anh'],
            ['email' => 'khach2@durian.local', 'phone' => '0901000002', 'first_name' => 'Trần', 'last_name' => 'Hoàng Nam'],
            ['email' => 'khach3@durian.local', 'phone' => '0901000003', 'first_name' => 'Lê', 'last_name' => 'Thùy Linh'],
            ['email' => 'khach4@durian.local', 'phone' => '0901000004', 'first_name' => 'Phạm', 'last_name' => 'Gia Huy'],
            ['email' => 'khach5@durian.local', 'phone' => '0901000005', 'first_name' => 'Võ', 'last_name' => 'Ngọc Mai'],
            ['email' => 'khach6@durian.local', 'phone' => '0901000006', 'first_name' => 'Bùi', 'last_name' => 'Quốc Bảo'],
            ['email' => 'khach7@durian.local', 'phone' => '0901000007', 'first_name' => 'Đặng', 'last_name' => 'Thanh Tâm'],
            ['email' => 'khach8@durian.local', 'phone' => '0901000008', 'first_name' => 'Phan', 'last_name' => 'Khánh Vy'],
            ['email' => 'khach9@durian.local', 'phone' => '0901000009', 'first_name' => 'Hồ', 'last_name' => 'Đức Thịnh'],
            ['email' => 'khach10@durian.local', 'phone' => '0901000010', 'first_name' => 'Ngô', 'last_name' => 'Tuấn Kiệt'],
        ];

        foreach ($customers as $c) {
            User::create([
                'email' => $c['email'],
                'phone' => $c['phone'],
                'first_name' => $c['first_name'],
                'last_name' => $c['last_name'],
                'password' => Hash::make('123456'),
                'provider' => 'email',
                'role' => 'customer',
            ]);
        }
    }
}

