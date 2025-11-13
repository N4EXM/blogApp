<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',        // Changed from postTitle
        'content',      // Changed from postBody  
        'excerpt',      // Changed from postExcerpt
        'published_at',
        'user_id'
    ];

    protected $casts = [
        'published_at' => 'datetime'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}