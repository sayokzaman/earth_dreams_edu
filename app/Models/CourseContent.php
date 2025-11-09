<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    protected $fillable = [
        'course_id',
        'type',
        'section',
        'heading',
        'paragraph',
        'video_url',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
