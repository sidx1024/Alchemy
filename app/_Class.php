<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class _Class extends Model
{
  //
  public $timestamps = false;
  protected $table = 'class';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.

  public static $rules = [
    'level' => 'required|max:128',
    'division' => 'required|max:8',
    'default_class' => 'required',
    'department_id' => 'required'
  ];

  public function Department()
  {
    return $this->belongsTo('App\Department');
  }

  public function CourseOffered()
  {
    return $this->hasMany('App\CourseOffered', 'class_id');
  }

  public function TimeTable()
  {
    return $this->hasManyThrough('App\TimeTable', 'App\CourseOffered', 'class_id', 'course_offered_id');
  }

  public function usages()
  {
    $course_offered_usages = CourseOffered::where('class_id', $this->id)->get()->all();
    $history_course_offered_usages = HistoryCourseOffered::where('class_id', $this->id)->get()->all();
    return array_merge($course_offered_usages, $history_course_offered_usages);
  }
}
