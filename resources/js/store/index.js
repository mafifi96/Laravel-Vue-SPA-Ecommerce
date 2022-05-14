import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        CartQuantity : 0,

    },
    mutations: {

        UPDATE_QUANTITY(state,payload)
        {
            state.CartQuantity = payload
        }
    },
    actions: {
        Quantity({commit})
            {
                axios.post("/api/cart/quantity").then(res => {

                    commit("UPDATE_QUANTITY" , Number(res.data.quantity))
                    //console.log(res.data.quantity);
                    //console.log(res.data.quantity);
                    //console.log(res.data.message)

                })
            }
    },
    getters: {

    }
})
