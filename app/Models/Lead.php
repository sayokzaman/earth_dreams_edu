<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'mobile_country_code',
        'mobile',
        'is_whatsapp',
        'country_of_residence',
        'in_uk_now',
        'study_type',
        'subject_interested',
    ];

    protected $casts = [
        'is_whatsapp' => 'boolean',
        'in_uk_now' => 'boolean',
    ];
}
