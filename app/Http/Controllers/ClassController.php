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
        return response([],Response::HTTP_NOT_FOUND);
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
            return response([],Response::HTTP_NOT_FOUND);
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
            return response([],Response::HTTP_NOT_FOUND);
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
            return response([],Response::HTTP_NOT_FOUND);
        }
        _Class::destroy($id);
        return response([],Response::HTTP_OK);
    }

    public function getCourseOffered($id) {
      $class = _Class::find($id);
      if (is_null($class)) {
        return response([],Response::HTTP_NOT_FOUND);
      }
      $course_offered = $class->CourseOffered;
    }
}