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

    public function TimeTable() {
        return $this->hasManyThrough('App\TimeTable', 'App\CourseOffered', 'location_id', 'course_offered_id');
    }

    public function Department()
    {
        return $this->belongsTo('App\Department');
    }
}
