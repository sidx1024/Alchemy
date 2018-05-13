<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\_Class;

class ClassController extends Controller
{
  public function all()
  {
    $class = _Class::all();
    if (is_null($class)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $class,
      Response::HTTP_OK
    );
  }

  public function get($id)
  {
    $class = _Class::find($id);
    if (is_null($class)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $class,
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, _Class::$rules);
    return response()->json(
      _Class::create(
        $request->all(),
        Response::HTTP_CREATED)
    );
  }

  public function update(Request $request, $id)
  {
    $class = _Class::find($id);
    if (is_null($class)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, _Class::$rules);
    return response()->json(
      $class->update($request->all()),
      Response::HTTP_OK
    );
  }

  public function delete($id)
  {
    $class = _Class::find($id);
    if (is_null($class)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    _Class::destroy($id);
    return response([], Response::HTTP_OK);
  }

  public function getCourseOffered($id)
  {
    $class = _Class::find($id);
    if (is_null($class)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $course_offered = $class->CourseOffered;
  }

  public function search(Request $request)
  {
    $query = $request->query();
    $filter_department = array_key_exists('department_id', $query) ? $query['department_id'] : null;
    $filter_level = array_key_exists('department_id', $query) ? $query['level'] : null;
    $filter_division = array_key_exists('department_id', $query) ? $query['division'] : null;
    $filter_text = array_key_exists('text', $query) ? $query['text'] : null;
    $filter_limit = array_key_exists('limit', $query) ? $query['limit'] : null;

    return response(
      Faculty::Search($filter_department, $filter_level, $filter_division, $filter_text, $filter_limit)->get(),
      Response::HTTP_OK);
  }

}