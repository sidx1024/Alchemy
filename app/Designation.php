<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'designation';

    public function programme()
    {
        return $this->belongsTo('App\Programme');
    }
}
