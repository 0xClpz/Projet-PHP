<?php

namespace App\Http\Middleware;

use Closure;
use GenTux\Jwt\GetsJwtToken;

class JWTMiddleWare {
  public function handle($request, Closure $next, $guard = null) {

    return $next($request);
  }
}
