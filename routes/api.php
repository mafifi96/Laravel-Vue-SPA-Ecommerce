<?php

use App\Http\Controllers\CheckerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\CartController As ApiCart;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SliderController;
use Illuminate\Support\Arr;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('roles');
   // return Arr::add($request->user()->load('roles'),'token', $request->user()->tokens[0]->token);

    /* return response()->json(['user' => $request->user()->load('roles') , 'token' => $request->user()->token_name]); */
});

Route::middleware('auth:sanctum','admin')->group(function(){
    Route::get("/products/create" , [ProductController::class , 'create']);
    Route::get("/customer/cart" , [ApiCart::class , 'customerCart']);
    Route::post("/order/confirm" , [OrderController::class , 'confirm']);
    Route::get("/customer/orders" , [OrderController::class , 'customerOrders']);
    Route::get('/customers' , [UserController::class , 'customers']);
    Route::get('/customers/{id}' , [UserController::class , 'customer']);
    Route::get('/admin/orders' , [OrderController::class , 'orders']);
    Route::get('/admin/orders/{order}',[OrderController::class , 'order']);
    Route::put('/admin/orders/{order}/status',[OrderController::class , 'updateStatus']);
    Route::get("/admin/info", [UserController::class , 'index']);
});

Route::middleware(['api', 'customer'])->group(function () {
    Route::post('/customer/info', [UserController::class, 'customer_info']);
    Route::get('/customer/cart', [UserController::class, 'customerCart']);
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
//general routes
Route::apiResource('products', ProductController::class);
Route::apiResource('categories', CategoryController::class);
Route::get("/slider", [SliderController::class , 'index']);
/* -- */

Route::get('/brand/{brand}', [GuestController::class, 'brand'])->where(['brand' => '[0-9]+']);
Route::get("/search", [GuestController::class, 'search']);
Route::get("/cart", [CartController::class, 'index']);
Route::post("/cart/add", [CartController::class, 'add']);
Route::post("/cart/quantity", [CartController::class, 'cart_quantity']);
Route::post("/cart/delete", [CartController::class, 'destroy']);

// Auth Routes
Route::post('/checkAuth', [CheckerController::class, 'Check']);

Route::post("/login", [AuthenticatedSessionController::class, 'store']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
