<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    function user() {
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'category',
        'image_url',
    ];
}
