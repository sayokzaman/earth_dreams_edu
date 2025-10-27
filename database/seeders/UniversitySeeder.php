<?php

namespace Database\Seeders;

use App\Models\University;
use App\Models\UniversityContent;
use Illuminate\Database\Seeder;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        University::factory()
            ->count(140)
            ->create()
            ->each(function ($university) {
                // Each university gets 3–6 content sections
                UniversityContent::factory()
                    ->count(rand(3, 6))
                    ->create([
                        'university_id' => $university->id,
                    ]);
            });
    }
}
