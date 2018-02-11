<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'designation';

    public function Programme()
    {
        return $this->belongsTo('App\Programme');
    }

    public function Faculty()
    {
        return $this->hasMany('App\Faculty');
    }
}