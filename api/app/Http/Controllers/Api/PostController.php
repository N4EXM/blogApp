<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['user'])->get(); // Removed 'category' since you don't have it
    }

    public function getUserPosts(User $user)
    {
        $posts = $user->posts()
                    ->with('user:id,name,email') // Eager load user data
                    ->latest()
                    ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'posts' => $posts
            ],
            'message' => 'Posts retrieved successfully'
        ]);
    }

    // app/Http/Controllers/Api/PostController.php
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
        ]);

        // Debug: Check if user is authenticated
        if (!auth()->check()) {
            return response()->json([
                'message' => 'Unauthenticated. Please log in.'
            ], 401);
        }

        // Add the authenticated user's ID
        $validated['user_id'] = auth()->id();
        
        // Set published_at if you want it to be published immediately
        $validated['published_at'] = now();

        // Create the post
        $post = Post::create($validated);

        // Load relationships if needed
        $post->load('user');

        return response()->json($post, 201);
    }

    // public function show(Post $post)
    // {   
    //     return $post->load(['user']); // Removed 'category'
    // }

    public function show($id)
    {   
        $post = Post::with('user')->findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255', // Changed
            'content' => 'sometimes|string', // Changed
            'excerpt' => 'sometimes|string' // Added
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(null, 204);
    }
}