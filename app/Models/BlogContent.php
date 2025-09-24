<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'section', 'title', 'paragraph', 'video_url'];

    protected $casts = [
        'paragraph' => 'array',
    ];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
