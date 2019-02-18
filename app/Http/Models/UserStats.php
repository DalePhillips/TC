<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStats extends Model
{
    public function user()
    {
        $this->hasOne('App\Models\User');
    }
}
