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

    public function contents()
    {
        return $this->hasMany(UniversityContent::class);
    }
}
