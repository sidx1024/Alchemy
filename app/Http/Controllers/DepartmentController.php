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
      return response([], Response::HTTP_NOT_FOUND);
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
      return response([], Response::HTTP_NOT_FOUND);
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
    $department = Department::find($id);
    if (is_null($department)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, Department::$rules);
    if ($department->update($request->all())) {
      return response()->json(Department::find($id), Response::HTTP_OK);
    }
    return response()->json(['message' => 'Unknown error while updating the department.'], Response::HTTP_CONFLICT);
  }

  public function delete($id)
  {
    $department = Department::find($id);
    if (is_null($department)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $department_is_used = sizeof($department->usages()) > 0;
    if ($department_is_used) {
      return response()->json(['message' => 'Used departments cannot be deleted.'], Response::HTTP_CONFLICT);
    }
    Department::destroy($id);
    return response()->json($department, Response::HTTP_OK);
  }
}