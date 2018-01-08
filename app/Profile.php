<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'profile';

    public function programme()
    {
        return $this->belongsTo('App\Programme');
    }
}
