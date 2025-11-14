<?php

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'mobile_country_code' => $this->faker->randomElement(['+1', '+44', '+91', '+61']),
            'mobile' => $this->faker->numerify('##########'),
            'is_whatsapp' => $this->faker->boolean(),
            'country_of_residence' => $this->faker->country(),
            'in_uk_now' => $this->faker->boolean(),
            'study_type' => $this->faker->randomElement(['undergraduate', 'masters', 'foundation', 'top_up', 'phd', 'doctorate']),
            'subject_interested' => $this->faker->randomElement(Subject::pluck('subject_name')->toArray()),
        ];
    }
}
