<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FailedJobSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('failed_jobs')->insert([
                'uuid' => (string) Str::uuid(),
                'connection' => 'database',
                'queue' => 'default',
                'payload' => json_encode([
                    'displayName' => 'App\\Jobs\\SendOrderNotification',
                    'job' => 'Illuminate\\Queue\\CallQueuedHandler@call',
                    'data' => ['order_number' => 'DS' . now()->format('Y') . Str::random(6)],
                ], JSON_UNESCAPED_SLASHES),
                'exception' => "Exception: Simulated failure for seed data\n#0 /path/to/app.php(1): throw\n",
                'failed_at' => now()->subHours(2 + $i),
            ]);
        }
    }
}

