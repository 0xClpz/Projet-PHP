<?php

namespace App\Http\Controllers;

use App\User;
use GenTux\Jwt\JwtToken;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class UserController extends Controller {


  public function login(JwtToken $jwt, Request $request){
    try {
      $this->validate($request, [
        'email' => 'required|email',
        'password' => 'required'
      ]);
      $req = $request->json()->all();
      $user = User::where('email', $request->json()->get('email'))->first();
      //dd($user);
      $password = $request->json()->get('password');
      if (!Hash::check($password, $user->password)) {
        return response()->json(['error' => 'Invalid credentials']);
      }
      // TODO: replace this shit with the env variable
      $token = $jwt->createToken($user,"yolo");
      return response()->json(['token' => $token]);
    } catch (ValidationException $e){
      return response()->json(['error' => 'Invalid user data']);
    }
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
      $user->save();
      // TODO: Secret should be a env variable
      $token = $jwt->createToken($user,"yolo");
      return response()->json(['token' => $token]);
    } catch (ValidationException $e){
      return response()->json(['error' => 'Invalid user data']);
    }
  }

  public function show($id) {
    dd('lalalala');
    return $id;
  }

  public function create(Request $request) {
    $req = $request->json()->all();
    $user = User::create($req);
    $user->save();
    return $user->toJson();
  }
}