<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

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
        $sessions['notlogged'] = session()->getId();

        $request->authenticate();

        DB::transaction(function () use ($request, $sessions) {

            $user = Cart::where("session_id" , $sessions['notlogged'])
            ->update([
                'user_id' => Auth::id()
            ]);

            $request->session()->regenerate();

        });

        $token = auth()->user()->createToken('Token')->plainTextToken;


        return response()->json([
            'loggedIn' => true, 'token' => $token , 'user' => auth()->user()->id]);

    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {

        auth()->user()->tokens()->delete();
        Auth::guard('web')->logout();
        return response()->json(null,200);

    }
}
