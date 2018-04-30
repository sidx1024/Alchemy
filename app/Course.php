<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public $timestamps = false;
    protected $table = 'course';
    protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
    const DEFAULT_SEARCH_RESULT_LIMIT = 10;

    public static $rules = [
        'name' => 'required|max:128',
        'alias' => 'required|max:8',
        'code' => 'required|max:12',
        'lecture' => 'required',
        'practical' => 'required',
        'tutorial' => 'required',
        'credit' => 'required',
        'department_id' => 'required',
        'persons' => 'required',
        'is_elective' => 'required'
    ];

    protected static $messages = [
        'name.required' => 'My custom message for :attribute required'
    ];

    public function Department()
    {
        return $this->belongsTo('App\Department');
    }

    public function CourseOffered()
    {
        return $this->hasMany('App\CourseOffered');
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
        $query = Course::take($limit)->latest('id');
        if (!is_null($department_id)) {
            $query = $query->where('department_id', $department_id);
        }
        if (!is_null($level)) {
            // BVM-specific filter:
            // The 3rd letter in course code is level,
            // So we use __X%, where 'X 'is the level.
            $level = '__' . $level . '%';
            $query->where('code', 'like', $level);
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

    public function usages() {
      $course_offered_usages = CourseOffered::where('course_id', $this->id)->get()->all();
      $history_course_offered_usages = HistoryCourseOffered::where('course_id', $this->id)->get()->all();
      return array_merge($course_offered_usages, $history_course_offered_usages);
    }
}
