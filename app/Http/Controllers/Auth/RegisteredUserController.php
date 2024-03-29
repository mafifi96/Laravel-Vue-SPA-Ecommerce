<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view("auth.register");
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $session_id = session()->getId();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required',  Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole("customer");

        //event(new Registered($user));

        Auth::login($user);

        $u_id = auth()->id();

        if(Cart::where('session_id',$session_id)->count('product_id') != 0)
        {
            $cart = DB::update('update carts set user_id = ? where session_id = ?', [$u_id , $session_id]);

            //return redirect("/customer");
        }

        $token = auth()->user()->createToken('Token')->plainTextToekn;


        return response()->json(['message' => 'user registerd successfully' ,'token' => $token, 'status'=> true],200);

        //return RouteServiceProvider::redirectAuth();
    }

}
