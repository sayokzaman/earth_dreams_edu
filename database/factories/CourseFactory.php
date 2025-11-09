<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'faculty_id' => $this->faker->numberBetween(1, 10),
            'title' => $this->faker->sentence,
            'study_level' => $this->faker->word,
            'duration_months' => $this->faker->numberBetween(1, 72),
            'cover' => $this->faker->imageUrl(),
        ];
    }
}
