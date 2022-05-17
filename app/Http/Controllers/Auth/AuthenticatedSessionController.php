<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view("auth.login");
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        //$sessions['notloged'] = session()->getId();


        $request->authenticate();

        /*$user = Cart::where("session_id" , $sessions['notloged'])
        ->update([
                'user_id' => Auth::id()
        ]);
*/
        //$request->session()->regenerate();

        $token = auth()->user()->createToken('Token');

        return response()->json([
            'user' => Auth::user()->with('roles'), 'token' => $token->plainTextToken]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        auth()->logout();

       // $request->session()->invalidate();

        //$request->session()->regenerateToken();

        return response()->json(['message' => 'logged out'],200);
        //return redirect('/');
    }
}
