<template>


    <div class="col-md-10 col-lg-10 col-sm-12 ">
        <div class="container">
            <div class="row">
            <Spinner v-show="loading"></Spinner>
                <!-- Products -->
                <div class="col-md-12">
                    <div class="row justify-content-center">
                        <div class="col-md-8 px-1">
                            <ul class="list-group">

                                <li v-for="p in products" :key="p.id" class="list-group-item text-right">
                                    <span class="float-left">{{ p.product_name }}</span>
                                    <span class="badge bg-primary rounded-pill">Quantity : {{ (p.quantity) }}</span>
                                    <span class="badge bg-primary rounded-pill">Price :
                                        {{ (p.price * p.quantity) }}</span>
                                    <button class="btn btn-sm  deletefromcart" @click.prevent="deleteProduct($event)" :data-id="p.product_id">x</button>
                                </li>

                            </ul>
                            <h6 v-if="emptyCart" class="text-center mt-3 mb-3">Your Cart Is Empty</h6>

                            <div v-else class="px-2 mt-3 d-flex justify-content-center">
                                <router-link :to="{name : 'checkout'}" class="btn btn-primary">Checkout</router-link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>

</template>

<script>

import Spinner from '../inc/Spinner'

    export default {

        data: function () {
            return {
                products: [],
                emptyCart: false,
                loading : false
            }
        },
components : {
    Spinner
},
        methods: {
            getCartPoroducts() {
                axios.get("/api/cart").then(res => {

                    this.products = res.data.CartProducts;
                    this.loading = false
                    if (!res.data.CartProducts.length) {
                        this.emptyCart = true;

                    }


                }).catch(err => {
                    console.log(err)
                })
            },
            deleteProduct(e) {

                let product = e.target.dataset.id;

                axios.post("/api/cart/delete", {
                    product_id: product
                }).then(res => {
                    this.$store.dispatch('Quantity')
                    this.getCartPoroducts()

                }).catch(err => {
                    console.log(err)
                })

            },
            getTitle(){
                document.title = "Store | ("+ this.$store.getters.Quantity + ")"
            }
        },
        created()
        {
               this.getTitle()
        }
        ,
        mounted() {
            this.getCartPoroducts()
        }

    }

</script>
<style scoped>

</style>>
