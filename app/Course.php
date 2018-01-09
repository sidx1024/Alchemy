<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'course';

    public function Department()
    {
        return $this->belongsTo('App\Department');
    }

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered');
    }
}
