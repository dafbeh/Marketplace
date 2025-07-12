<?php

namespace App\Models;
use App\Models\Item;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    function user() {
        return $this->belongsTo(User::class);
    }

    function item() {
        return $this->belongsTo(Item::class);
    }
}
