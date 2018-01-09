<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'profile';

    public function Programme()
    {
        return $this->belongsTo('App\Programme');
    }

    public function Department()
    {
        return $this->hasMany('App\Department');
    }

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered');
    }
}
