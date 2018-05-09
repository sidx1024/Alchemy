<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\CourseOffered;

class CourseOfferedController extends Controller
{
    public function all()
    {
      $course_offered = CourseOffered::all();
      if (is_null($course_offered)) {
        return response([],Response::HTTP_NOT_FOUND);
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
            return response([],Response::HTTP_NOT_FOUND);
        }
        return response()->json(
            $course_offered,
            Response::HTTP_OK
        );
    }

    public function add(Request $request)
    {
        $this->validate($request, CourseOffered::$rules);
        return response()->json(
            CourseOffered::create(
                $request->all(),
                Response::HTTP_CREATED)
        );
    }

    public function update(Request $request, $id)
    {
        $course_offered = CourseOffered::find($id);
        if (is_null($course_offered)) {
            return response([],Response::HTTP_NOT_FOUND);
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
            return response([],Response::HTTP_NOT_FOUND);
        }
        CourseOffered::destroy($id);
        return response([],Response::HTTP_OK);
    }
}