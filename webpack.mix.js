const mix = require('laravel-mix');

const webpack = require('webpack')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
})
mix.options({
    postCss: [
        require('postcss-custom-properties')
    ]
});


mix.js([
    'resources/assets/js/bootstrap.min.js',
    'resources/assets/js/sb-admin-2.min.js',
    'resources/assets/js/fontawesome.min.js',
    'resources/js/app.js'
], 'public/js/app.js').vue()

mix.styles('resources/css/*.css', 'public/css/app.css')
