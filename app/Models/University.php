<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'name',
        'cover',
        'logo',
        'location',
        'location_url',
        'founded',
        'guardian_ranking',
        'world_ranking',
        'qs_ranking',
        'scholarship',
    ];

    protected $appends = [
        'content_count',
        'text_section_count',
        'video_section_count',
    ];

    public function contents()
    {
        return $this->hasMany(UniversityContent::class);
    }

    public function getContentCountAttribute()
    {
        return $this->contents()->count();
    }

    public function getTextSectionCountAttribute()
    {
        return $this->contents()->where('type', 'text')->count();
    }

    public function getVideoSectionCountAttribute()
    {
        return $this->contents()->where('type', 'video')->count();
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
