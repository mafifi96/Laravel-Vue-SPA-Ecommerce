<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Category;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /* Blade::directive('ifadmin' , function()
        {
            return "<?php

            if(Auth::check() && Auth::user()->roles[0]['name'] == 'admin'):

            ?>";

        });

        Blade::directive('ifcustomer' , function()
        {
            return "<?php

            if(Auth::check() && Auth::user()->roles[0]['name'] == 'customer'):

            ?>";

        });

        view()->share('categories', Category::all());
*/
        \Illuminate\Pagination\Paginator::useBootstrap();
        Model::preventLazyLoading();

    }
}
