<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseOffered extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'course_offered';

    public function Profile()
    {
        return $this->belongsTo('App\Profile');
    }

    public function _Class()
    {
        return $this->belongsTo('App\_Class', 'class_id');
    }

    public function Course()
    {
        return $this->belongsTo('App\Course');
    }

    public function Location()
    {
        return $this->belongsTo('App\Location');
    }

    public function Faculty()
    {
        return $this->belongsToMany('App\Faculty')->using('App\CourseOfferedFaculty');
    }
}
