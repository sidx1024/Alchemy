<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    public $timestamps = false;
    protected $table = 'location';
    protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
    const DEFAULT_SEARCH_RESULT_LIMIT = 10;

    public static $rules = [
      'name' => 'max:128',
      'alias' => 'required|max:8',
      'capacity' => 'required|min:0',
      'department_id' => 'required',
      'type' => 'required|max:2'
    ];

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered');
    }

    public function TimeTable() {
        return $this->hasManyThrough('App\TimeTable', 'App\CourseOffered', 'location_id', 'course_offered_id');
    }

    public function Department()
    {
        return $this->belongsTo('App\Department');
    }
    /**
     * @param null $department_id
     * @param null $type
     * @param null $text
     * @param null $limit
     * @return mixed
     */
    public static function Search($department_id = null, $type = null, $text = null, $limit = null)
    {
      if (is_null($limit)) {
        $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
      }
      $query = Location::take($limit)->latest('id');
      if (!is_null($department_id)) {
        $query = $query->where('department_id', $department_id);
      }
      if (!is_null($type)) {
        $query = $query->where('type', $type);
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

    public function usages() {
      $course_offered_usages = CourseOffered::where('location_id', $this->id)->get()->all();
      $history_course_offered_usages = HistoryCourseOffered::where('location_id', $this->id)->get()->all();
      $class_usages = _Class::where('default_class', $this->id)->get()->all();
      return array_merge($course_offered_usages, $history_course_offered_usages, $class_usages);
    }
}
