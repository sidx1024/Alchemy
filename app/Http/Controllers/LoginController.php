<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Monolog\Logger;
use Route;
use \Illuminate\Database\QueryException;
use DB;
use App\User;

use GuzzleHttp\Client;

class LoginController extends Controller
{
    public function attemptLogin(Request $request)
    {
        Log::info($request);

        if (!$request->has('username', 'password')) {
            return response()->json(
                ["error" => "Username and Password are required."],
                400);
        }

        if (trim($request->username) == '' || trim($request->password) == '') {
            return response()->json(
                ["error" => "Username or Password cannot be empty."],
                400);
        }

        $oauth_client = null;
        try {
            $oauth_client = DB::table('oauth_clients')->where('password_client', 1)->first();

        } catch (QueryException $ex) {
            return response()->json(
                ["error" => "OAuth Password Client doesn't seem to be available. Check oauth_clients table."],
                500);
        }

        $response = $this->oauth($oauth_client, $request);

        if($response->getStatusCode() === 200) {
            $content = \GuzzleHttp\json_decode($response->getContent(), true);
            $content['user'] = User::where('email', $request->username)->first();
            return response($content);
        }


        return $response;
    }

    private function oauth($oauth_client, Request $request) {
      $url = str_replace($request->getRequestUri(), '/oauth/token', $request->url());

      $request = Request::create($url, 'POST', [
        'client_id' => $oauth_client->id,
        'client_secret' => $oauth_client->secret,
        'grant_type' => 'password',
        'username' => $request->username,
        'password' => $request->password,
      ]);

      return app()->handle($request);
    }
}
