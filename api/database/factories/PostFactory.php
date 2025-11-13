<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
{
        // Get a random user or create one if none exist
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
    
        return [
            'title' => $this->faker->sentence(6),
            'content' => $this->faker->paragraphs(3, true),
            'excerpt' => $this->faker->text(200),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'user_id' => $user->id // Always set to a valid user ID
        ];
}
}