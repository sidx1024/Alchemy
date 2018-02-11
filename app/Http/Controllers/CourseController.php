<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Course;

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
        return response()->json(
            Course::create(
                $request->all(),
                Response::HTTP_CREATED)
        );
    }

    public function update(Request $request, $id)
    {
        $course = Course::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $this->validate($request, Course::$rules);
        return response()->json(
            $course->update($request->all()),
            Response::HTTP_OK
        );
    }

    public function delete($id)
    {
        $course = Course::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        Course::destroy($id);
        return response([],Response::HTTP_OK);
    }

    public function search(Request $request) {
        $query = $request->query();
        $filter_department = array_key_exists('department_id', $query) ? $query['department_id'] : null;
        $filter_level = array_key_exists('level', $query) ? $query['level'] : null;
        $filter_text = array_key_exists('text', $query) ? $query['text'] : null;

        return response(
            Course::Search($filter_department, $filter_level, $filter_text)->get(),
            Response::HTTP_OK);
    }
}