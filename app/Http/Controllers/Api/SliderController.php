<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class SliderController extends Controller
{
    public function index(){

        return response()->json(['products'=>Product::with('images')->take(4)->get()]);
    }
}
