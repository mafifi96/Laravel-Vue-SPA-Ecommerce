import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        CartQuantity: 0,
        authenticated: false,
        user: {}

    },
    mutations: {

        UPDATE_QUANTITY(state, payload) {
            state.CartQuantity = payload
        },
        SET_AUTHENTICATED(state, payload) {
            state.authenticated = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        }
    },
    actions: {
        Quantity({
            commit
        }) {
            axios.post("/api/cart/quantity").then(res => {

                commit("UPDATE_QUANTITY", Number(res.data.quantity))

            })
        },

        login({
            commit
        }) {
            return axios.get('/api/user').then(res => {
                commit('SET_USER', res.data)
                commit('SET_AUTHENTICATED', true)

            }).catch(err => {

                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)

            })
        },
        logout({
            commit
        }) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
        }
    },
    getters: {

        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.user.roles[0].name == "admin" ? true : false;
        },
        isCustomer(state) {

            return state.user.roles[0].name == "customer" ? true : false;

        },
        Quantity(state){
            return state.CartQuantity
        }

    }
})
