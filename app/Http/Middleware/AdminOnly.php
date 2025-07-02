<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        if(!auth()->check() || !auth()->user()->is_admin) {
            return redirect()->route('dashboard')->with('error', 'You do not have permission to access this page.');
        }
        
        return $next($request);
    }
}
