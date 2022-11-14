<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\CustomerRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Product;
use App\Models\Category;


class UserController extends Controller
{

    public function index()
    {
        $total_products = Product::count();

        $total_cutomers = User::whereHas('roles', function($query){
            $query->where('name','customer');
        })->count();

        $total_categories = Category::count();

        $total_sales = Order::sum("total_price");

        if ($total_sales < 1000000) {

            $total_sales = number_format($total_sales, 0, '.', ',') . "K";
        } elseif ($total_sales >= 1000000) {

            $total_sales = number_format($total_sales, 0, '.', ',') . "M";
        }

        return response()->json([
            'total_customers' => $total_cutomers,
            'total_products' => $total_products,
            'total_sales' => $total_sales,
            'total_categories' => $total_categories
        ]
        );

    }



    public function customerCart()
    {

        if(!empty(Auth::user()->cart))
        {
                $products = Auth::user()->cart;

            }else{

                $products =  Cart::where("session_id",session()->getId())->get();
            }


        $total_price = Cart::where("user_id", Auth::id())->sum('price');

       return response()->json(['products' => $products , 'totalPrice' => $total_price],200);

    }

    public function customers()
    {
        $customers = User::whereNotIn('id' , [Auth::id()])->get();

        return view("admin.layouts.customer.customers" , ['customers' => $customers]);
    }


    public function customer_info(CustomerRequest $request)
    {

        $session_id = session()->getId();

        $user = User::create($request->validated());

        $user->assignRole("customer");

        event(new Registered($user));

        Auth::login($user);

        $u_id = Auth::id();

        $cart = DB::update('update carts set user_id = ? where session_id = ?', [$u_id, $session_id]);

        return response()->json(['message' => 'user logged in successfully' , 'status' => true],200);
    }


}
