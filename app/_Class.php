<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class _Class extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'class';
    
    public function Department()
    {
        return $this->belongsTo('App\Department');
    }

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered', 'class_id');
    }

    public function TimeTable() {
        return $this->hasManyThrough('App\TimeTable', 'App\CourseOffered', 'class_id', 'course_offered_id');
    }
}
