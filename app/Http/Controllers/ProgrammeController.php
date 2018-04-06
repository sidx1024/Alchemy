<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Programme;

class ProgrammeController extends Controller
{
    public function all()
    {
        return $this->respond(Response::HTTP_OK, Programme::all());
    }

    public function get($id)
    {
        $programme = Programme::find($id);
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
        $this->validate($request, Programme::$rules);
        return response()->json(
            Programme::create(
                $request->all(),
                Response::HTTP_CREATED)
        );
    }

    public function update(Request $request, $id)
    {
        $programme = Programme::find($id);
        if (is_null($programme)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        $this->validate($request, Programme::$rules);
        return response()->json(
            $programme->update($request->all()),
            Response::HTTP_OK
        );
    }

    public function delete($id)
    {
        $programme = Programme::find($id);
        if (is_null($programme)) {
            return response([],Response::HTTP_NOT_FOUND);
        }
        Programme::destroy($id);
        return response([],Response::HTTP_OK);
    }
}