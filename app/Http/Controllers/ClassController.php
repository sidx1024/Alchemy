<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\_Class;

class ClassController extends Controller
{
    public function all()
    {
      $course = _Class::all();
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
        $programme = _Class::find($id);
        if (is_null($programme)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        return response()->json(
            $programme,
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
        $programme = _Class::find($id);
        if (is_null($programme)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $this->validate($request, _Class::$rules);
        return response()->json(
            $programme->update($request->all()),
            Response::HTTP_OK
        );
    }

    public function delete($id)
    {
        $programme = _Class::find($id);
        if (is_null($programme)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        _Class::destroy($id);
        return response([],Response::HTTP_OK);
    }
}