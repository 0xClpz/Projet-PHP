<?php

namespace App\Http\Controllers;

use App\Breed;
use App\Dog;
use App\Utils;
use GenTux\Jwt\JwtToken;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Mockery\Exception;


class BreedController extends Controller {

  public function isAdmin($payload){
    return $payload->isAdmin;
  }

  public function show($id) {
    $breed = Breed::find($id);
    return response()->json($breed);
  }

  public function getAll(){
    $breed = Breed::all();
    return response()->json($breed);
  }

  public function update(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $breed = Breed::find($id);
    if(!$this->isAdmin($payload)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $breed->name = $request->json()->get('name');
    $breed->save();
    return response()->json($breed);
  }

  public function delete(JwtToken $jwt, Request $request, $id){
    $payload = Utils::getPayload($jwt, $request);
    $breed = Breed::find($id);
    if(!$this->isAdmin($payload)){
      return response()
        ->header('Status', '401')
        ->json(["error" => "Unauthorized action"]);
    }
    $breed->delete();
    return response()->json(["message" => "Breed deleted with success"]);
  }

  public function create(Request $request) {
    try {
      $this->validate($request, [
        'name' => 'required',
      ]);
      $req = $request->json()->all();
      $breed = Breed::create($req);
      $breed->save();
      return response()->json(["data" => $breed]);
    } catch(ValidationException $e){
      return response()->json(['error' => 'Invalid Breed data']);
    }
  }
}