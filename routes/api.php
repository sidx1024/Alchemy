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
    $router->get('/programme/all', 'ProgrammeController@all');
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
    // Class
    $router->get('/class/get/{id}', 'ClassController@get');
    $router->get('/class/search', 'ClassController@search');
    $router->post('/class/add', 'ClassController@add');
    $router->get('/class/all', 'ClassController@all');
    $router->put('/class/update/{id}', 'ClassController@update');
    $router->delete('/class/delete/{id}', 'ClassController@delete');
    // Course Offered
    $router->get('/course-offered/get/{id}', 'CourseOfferedController@get');
    $router->post('/course-offered/add', 'CourseOfferedController@add');
    $router->get('/course-offered/all', 'CourseOfferedController@all');
    $router->put('/course-offered/update/{id}', 'CourseOfferedController@update');
    $router->delete('/course-offered/delete/{id}', 'CourseOfferedController@delete');
    // Designation
    $router->get('/designation/get/{id}', 'DesignationController@get');
    $router->post('/designation/add', 'DesignationController@add');
    $router->put('/designation/update/{id}', 'DesignationController@update');
    $router->delete('/designation/delete/{id}', 'DesignationController@delete');
    $router->get('/designation/all', 'DesignationController@all');
  });
});

