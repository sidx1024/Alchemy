<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'faculty';

    public function Department()
    {
        return $this->belongsTo('App\Department');
    }

    public function CourseOffered()
    {
        return $this->belongsToMany('App\CourseOffered')->using('App\CourseOfferedFaculty');
    }
}
