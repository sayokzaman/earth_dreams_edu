<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(20)->create([
            'set_password' => true,
        ]);

        foreach ($users as $user) {
            $user->assignRole('manager');
        }
    }
}
