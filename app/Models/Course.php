<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'title',
        'study_level',
        'duration_months',
        'cover',
    ];

    protected $appends = [
        'duration',
        'duration_unit',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function contents()
    {
        return $this->hasMany(CourseContent::class);
    }

    public function getDurationAttribute(): int
    {
        $m = (int) $this->duration_months;

        return $m % 12 === 0 ? intdiv($m, 12) : $m;
    }

    public function getDurationUnitAttribute(): string
    {
        return ((int) $this->duration_months % 12 === 0) ? 'years' : 'months';
    }
}
