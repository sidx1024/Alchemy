<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
  //
  public $timestamps = false;
  protected $table = 'department';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.

  public static $rules = [
    'name' => 'required|max:128',
    'alias' => 'required|max:8',
    'programme_id' => 'required'
  ];

  public function Programme()
  {
    return $this->belongsTo('App\Programme');
  }

  public function Course()
  {
    return $this->hasMany('App\Department');
  }

  public function _Class()
  {
    return $this->hasMany('App\_Class');
  }

  public function Faculty()
  {
    return $this->hasMany('App\Faculty');
  }

  public function Location()
  {
    return $this->hasMany('App\Location');
  }
  public function usages() {
    $location_usages = Location::where('department_id', $this->id)->get()->all();
    $course_usages = Course::where('department_id', $this->id)->get()->all();
    $class_usages = _Class::where('department_id', $this->id)->get()->all();
    $faculty_usages = Faculty::where('department_id', $this->id)->get()->all();
    return array_merge($location_usages, $course_usages, $class_usages, $faculty_usages);
  }
}
