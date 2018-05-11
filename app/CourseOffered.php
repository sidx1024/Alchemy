<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseOffered extends Model
{
  //
  public $timestamps = false;
  protected $table = 'course_offered';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
  const DEFAULT_SEARCH_RESULT_LIMIT = 1024;

  public function Profile()
  {
    return $this->belongsTo('App\Profile');
  }

  public function _Class()
  {
    return $this->belongsTo('App\_Class', 'class_id');
  }

  public function Course()
  {
    return $this->belongsTo('App\Course');
  }

  public function Location()
  {
    return $this->belongsTo('App\Location');
  }

  public function Faculty()
  {
    return $this->belongsToMany('App\Faculty')->using('App\CourseOfferedFaculty');
  }

  /**
   * @param null $class_id
   * @param null $limit
   * @return mixed
   */
  public static function Search($class_id = null, $limit = null)
  {
    if (is_null($limit)) {
      $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
    }
    $query = CourseOffered::take($limit)
      ->latest('id')
      ->with('Course')
      ->with('Location')
      ->with('_Class')
      ->with('Faculty');
    if (!is_null($class_id)) {
      $query = $query->where('class_id', $class_id);
    }
    return $query;
  }
}
