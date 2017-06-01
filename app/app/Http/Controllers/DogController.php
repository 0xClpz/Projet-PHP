<?php

namespace App\Http\Controllers;

use App\Dog;
use App\Utils;
use GenTux\Jwt\JwtToken;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Mockery\Exception;


class DogController extends Controller {

  public function isOwnerOrAdmin($payload, Dog $dog){
    return $dog->user_id || $payload->isAdmin;
  }

  public function show($id) {
    $dog = Dog::find($id);
    return response()->json(["data" => $dog]);
  }

  public function getAll(){
    dd();
    $dogs = Dog::all();
    return response()->json(["data" => $dogs]);
  }

  public function updateDog(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $dog = Dog::find($id);
    if(!$this->isOwnerOrAdmin($payload, $dog)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $dog->displayName = $request->json()->get('displayName');
    $dog->photoURL = $request->json()->get('photoURL');
    $dog->save();
    return response()->json(["data" => $dog]);
  }

  public function deleteDog(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $dog = Dog::find($id);
    if(!$this->isOwnerOrAdmin($payload, $dog)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $dog->delete();
    return response()->json(["message" => "Dog deleted with success"]);
  }

  public function create(Request $request) {
    try {
      $this->validate($request, [
        'displayName' => 'required',
        'photoURL' => 'required',
        'breed_id' => 'required',
        'user_id' => 'required'
      ]);
      $req = $request->json()->all();
      //dd($req);
      $dog = Dog::create($req);
      $dog->save();
      return response()->json(["data" => $dog]);
    } catch(ValidationException $e){
      return response()->json(['error' => 'Invalid dog data']);
    }
  }
}