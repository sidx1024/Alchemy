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

    public function Designation()
    {
        return $this->belongsTo('App\Designation');
    }

    public function CourseOffered()
    {
        return $this->belongsToMany('App\CourseOffered')->using('App\CourseOfferedFaculty');
    }

    public function TimeTable() {
        return $this->hasManyThrough('App\TimeTable', 'App\CourseOfferedFaculty', 'faculty_id', 'course_offered_id', 'id', 'course_offered_id');
    }
}
