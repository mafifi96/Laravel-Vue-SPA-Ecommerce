<?php

use App\Http\Controllers\CheckerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Category;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\GuestController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->with('roles')->first();
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::middleware('auth:sanctum')->group(function () {


});

Route::post('/session', function () {
    $session = session()->getId();
    return response()->json(['message' => $session]);
});

Route::post('/checkAuth', [CheckerController::class, 'Check']);
/*Route::get('/categories', function () {
    return collect(Category::all('id','name'));
});*/

Route::apiResource('products', ProductController::class);
Route::apiResource('categories', CategoryController::class);
Route::get('/brand/{brand}', [GuestController::class, 'brand'])->where(['brand' => '[0-9]+']);
Route::post("/login", [AuthenticatedSessionController::class, 'store']);
Route::post('/register', [AuthController::class, 'register']);
Route::get("/search", [GuestController::class, 'search']);
Route::get("/cart", [CartController::class, 'index']);
Route::post("/cart/add", [CartController::class, 'add']);
Route::post("/cart/quantity", [CartController::class, 'cart_quantity']);
Route::post("/cart/delete", [CartController::class, 'destroy']);
//Route::get('/checkout', [UserController::class , 'checkout']);
Route::post('/customer/info', [UserController::class, 'customer_info']);
//Route::get("/search" , [GuestController::class , 'search']);
//Route::get('/admin/categories',[CategoryController::class , 'index']);
