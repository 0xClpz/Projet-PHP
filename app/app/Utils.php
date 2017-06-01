<?php

namespace App;

use GenTux\Jwt\JwtToken;
use Illuminate\Http\Request;

class Utils {

  public static function getPayload(JwtToken $jwt, Request $request){
    return $jwt->setToken($request->header('Authorization'))->payload();
  }
}