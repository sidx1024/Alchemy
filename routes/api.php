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
        $router->get('/course', 'CourseController');
        $router->get('/course/get/{id}', 'CourseController@get');
        $router->get('/course/search', 'CourseController@search');
        $router->post('/course/add', 'CourseController@add');
        $router->put('/course/update/{id}', 'CourseController@update');
        $router->delete('/course/delete/{id}', 'CourseController@delete');
        // Department
        $router->get('/department', 'DepartmentController');
        $router->get('/department/get/{id}', 'DepartmentController@get');
        $router->get('/department/search', 'DepartmentController@search');
        $router->post('/department/add', 'DepartmentController@add');
        $router->get('/department/all', 'DepartmentController@all');
        $router->put('/department/update/{id}', 'DepartmentController@update');
        $router->delete('/department/delete/{id}', 'DepartmentController@delete');
        // Faculty
        $router->get('/faculty', 'FacultyController');
    });
});

