<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniversityContent extends Model
{
    protected $fillable = [
        'university_id',
        'type',
        'section',
        'heading',
        'paragraph',
        'video_url',
    ];

    public function university()
    {
        return $this->belongsTo(University::class);
    }
}
