<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $appends = [
        'course_count',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function getCourseCountAttribute()
    {
        return $this->courses()->count();
    }
}
