<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory(8)->create(
            // [
            // 'name' => 'Test User',
            // 'email' => 'test@example.com',
            // 'birthdate' => Carbon::now()->subYears(20)->format('Y-m-d'),
            // ]
        );
    }
}
