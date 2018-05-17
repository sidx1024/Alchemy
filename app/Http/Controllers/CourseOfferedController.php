<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\CourseOffered;

class CourseOfferedController extends Controller
{

  // User::find(1)->roles()->detach();
  // $user->roles()->sync(array(1, 2, 3));
  // https://laravel.com/docs/4.2/eloquent#inserting-related-models
  public function all()
  {
    $course_offered = CourseOffered::all();
    if (is_null($course_offered)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $course_offered,
      Response::HTTP_OK
    );
  }

  public function get($id)
  {
    $course_offered = CourseOffered::find($id);
    if (is_null($course_offered)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $course_offered->with('course', 'faculty', 'location', '_class')->first(),
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, CourseOffered::$rules);
    return response()->json(
      CourseOffered::create($request->all(), Response::HTTP_CREATED)
    );
  }

  public function update(Request $request, $id)
  {
    $course_offered = CourseOffered::find($id);
    if (is_null($course_offered)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, CourseOffered::$rules);
    return response()->json(
      $course_offered->update($request->all()),
      Response::HTTP_OK
    );
  }

  public function delete($id)
  {
    $course_offered = CourseOffered::find($id);
    if (is_null($course_offered)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    CourseOffered::destroy($id);
    return response([], Response::HTTP_OK);
  }

  public function search(Request $request)
  {
    $query = $request->query();
    $filter_class = array_key_exists('class_id', $query) ? $query['class_id'] : null;
    $filter_limit = array_key_exists('limit', $query) ? $query['limit'] : null;
    return response(CourseOffered::Search($filter_class, $filter_limit)->get(), Response::HTTP_OK);
  }
}