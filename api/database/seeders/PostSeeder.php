<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Create users first if none exist
        if (User::count() === 0) {
            User::factory()->count(5)->create();
        }

        $users = User::all();
        
        // Create posts with explicit user_id assignment
        Post::factory()->count(20)->create([
            'user_id' => function () use ($users) {
                return $users->random()->id;
            }
        ]);
    }
}