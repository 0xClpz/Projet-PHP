<?php

namespace App\Http\Controllers;

use App\User;
use GenTux\Jwt\JwtToken;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class UserController extends Controller {

  private $jwt;

  function __construct(JwtToken $jwt) {
    $this->jwt = $jwt;
  }

  public function login(Request $request){

  }

  public function signup(JwtToken $jwt, Request $request){
    try {
      $this->validate($request, [
        'email' => 'required|email|unique:users',
        'password' => 'required',
        'displayName' => 'required',
        'photoURL' => 'required'
      ]);
      $req = $request->json()->all();
      $user = User::create($req);
      $password = (new BcryptHasher)->make($request->json()->get('password'));
      $user->password = $password;
      //$user->save();
      $token = $this->$jwt->createToken($user);
      return response()->json(['token' => $token]);
    } catch (ValidationException $e){
      return response()->json(['error' => 'Invalid user data']);
    }
  }

  public function show($id) {
    return $id;
  }

  public function create(Request $request) {
    $req = $request->json()->all();
    $user = User::create($req);
    $user->save();
    return $user->toJson();
  }
}