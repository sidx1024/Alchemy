<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Department;

class DepartmentController extends Controller
{
    public function all()
    {
        $course = Department::all();
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        return response()->json(
            $course,
            Response::HTTP_OK
        );
    }

    public function get($id)
    {
        $course = Department::find($id);
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
        $this->validate($request, Department::$rules);
        return response()->json(
            Department::create(
                $request->all(),
                Response::HTTP_CREATED)
        );
    }

    public function update(Request $request, $id)
    {
        $course = Department::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $this->validate($request, Department::$rules);
        return response()->json(
            $course->update($request->all()),
            Response::HTTP_OK
        );
    }

    public function delete($id)
    {
        $course = Department::find($id);
        if (is_null($course)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        Department::destroy($id);
        return response([],Response::HTTP_OK);
    }
}