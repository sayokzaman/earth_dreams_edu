<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'faculty_id',
        'title',
        'study_level',
        'duration',
        'cover',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function contents()
    {
        return $this->hasMany(CourseContent::class);
    }
}
