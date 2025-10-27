<?php

namespace Database\Factories;

use App\Models\University;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\University>
 */
class UniversityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'created_by' => 1,
            'name' => $this->faker->unique()->company().' University',
            'cover' => $this->faker->imageUrl(1200, 400, 'university', true, 'Cover'),
            'logo' => $this->faker->imageUrl(200, 200, 'logo', true, 'Logo'),
            'location' => $this->faker->city(),
            'location_url' => 'https://www.google.com/maps/embed?='.urlencode($this->faker->city()),
            'founded' => $this->faker->year(),
            'guardian_ranking' => $this->faker->numberBetween(1, 200),
            'world_ranking' => $this->faker->numberBetween(1, 500),
            'qs_ranking' => $this->faker->numberBetween(1, 1000),
            'scholarship' => $this->faker->randomElement(['Available', 'Partial', 'Not Available']),
        ];
    }
}
