<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Profile;

class ProfileController extends Controller
{
  public function all()
  {
    $profile = Profile::all();
    if (is_null($profile)) {
      return response([],Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $profile,
      Response::HTTP_OK
    );
  }

  public function get($id)
  {
    $profile = Profile::find($id);
    if (is_null($profile)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    return response()->json(
      $profile,
      Response::HTTP_OK
    );
  }

  public function add(Request $request)
  {
    $this->validate($request, Profile::$rules);
    return response()->json(Profile::create($request->all(), Response::HTTP_CREATED));
  }

  public function update(Request $request, $id)
  {
    $profile = Profile::find($id);
    if (is_null($profile)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $this->validate($request, Profile::$rules);
    if ($profile->update($request->all())) {
      return response()->json(Profile::find($id), Response::HTTP_OK);
    }
    return response()->json(['message' => 'Unknown error while updating the profile.'], Response::HTTP_CONFLICT);
  }

  public function delete($id)
  {
    $profile = Profile::find($id);
    if (is_null($profile)) {
      return response([], Response::HTTP_NOT_FOUND);
    }
    $profile_is_used = sizeof($profile->usages()) > 0;
    if ($profile_is_used) {
      return response()->json(['message' => 'Used profiles cannot be deleted.'], Response::HTTP_CONFLICT);
    }
    Profile::destroy($id);
    return response()->json($profile, Response::HTTP_OK);
  }
}