<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFarmerVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->farmer && !$user->farmer->is_verified) {
            if (!$request->is('farmer/awaiting-approval')) {
                return redirect('/farmer/awaiting-approval');
            }
        }

        return $next($request);
    }
}
