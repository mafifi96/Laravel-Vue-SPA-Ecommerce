<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {


        $request->authenticate();

        if (Auth::check()) {
            $sessions['notlogged'] = session()->getId();

            $user = Cart::where("session_id", $sessions['notlogged'])
                ->update([
                    'user_id' => Auth::id()
                ]);

            $request->session()->regenerate();

            $token = auth()->user()->createToken('Token')->plainTextToken;

            return response()->json([
                'user' => Auth::user()->with('roles'), 'token' => $token
            ]);
        }
    }

    public function register(Request $request)
    {
        $session_id = session()->getId();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required',  Password::defaults()],
        ]);


        DB::transaction(function () use ($request, $session_id) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole("customer");

            //event(new Registered($user));

            Auth::login($user);

            if (Cart::where('session_id', $session_id)->count('product_id') != 0) {
                $cart = DB::update('update carts set user_id = ? where session_id = ?', [$user->id, $session_id]);
            }
        });

        $token = auth()->user()->createToken('Token')->plainTextToken;

        return response()->json(['message' => 'user registerd successfully', 'token' => $token], 200);


    }
}
