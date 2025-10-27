<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UniversityContent>
 */
class UniversityContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $type = $this->faker->randomElement(['text', 'video']);

        return [
            'type' => $type,
            'section' => $this->faker->randomElement(['about', 'courses', 'facilities', 'events']),
            'heading' => $type == 'text' ? ucfirst($this->faker->words(3, true)) : null,
            'paragraph' => $type == 'text' ? '<p>'.$this->faker->paragraphs(rand(1, 3), true).'</p>' : null,
            'video_url' => $type == 'video' ? 'https://www.youtube.com/watch?v='.$this->faker->bothify('???????????') : null,
        ];
    }
}
