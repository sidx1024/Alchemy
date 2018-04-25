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
        // Course
        $router->get('/course/get/{id}', 'CourseController@get');
        $router->get('/course/search', 'CourseController@search');
        $router->post('/course/add', 'CourseController@add');
        $router->put('/course/update/{id}', 'CourseController@update');
        $router->delete('/course/delete/{id}', 'CourseController@delete');
        // Department
        $router->get('/department/get/{id}', 'DepartmentController@get');
        $router->get('/department/search', 'DepartmentController@search');
        $router->post('/department/add', 'DepartmentController@add');
        $router->get('/department/all', 'DepartmentController@all');
        $router->put('/department/update/{id}', 'DepartmentController@update');
        $router->delete('/department/delete/{id}', 'DepartmentController@delete');
        // Programme
        $router->get('/programme/get/{id}', 'ProgrammeController@get');
        $router->post('/programme/add', 'ProgrammeController@add');
        $router->put('/programme/update/{id}', 'ProgrammeController@update');
        $router->delete('/programme/delete/{id}', 'ProgrammeController@delete');
        // Location
        $router->get('/location/get/{id}', 'LocationController@get');
        $router->get('/location/search', 'LocationController@search');
        $router->post('/location/add', 'LocationController@add');
        $router->put('/location/update/{id}', 'LocationController@update');
        $router->delete('/location/delete/{id}', 'LocationController@delete');
        // Faculty
        $router->get('/faculty/get/{id}', 'FacultyController@get');
        $router->get('/faculty/search', 'FacultyController@search');
        $router->post('/faculty/add', 'FacultyController@add');
        $router->put('/faculty/update/{id}', 'FacultyController@update');
        $router->delete('/faculty/delete/{id}', 'FacultyController@delete');
    });
});

