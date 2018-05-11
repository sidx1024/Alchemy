<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
  //
  public $timestamps = false;
  protected $table = 'faculty';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
  const DEFAULT_SEARCH_RESULT_LIMIT = 10;

  public static $rules = [
    'name' => 'max:128',
    'alias' => 'required|max:8',
    'code' => 'required|min:2',
    'department_id' => 'required',
    'designation_id' => 'required'
  ];

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

  public static function Search($department_id = null, $designation_id = null, $text = null, $limit = null)
  {
    if (is_null($limit)) {
      $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
    }
    $query = Faculty::take($limit)->latest('id');
    if (!is_null($department_id)) {
      $query = $query->where('department_id', $department_id);
    }
    if (!is_null($designation_id)) {
      $query = $query->where('designation_id', $designation_id);
    }

    if (!is_null($text) && strlen(trim($text)) > 0) {
      $text = '%' . $text . '%';
      $query->where(function ($sub_query) use ($text) {
        $sub_query->where('name', 'like', $text)
          ->orWhere('alias', 'like', $text);
      });
    }
    return $query;
  }

  public function TimeTable()
  {
    return $this->hasManyThrough('App\TimeTable', 'App\CourseOfferedFaculty', 'faculty_id', 'course_offered_id', 'id', 'course_offered_id');
  }

  public function usages()
  {
    $course_offered_faculty_usages = CourseOfferedFaculty::where('faculty_id', $this->id)->get()->all();
    $history_course_offered_faculty_usages = HistoryCourseOfferedFaculty::where('faculty_id', $this->id)->get()->all();
    return array_merge($course_offered_faculty_usages, $history_course_offered_faculty_usages);
  }
}
