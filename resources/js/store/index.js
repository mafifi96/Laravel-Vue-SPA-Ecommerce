import {createStore} from 'vuex'

import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    state(){
    return {
        CartQuantity: 0,
        authenticated: false,
        user: {},
        no : 0

    }},
    mutations: {

        UPDATE_QUANTITY(state, payload) {
            state.CartQuantity = payload
            console.log("mutation called for quantity - ")

        },
        SET_AUTHENTICATED(state, payload) {
            state.authenticated = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        }
        ,
        SET_NO(state){
            state.no++
            console.log("mutation called for no - ")
        }
    },
    actions: {
        no(context){
            context.commit("SET_NO")
        },
        Quantity(context) {
            axios.post("/api/cart/quantity").then(res => {
                console.log("updating quantity - ")

                context.commit("UPDATE_QUANTITY", Number(res.data.quantity))

                console.log("quantity updated - " + res.data.quantity)

            }).catch(err=>{
                console.log("failed to get quantity - ")
                console.log(err)

            })
        },

        login({commit}) {
                axios.get('/api/user').then(res => {
                console.log("loggin... - ")

                commit('SET_USER', res.data)
                commit('SET_AUTHENTICATED', true)

                console.log("should be logged - ")

            }).catch(err => {
                console.log(err)
                console.log("loggin error - ")

                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)

                console.log("loggin failed - ")

            })
        },
        logout({commit}) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
        }
    },
    getters: {
        quantity(state){
            return state.CartQuantity
        },
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            if(Object.keys(state.user).length != 0 ){
            return state.user.roles[0].name == "admin" ? true : false;
            }
            return false
        },
        isCustomer(state) {
            if(Object.keys(state.user).length != 0 ){
            return state.user.roles[0].name == "customer" ? true : false;
            }
            return false
        },
        no(state){
            return state.no
        }

    }
})

export default store
