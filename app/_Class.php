<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class _Class extends Model
{
  //
  public $timestamps = false;
  protected $table = 'class';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
  const DEFAULT_SEARCH_RESULT_LIMIT = 10;

  public static $rules = [
    'level' => 'required|integer|min:1|max:6',
    'division' => 'required|integer|min:1|max:24',
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

  public function DefaultClass()
  {
    return $this->belongsTo('App\Location', 'default_class');
  }

  public function TimeTable()
  {
    return $this->hasManyThrough('App\TimeTable', 'App\CourseOffered', 'class_id', 'course_offered_id');
  }

  public static function Search($department_id = null, $level = null, $division = null,  $limit = null)
  {
    if (is_null($limit)) {
      $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
    }
    $query = _Class::take($limit)->latest('id');
    if (!is_null($department_id)) {
      $query = $query->where('department_id', $department_id);
    }
    if (!is_null($level)) {
      $query = $query->where('level', $level);
    }
    if (!is_null($division)) {
      $query = $query->where('division', $division);
    }
    /*if (!is_null($text) && strlen(trim($text)) > 0) {
      $text = '%' . $text . '%';
      $query->where(function ($sub_query) use ($text) {
        $sub_query->where('name', 'like', $text)
          ->orWhere('alias', 'like', $text);
      });
    }*/
    return $query->with('DefaultClass')->with('Department');
  }

  public function usages()
  {
    $course_offered_usages = CourseOffered::where('class_id', $this->id)->get()->all();
    $history_course_offered_usages = HistoryCourseOffered::where('class_id', $this->id)->get()->all();
    return array_merge($course_offered_usages, $history_course_offered_usages);
  }
}
