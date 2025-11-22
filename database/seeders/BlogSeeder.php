<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogContent;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 blogs, each with 3–6 content blocks
        Blog::factory()
            ->count(30)
            ->create([
                'date' => now()->subDays(rand(0, now()->daysInMonth - 1))->toDateString(),
            ])
            ->each(function (Blog $blog) {
                BlogContent::factory()
                    ->count(rand(3, 6))
                    ->for($blog) // sets blog_id automatically
                    ->create();
            });
    }
}
