<?php

namespace App;

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
        return $this->hasMany('App\CourseOffered');
    }

    public function CourseOfferedFaculty()
    {
        return $this->hasMany('App\CourseOfferedFaculty');
    }

    public function TimeTable()
    {
        return $this->hasMany('App\TimeTable');
    }

    public function archive()
    {
        if ($this->is_archived === 0) {
            $this->is_archived = 1;
            $this->save();
            return "Profile archived.";
        } else {
            return "This profile is already archived.";
        }
    }

    public function restore()
    {
        if ($this->is_archived === 1) {
            $this->is_archived = 0;
            $this->save();
            return "Profile restored.";
        } else {
            return "This profile is already restored.";
        }
    }

    private function archiveData () {
        $records = 
        
        $instances = $this->related->newCollection();

        foreach ($records as $record) {
            $instances->push($this->create($record));
        }
    }
}
