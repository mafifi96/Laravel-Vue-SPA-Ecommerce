require('./bootstrap');

import {createApp} from 'vue'

import App from './App'

import router from './routes'

import store from './store'



 router.beforeEach((to,from,next)=>{

    if(to.meta.middleware == "admin")
    {
        if(store.getters.isAdmin){
            next()
        }else{
            next({name : "login"})
        }
    }else if(to.meta.middleware == "customer")
    {
        if(store.getters.isCustomer){
            next()
        }else{
            next({name : "login"})
        }
    }
next()
})

const app = createApp({
    components :{
        App
    }
}).use(router).use(store).mount("#app")
