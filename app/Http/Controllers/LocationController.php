<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Location;

class LocationController extends Controller
{
  public function all()
  {
    $location = Location::all();
    if (is_null($location)) {
      return response([],Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $location,
      Response::HTTP_OK
    );
  }

  public function get($id)
  {
    $location = Location::find($id);
    if (is_null($location)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $location,
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, Location::$rules);
    return response()->json(Location::create($request->all(), Response::HTTP_CREATED));
  }

  public function delete($id)
  {
    $location = Location::find($id);
    if (is_null($location)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $location_is_used = sizeof($location->usages()) > 0;
    if ($location_is_used) {
      return response()->json(['message' => 'Used locations cannot be deleted.'], Response::HTTP_CONFLICT);
    }
    Location::destroy($id);
    return response()->json($location, Response::HTTP_OK);
  }

  public function search(Request $request)
  {
    $query = $request->query();
    $filter_department = array_key_exists('department_id', $query) ? $query['department_id'] : null;
    $filter_type = array_key_exists('type', $query) ? $query['type'] : null;
    $filter_text = array_key_exists('text', $query) ? $query['text'] : null;
    $filter_limit = array_key_exists('limit', $query) ? $query['limit'] : null;

    return response(
      Location::Search($filter_department, $filter_type, $filter_text, $filter_limit)->get(),
      Response::HTTP_OK);
  }
}