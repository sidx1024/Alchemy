<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    public $timestamps = false;    
    protected $table = 'institute';

    public function Programme()
    {
        return $this->hasMany('App\Programme');
    }
}
