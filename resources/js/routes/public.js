
import Home from '../Components/inc/Home'

import Login from '../Components/auth/Login'

import Register from '../Components/auth/Register'

import ForgotPassword from '../Components/auth/ForgotPassword'

import Category from '../Components/Guest/Category'

import Brand from '../Components/Guest/Brand'

import Search from '../Components/Guest/Search'

import CProduct from '../Components/Guest/Product'

import Cart from '../Components/Guest/Cart'

import Checkout from '../Components/Guest/Checkout'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/product/:id(\\d+)',
        name : 'product',
        component : CProduct
    },
    {
        path: '/category/:id(\\d+)/:name(\\w+)',
        name : 'category',
        component : Category
    },
    {
        path: '/brand/:id(\\d+)/:name(\\w+)',
        name : 'brand',
        component : Brand
    },
    {
        path: '/search',
        name : 'search',
        component : Search
    },
    {
        path: '/login',
        name:'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    }
    ,
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
    }
];

export default routes;
