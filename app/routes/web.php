<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. gs tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use App\User;

$app->get('/', function () use ($app) {
  return $app->version();
});

$app->post('/auth/signup', 'UserController@signup');
$app->post('/auth/login', 'UserController@login');


$app->get('/user/{id}', 'UserController@show');
$app->post('/user', 'UserController@create');
