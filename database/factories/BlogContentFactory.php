<?php

namespace Database\Factories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogContent>
 */
class BlogContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['text', 'video']);

        return [
            'blog_id' => Blog::factory(), // default, can be overridden when called
            'type' => $type,
            'section' => $this->faker->sentence(3),
            'title' => $this->faker->optional()->sentence,
            'paragraph' => $type === 'text'
                ? [$this->faker->paragraph, $this->faker->paragraph]
                : null,
            'video_url' => $type === 'video'
                ? 'https://www.youtube.com/watch?v='.$this->faker->bothify('##########')
                : null,
        ];
    }
}
