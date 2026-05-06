<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PasswordResetSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'customer')->whereNotNull('email')->take(10)->get();

        foreach ($users as $u) {
            DB::table('password_resets')->insert([
                'email' => $u->email,
                'token' => Str::random(64),
                'created_at' => now()->subDays(($u->id % 7)),
            ]);
        }
    }
}

