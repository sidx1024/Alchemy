<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeTable extends Model
{
    //
    public $timestamps = false;    
    protected $table = 'time_table';

    public function CoursesOffered()
    {
        return $this->hasMany('App\CourseOffered');
    }
}
