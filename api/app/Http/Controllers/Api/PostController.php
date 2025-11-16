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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255', // Changed to match your model
            'content' => 'required|string', // Changed to match your model
            'excerpt' => 'sometimes|string', // Added
            'user_id' => 'sometimes|exists:users,id' // Added
        ]);

        $post = Post::create($validated);

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