<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['author_id', 'type', 'title', 'cover_img', 'category', 'date'];

    public function contents()
    {
        return $this->hasMany(BlogContent::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
