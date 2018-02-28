<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('/', function () use ($router) {
        return "Api is working.";
    });

    $router->post('/login', 'LoginController@attemptLogin');

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('/element', 'ElementController');
        $router->get('/course', 'CourseController');
        $router->get('/course/get/{id}', 'CourseController@get');
        $router->get('/course/search', 'CourseController@search');
        $router->post('/course/add', 'CourseController@add');
        $router->put('/course/update/{id}', 'CourseController@update');
        $router->delete('/course/delete/{id}', 'CourseController@delete');
        $router->get('/faculty', 'FacultyController');
    });
});

