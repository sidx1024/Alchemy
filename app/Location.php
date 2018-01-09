<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'location';

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered');
    }
}
