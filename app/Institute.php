<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    public $timestamps = false;    
    protected $table = 'institute';

    public function programme()
    {
        return $this->hasMany('App\Programme');
    }
}
