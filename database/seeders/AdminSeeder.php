<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@email.com',
            'phone' => '1234567890',
            'password' => Hash::make('password'),
            'set_password' => true,
        ]);

        $user->assignRole('admin');
    }
}
