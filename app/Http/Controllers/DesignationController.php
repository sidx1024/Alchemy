<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Designation;

class DesignationController extends Controller
{
  public function all()
  {
    $designation = Designation::all();
    if (is_null($designation)) {
      return response([],Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $designation,
      Response::HTTP_OK
    );
  }

  public function get($id)
  {
    $designation = Designation::find($id);
    if (is_null($designation)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $designation,
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, Designation::$rules);
    return response()->json(Designation::create($request->all(), Response::HTTP_CREATED));
  }

  public function update(Request $request, $id)
  {
    $designation = Designation::find($id);
    if (is_null($designation)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, Designation::$rules);
    if ($designation->update($request->all())) {
      return response()->json(Designation::find($id), Response::HTTP_OK);
    }
    return response()->json(['message' => 'Unknown error while updating the designation.'], Response::HTTP_CONFLICT);
  }

  public function delete($id)
  {
    $designation = Designation::find($id);
    if (is_null($designation)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $designation_is_used = sizeof($designation->usages()) > 0;
    if ($designation_is_used) {
      return response()->json(['message' => 'Used designations cannot be deleted.'], Response::HTTP_CONFLICT);
    }
    Designation::destroy($id);
    return response()->json($designation, Response::HTTP_OK);
  }
}