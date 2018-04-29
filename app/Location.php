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
     * @param null $level
     * @param null $text
     * @param null $limit
     * @return mixed
     */
    public static function Search($department_id = null, $level = null, $text = null, $limit = null)
    {
      if (is_null($limit)) {
        $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
      }
      $query = Location::take($limit)->latest('id');
      if (!is_null($department_id)) {
        $query = $query->where('department_id', $department_id);
      }

      if (!is_null($text) && strlen(trim($text)) > 0) {
        $text = '%' . $text . '%';
        $query->where(function ($sub_query) use ($text) {
          $sub_query->where('code', 'like', $text)
            ->orWhere('name', 'like', $text)
            ->orWhere('alias', 'like', $text);
        });
      }
      return $query;
    }
}
