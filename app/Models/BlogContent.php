<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogContent extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'type', 'section', 'heading', 'paragraph', 'video_url'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
