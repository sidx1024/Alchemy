<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Route;
use \Illuminate\Database\QueryException;
use DB;

use GuzzleHttp\Client;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function attemptLogin(Request $request)
    {
        if (!$request->has('username', 'password')) {
            return response()->json(
                ["error" => "Username and Password are required in form data."],
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

        $client = new Client();
        $url = str_replace($request->getRequestUri(), '/oauth/token', $request->url());

        $request = Request::create($url, 'POST', [
                'client_id' => $oauth_client->id,
                'client_secret' => $oauth_client->secret,
                'grant_type' => 'password',
                'username' => $request->username,
                'password' => $request->password,

        ]);
        // TODO : Do something about access_token & Set-Cookie;
        $response = app()->handle($request);
        if($response->getStatusCode() === 200) {
            $access_token = (json_decode($response->getContent(), true)['access_token']);
            return response($response->getContent())->withHeaders(['Set-Cookie' => 'Authorization=Bearer ' . $access_token]);
        }


        return $response;
    }
}
