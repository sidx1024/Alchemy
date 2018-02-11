<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseOfferedFaculty extends Pivot
{
    //
    public $timestamps = false;    
    protected $table = 'course_offered_faculty';
}
