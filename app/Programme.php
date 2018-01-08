<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'programme';

    public function institute()
    {
        return $this->belongsTo('App\Institute');
    }
}
