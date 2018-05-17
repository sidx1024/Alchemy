<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
  //
  public $timestamps = false;
  protected $table = 'profile';
  protected $guarded = ['id']; // Protect field 'id' against mass-assignment.
  const DEFAULT_SEARCH_RESULT_LIMIT = 10;

  public static $rules = [
    'name' => 'required|max:128',
    'description' => 'required|max:128',
    'year' => 'required|integer|min:2000|max:2100',
    'semester' => 'required|min:1|max:4',
    'programme_id' => 'required'
  ];

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
    if ($this->is_archived === 0) {
      return $this->hasMany('App\CourseOffered');
    }
    return $this->hasMany('App\HistoryCourseOffered');
  }

  public function CourseOfferedFaculty()
  {
    if ($this->is_archived === 0) {
      return $this->hasMany('App\CourseOfferedFaculty');
    }
    return $this->hasMany('App\HistoryCourseOfferedFaculty');
  }

  public function TimeTable()
  {
    if ($this->is_archived === 0) {
      return $this->hasMany('App\TimeTable');
    }
    return $this->hasMany('App\HistoryTimeTable');
  }

  public static function Search($year = null, $programme_id = null, $limit = null)
  {
    if (is_null($limit)) {
      $limit = self::DEFAULT_SEARCH_RESULT_LIMIT;
    }
    $query = Profile::take($limit)->latest('id');
    if (!is_null($year)) {
      $query = $query->where('year', $year);
    }
    if (!is_null($programme_id)) {
      $query = $query->where('programme_id', $programme_id);
    }
    return $query;
  }

  public function archive()
  {
    if ($this->is_archived === 1) {
      return "This profile is already archived.";
    }

    DB::beginTransaction();

    $course_offered_array = $this->CourseOffered->toArray();
    $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
    $time_table_array = $this->TimeTable->toArray();

    HistoryCourseOffered::insert($course_offered_array);
    HistoryCourseOfferedFaculty::insert($course_offered_faculty_array);
    HistoryTimeTable::insert($time_table_array);

    CourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
    TimeTable::where('profile_id', '=', $this->id)->delete();
    CourseOffered::where('profile_id', '=', $this->id)->delete();

    $this->is_archived = 1;
    $this->save();

    DB::commit();

    return "Profile archived.";
  }

  public function restore()
  {
    if ($this->is_archived === 0) {
      return "This profile is already restored.";
    }

    DB::beginTransaction();

    $course_offered_array = $this->CourseOffered->toArray();
    $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
    $time_table_array = $this->TimeTable->toArray();

    CourseOffered::insert($course_offered_array);
    CourseOfferedFaculty::insert($course_offered_faculty_array);
    TimeTable::insert($time_table_array);

    HistoryCourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
    HistoryTimeTable::where('profile_id', '=', $this->id)->delete();
    HistoryCourseOffered::where('profile_id', '=', $this->id)->delete();

    $this->is_archived = 0;
    $this->save();

    DB::commit();

    return "Profile restored.";
  }

  public function duplicate($new_name)
  {
    if ($this->is_archived === 0) {
      return "Only archived profiles can be duplicated.";
    }

    DB::beginTransaction();

    $new_profile = $this->replicate();
    $new_profile->name = $new_name;
    $new_profile->year = date("Y");
    $new_profile->is_archived = 0;
    $new_profile->save();
    $new_profile_id = $new_profile->id;

    $course_offered_array = $this->CourseOffered->toArray();
    $course_offered_faculty_array = $this->CourseOfferedFaculty->toArray();
    $time_table_array = $this->TimeTable->toArray();

    $co_max = max(CourseOffered::max('id'), HistoryCourseOffered::max('id'), 0);
    $co_min = max($this->CourseOffered->min('id'), 0);
    $co_offset = ($co_max - $co_min) + 1;

    $tt_max = max(TimeTable::max('id'), HistoryTimeTable::max('id'), 0);
    $tt_min = max($this->TimeTable->min('id'), 0);
    $tt_offset = ($tt_max - $tt_min) + 1;

    foreach ($course_offered_array as &$elem) {
      $elem['id'] += $co_offset;
      $elem['profile_id'] = $new_profile_id;
    }

    foreach ($course_offered_faculty_array as &$elem) {
      $elem['course_offered_id'] += $co_offset;
      $elem['profile_id'] = $new_profile_id;
    }

    foreach ($time_table_array as &$elem) {
      $elem['course_offered_id'] += $co_offset;
      $elem['profile_id'] = $new_profile_id;
      $elem['id'] += $tt_offset;
    }

    CourseOffered::insert($course_offered_array);
    CourseOfferedFaculty::insert($course_offered_faculty_array);
    TimeTable::insert($time_table_array);

    DB::commit();

    return $new_profile;
  }

  public function wipe()
  {
    $deletes = 0;
    $deletes += CourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
    $deletes += TimeTable::where('profile_id', '=', $this->id)->delete();
    $deletes += CourseOffered::where('profile_id', '=', $this->id)->delete();
    $deletes += HistoryCourseOfferedFaculty::where('profile_id', '=', $this->id)->delete();
    $deletes += HistoryTimeTable::where('profile_id', '=', $this->id)->delete();
    $deletes += HistoryCourseOffered::where('profile_id', '=', $this->id)->delete();
    $this->delete();
    return $deletes;
  }

  public function usages()
  {
    $time_table_usage = TimeTable::where('profile_id', $this->id)->get()->all();
    $history_time_table_usage = TimeTable::where('profile_id', $this->id)->get()->all();
    $course_offered_usages = TimeTable::where('profile_id', $this->id)->get()->all();
    $history_course_offered_usages = TimeTable::where('profile_id', $this->id)->get()->all();
    $course_offered_faculty_usages = TimeTable::where('profile_id', $this->id)->get()->all();
    $history_course_offered_faculty_usages = TimeTable::where('profile_id', $this->id)->get()->all();

    return array_merge($time_table_usage, $history_time_table_usage, $course_offered_usages, $history_course_offered_usages,$course_offered_faculty_usages, $history_course_offered_faculty_usages);
  }
}
