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

    public function duplicate($newName) {
        if($this->is_archived === 0) {
            return "Only archived profiles can be duplicated.";
        }
        if($newName == NULL) {
            return "Please enter new profile name.";
        }

        DB::beginTransaction();

        $newProfile = $this->replicate();
        $newProfile->name = $newName;
        $newProfile->year = date("Y");
        $newProfile->is_archived = 0;
        $newProfile->save();
        $newProfileId = $newProfile->id;

        $course_offered_array = $this->CourseOffered->toArray();
        $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
        $time_table_array = $this->TimeTable->toArray();

        $course_offered_max_id = CourseOffered::max('id');
        $history_course_offered_max_id = HistoryCourseOffered::max('id');

        $course_offered_global_max_id = max($course_offered_max_id, $history_course_offered_max_id, 0);
        $course_offered_profile_min_id = max($this->CourseOffered->min('id'), 0);

        $insert_id_offset = ($course_offered_global_max_id - $course_offered_profile_min_id) + 1;

        foreach($course_offered_array as &$elem) {
            $elem['id'] += $insert_id_offset;
            $elem['profile_id'] = $newProfileId;
        }

        foreach($course_offered_faculty_array as &$elem) {
            $elem['course_offered_id'] += $insert_id_offset;
            $elem['profile_id'] = $newProfileId;
        }

        foreach($time_table_array as &$elem) {
            $elem['course_offered_id'] += $insert_id_offset;
            $elem['profile_id'] = $newProfileId;
            unset($elem['id']);            
        }

        CourseOffered::insert($course_offered_array);
        CourseOfferedFaculty::insert($course_offered_faculty_array);
        TimeTable::insert($time_table_array);

        DB::commit();

        return $newProfile;
    }

    public function wipe() {
        $deletes = 0;
        $deletes += CourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
        $deletes += TimeTable::where('profile_id', '=', $this->id)->delete();
        $deletes += CourseOffered::where('profile_id', '=', $this->id)->delete();
        $deletes += HistoryCourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
        $deletes += HistoryTimeTable::where('profile_id', '=', $this->id)->delete();
        $deletes += HistoryCourseOffered::where('profile_id', '=', $this->id)->delete();        
        $this->delete();
        return $deletes;
    }
}
