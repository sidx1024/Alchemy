<?php

namespace App\Http\Controllers;

use App\CourseOffered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Course;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    public function all()
    {
        return $this->respond(Response::HTTP_OK, Course::all());
    }

    public function get($id)
    {
        $course = Course::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        return response()->json(
            $course,
            Response::HTTP_OK
        );
    }

    public function add(Request $request)
    {
        $this->validate($request, Course::$rules);
        return response()->json(Course::create($request->all()), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $course = Course::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $this->validate($request, Course::$rules);
        if ($course->update($request->all())) {
          return response()->json(Course::find($id),Response::HTTP_OK);
        }
        return response()->json(['message' => 'Unknown error while updating the course.'],Response::HTTP_CONFLICT);
    }

    public function delete($id)
    {
        $course = Course::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $course_is_offered = sizeof($course->usages()) > 0;
        if ($course_is_offered) {
           return response()->json(['message' => 'Offered courses cannot be deleted.'], Response::HTTP_CONFLICT);
        }
        Course::destroy($id);
        return response()->json($course,Response::HTTP_OK);
    }

    public function search(Request $request) {
        $query = $request->query();
        $filter_department = array_key_exists('department_id', $query) ? $query['department_id'] : null;
        $filter_level = array_key_exists('level', $query) ? $query['level'] : null;
        $filter_text = array_key_exists('text', $query) ? $query['text'] : null;
        $filter_limit = array_key_exists('limit', $query) ? $query['limit'] : null;

        return response(
            Course::Search($filter_department, $filter_level, $filter_text, $filter_limit)->get(),
            Response::HTTP_OK);
    }
}