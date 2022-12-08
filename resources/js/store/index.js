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
        token: ''
    }},
    mutations: {

        UPDATE_QUANTITY(state, payload) {
            state.CartQuantity = payload
        },
        SET_AUTHENTICATED(state, payload) {
            state.authenticated = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_TOKEN(state,payload){
            state.token = payload
        }

    },
    actions: {

        Quantity(context) {
            axios.post("/api/cart/quantity").then(res => {

                context.commit("UPDATE_QUANTITY", Number(res.data.quantity))

            }).catch(err=>{

                console.log(err)

            })
        },

        login({commit}) {
                axios.get('/api/user').then(res => {

                commit('SET_USER', res.data)
                commit('SET_AUTHENTICATED', true)
                commit('SET_TOKEN', res.data.token)

            }).catch(err => {

                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)

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
        token(state){
            return state.token
        }
    }
})

export default store
