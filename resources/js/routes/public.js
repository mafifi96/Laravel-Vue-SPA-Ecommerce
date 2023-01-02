
import Home from '../Components/inc/Home'

import Login from '../Components/auth/Login'

import Register from '../Components/auth/Register'

import ForgotPassword from '../Components/auth/ForgotPassword'

import Category from '../Components/Guest/Category'

import Brand from '../Components/Guest/Brand'

import Search from '../Components/Guest/Search'

import Product from '../Components/Guest/Product'

import Cart from '../Components/Guest/Cart'

import Checkout from '../Components/Guest/Checkout'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/products/page/:id(\\d+)',
        name: 'products',
        component: Home,
        meta : {
            layout : 'StoreLayout'
        }
    },

    {
        path: '/product/:id(\\d+)',
        name : 'product',
        component : Product,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/category/:id(\\d+)/:name(\\w+)',
        name : 'category',
        component : Category,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/brand/:id(\\d+)/:name(\\w+)',
        name : 'brand',
        component : Brand,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/search',
        name : 'search',
        component : Search,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/login',
        name:'login',
        component: Login,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta : {
            layout : 'StoreLayout'
        }
    }
    ,
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta : {
            layout : 'StoreLayout'
        }
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
        meta : {
            layout : 'StoreLayout'
        }
    }
];

export default routes;
