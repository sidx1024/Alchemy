<?php

namespace App;

use Illuminate\Support\Facades\DB;
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
        if($this->is_archived === 0) {
            return $this->hasMany('App\CourseOffered');
        }
        return $this->hasMany('App\HistoryCourseOffered');
    }

    public function CourseOfferedFaculty()
    {
        if($this->is_archived === 0) {
            return $this->hasMany('App\CourseOfferedFaculty');
        }
        return $this->hasMany('App\HistoryCourseOfferedFaculty');
    }

    public function TimeTable()
    {
        if($this->is_archived === 0) {
            return $this->hasMany('App\TimeTable');
        }
        return $this->hasMany('App\HistoryTimeTable');
    }

    public function archive()
    {
        if ($this->is_archived === 1) { 
            return "This profile is already archived.";
        }

        DB::beginTransaction();

        $course_offered_array = $this->CourseOffered->toArray();
        $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
        $time_table_array = $this->TimeTable->toArray();        

        HistoryCourseOffered::insert($course_offered_array);
        HistoryCourseOfferedFaculty::insert($course_offered_faculty_array);
        HistoryTimeTable::insert($time_table_array);

        CourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
        TimeTable::where('profile_id', '=', $this->id)->delete();
        CourseOffered::where('profile_id', '=', $this->id)->delete();    
        
        $this->is_archived = 1;
        $this->save();

        DB::commit();

        return "Profile archived.";        
    }

    public function restore()
    {
        if ($this->is_archived === 0) { 
            return "This profile is already restored.";
        }

        DB::beginTransaction();

        $course_offered_array = $this->CourseOffered->toArray();
        $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
        $time_table_array = $this->TimeTable->toArray();        

        CourseOffered::insert($course_offered_array);
        CourseOfferedFaculty::insert($course_offered_faculty_array);
        TimeTable::insert($time_table_array);

        HistoryCourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
        HistoryTimeTable::where('profile_id', '=', $this->id)->delete();
        HistoryCourseOffered::where('profile_id', '=', $this->id)->delete();     
            
        $this->is_archived = 0;
        $this->save();

        DB::commit();

        return "Profile restored.";        
    }
}
