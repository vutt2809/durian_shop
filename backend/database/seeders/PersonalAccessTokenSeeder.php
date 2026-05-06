<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PersonalAccessTokenSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::orderBy('id')->take(10)->get();

        $i = 0;
        foreach ($users as $u) {
            DB::table('personal_access_tokens')->insert([
                'tokenable_type' => 'App\\Models\\User',
                'tokenable_id' => $u->id,
                'name' => $u->role === 'admin' ? 'admin-api' : 'customer-api',
                'token' => hash('sha256', Str::random(40) . '|' . Str::random(40)),
                'abilities' => json_encode(['*']),
                'last_used_at' => now()->subDays(($i % 5)),
                'expires_at' => now()->addDays(30),
                'created_at' => now()->subDays(($i % 10)),
                'updated_at' => now()->subDays(($i % 10)),
            ]);
            $i++;
        }
    }
}

