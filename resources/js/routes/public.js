
import Home from '../Components/inc/Home'

import Login from '../Components/auth/Login'

import Register from '../Components/auth/Register'

import Category from '../Components/Guest/Category'

import Brand from '../Components/Guest/Brand'

import Search from '../Components/Guest/Search'

import Product from '../Components/Guest/Product'

import Cart from '../Components/Guest/Cart'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/product/:id(\\d+)',
        name : 'product',
        component : Product
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
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    }
];

export default routes;
