<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseContent;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::factory()
            ->count(50)
            ->create()
            ->each(function (Course $course) {
                // Create 5–10 content blocks for each course
                CourseContent::factory()
                    ->count(rand(5, 10))
                    ->for($course) // sets course_id automatically
                    ->create();
            });
    }
}
