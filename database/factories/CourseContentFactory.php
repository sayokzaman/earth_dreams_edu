<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseContent>
 */
class CourseContentFactory extends Factory
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
            'course_id' => Course::factory(), // default, can be overridden when called
            'type' => $type,
            'section' => $this->faker->sentence(3),
            'heading' => $this->faker->sentence,
            'paragraph' => $type === 'text'
                ? '<p>'.$this->faker->paragraphs(rand(1, 3), true).'</p>'
                : null,
            'video_url' => $type === 'video'
                ? 'https://www.youtube.com/embed/watch?v='.$this->faker->bothify('##########')
                : null,
        ];
    }
}
