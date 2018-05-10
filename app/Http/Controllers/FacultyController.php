<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Faculty;

class FacultyController extends Controller
{
  public function all()
  {
    return $this->respond(Response::HTTP_OK, Faculty::all());
  }

  public function get($id)
  {
    $faculty = Faculty::find($id);
    if (is_null($faculty)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $faculty,
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, Faculty::$rules);
    return response()->json(
      Faculty::create(
        $request->all(),
        Response::HTTP_CREATED)
    );
  }

  public function update(Request $request, $id)
  {
    $faculty = Faculty::find($id);
    if (is_null($faculty)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, Faculty::$rules);
    if ($faculty->update($request->all())) {
      return response()->json(Faculty::find($id), Response::HTTP_OK);
    }
    return response()->json(['message' => 'Unknown error while updating the faculty.'], Response::HTTP_CONFLICT);
  }


  public function delete($id)
  {
    $faculty = Faculty::find($id);
    if (is_null($faculty)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    Faculty::destroy($id);
    return response([], Response::HTTP_OK);
  }

  public function search(Request $request)
  {
    $query = $request->query();
    $filter_department = array_key_exists('department_id', $query) ? $query['department_id'] : null;
    $filter_designation = array_key_exists('designation_id', $query) ? $query['designation_id'] : null;
    $filter_text = array_key_exists('text', $query) ? $query['text'] : null;
    $filter_limit = array_key_exists('limit', $query) ? $query['limit'] : null;

    return response(
      Faculty::Search($filter_department, $filter_designation, $filter_text, $filter_limit)->get(),
      Response::HTTP_OK);
  }
}