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

/**
 * Public ressources
 */
$app->post('/auth/signup', 'UserController@signup');
$app->post('/auth/login', 'UserController@login');


$app->get('/user/{id}', 'UserController@show');

$app->get('/dogs', 'DogController@getAll');
$app->get('/dogs/{id}', 'DogController@show');

$app->get('/breeds', 'BreedController@getAll');
$app->get('/breeds/{id}', 'BreedController@show');

/**
 * JWT protected ressources
 **/
$app->group(['middleware' => 'JWTMiddleWare'], function() use($app){
  $app->post('/dogs', 'DogController@create');
  $app->put('/dogs/{id}', 'DogController@updateDog');
  $app->delete('/dogs/{id}', 'DogController@deleteDog');

  $app->post('/breeds', 'BreedController@create');
  $app->put('/breeds/{id}', 'BreedController@update');
  $app->delete('/breeds/{id}', 'BreedController@delete');
});
