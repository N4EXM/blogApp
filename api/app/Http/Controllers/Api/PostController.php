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
        // Add authorization check
        if ($post->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this post'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'excerpt' => 'sometimes|string'
        ]);

        try {
            $updated = $post->update($validated);

            if ($updated) {
                return response()->json([
                    'success' => true,
                    'message' => 'Post updated successfully',
                    'data' => $post->fresh() // Get fresh data from database
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No changes were made to the post'
                ], 422);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error while updating post',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy(Post $post)
    {
        // Add authorization check
        if ($post->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this post'
            ], 403);
        }

        try {
            $deletedPost = $post->delete();

            if ($deletedPost) {
                return response()->json([
                    'success' => true,
                    'message' => 'post successfully deleted'
                ]);
            }
            else {
                return response()->json([
                    'success' => false,
                    'message' => 'post not succcessfully deleted'
                ]);
            }
        }
        catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server error while updating post',
                'error' => $e->getMessage()
            ], 500);
        }

        
    }
}