<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public $timestamps = false;
    protected $table = 'course';
    protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
    const SEARCH_RESULT_LIMIT = 10;

    public static $rules = [
        'name' => 'required|max:128',
        'alias' => 'required|max:8',
        'code' => 'required|max:12',
        'scheme' => 'required|max:5',
        'credit' => 'required',
        'department_id' => 'required',
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

    // TODO: Write a better search function.
    // TODO: Add comments.
    /**
     * @param null $department_id
     * @param null $level
     * @param null $text
     * @return mixed
     */
    public static function Search($department_id = null, $level = null, $text = null)
    {
        $query = null;
        if (!is_null($department_id)) {
            $query = Course::where('department_id', $department_id);
        }
        if (!is_null($level)) {
            // BVM-specific filter:
            // The 3rd letter in course code is level,
            // So we use __X%, where 'X 'is the level.
            $level = '__' . $level . '%';
            if (is_null($query)) {
                $query = Course::where('code', 'like', $level);
            } else {
                $query->where('code', 'like', $level);
            }
        }
        if (!is_null($text) && strlen(trim($text)) > 0) {
            $text = '%' . $text . '%';
            if (is_null($query)) {
                $query = Course::where(function ($query) use ($text) {
                    $query->where('code', 'like', $text)
                        ->orWhere('alias', 'like', $text)
                        ->orWhere('name', 'like', $text);
                });
            } else {
                $query->where('code', 'like', $text)
                    ->orWhere('alias', 'like', $text)
                    ->orWhere('name', 'like', $text);
            }
        }
        if (is_null($query)) {
            return Course::take(self::SEARCH_RESULT_LIMIT);
        }
        return $query->take(self::SEARCH_RESULT_LIMIT);
    }
}
