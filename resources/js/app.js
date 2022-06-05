require('./bootstrap');

import Vue from 'vue'

import Vuex from 'vuex'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.use(Vuex)

import App from './App'

import routes from './routes/routes'

import store from './store'

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

 router.beforeEach((to,from,next)=>{

    if(to.meta.middleware == "admin")
    {
        if(store.getters.isAdmin){
            next()
        }else{
            next(router.go(-1))
        }
    }else if(to.meta.middleware == "customer")
    {
        if(store.getters.isCustomer){
            next()
        }else{
            next(router.go(-1))
        }
    }
next()
})





 const app = new Vue({

    el : "#app",
    router,
    store,
    render : h=>h(App),
})
