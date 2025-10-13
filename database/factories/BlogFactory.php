<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => User::factory(),
            'type' => $this->faker->randomElement(['blog', 'event', 'news']),
            'title' => $this->faker->sentence,
            'cover_img' => '',
            'category' => $this->faker->randomElement(['Tech', 'Travel', 'Education', 'Lifestyle']),
            'date' => $this->faker->date(),
        ];
    }
}
