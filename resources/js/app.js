require('./bootstrap');

//import './assets'

import {createApp} from 'vue'

import App from './App'

import router from './routes'

import store from './store'




const app = createApp({
    components :{
        App
    }
}).use(router).use(store).mount("#app")

router.beforeEach((to,from,next)=>{

    if(to.meta.middleware == "admin")
    {
        if(!store.getters.isAdmin || !store.getters.authenticated){
            localStorage.clear()
            next({name : "login"})
        }
    }else if(to.meta.middleware == "customer")
    {
        if(!store.getters.isCustomer || !store.getters.authenticated){
            localStorage.clear()
             next({name : "login"})
        }
    }
next()
})
