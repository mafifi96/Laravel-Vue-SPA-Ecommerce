<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product_images;
use App\Models\Category;
use App\Models\ProductBrand;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    //protected $hidden = ['brand_id' ,'brand'];

    //protected $appends = ['cover'];

    protected $guarded = [];


    public function category()
    {
        return $this->belongsTo(Category::class, "category_id");
    }

    public function brand()
    {
        return $this->belongsTo(ProductBrand::class, "brand_id");
    }


    public function images()
    {

        return $this->hasMany(Product_images::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    protected function cover(): Attribute
    {
        return new Attribute(
            get : fn () => $this->images[0]->image,
        );
    }

}
