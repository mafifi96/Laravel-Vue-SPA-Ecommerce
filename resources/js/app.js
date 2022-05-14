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

 const app = new Vue({

    el : "#app",
    router,
    store,
    render : h=>h(App),
})
