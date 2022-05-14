<template>
    <div>
        <Nav></Nav>

        <main class="mt-5 mb-5 px-3" style="overflow:hidden;">
            <!-- Categories -->
            <div class="container-fluid">
                <div class="row">
                    <Categories></Categories>


    <div class="col-md-10 col-lg-10 col-sm-12 ">
        <div class="container">
            <div class="row">
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

                            <div v-if="!emptyCart" class="px-2 mt-3 d-flex justify-content-center">
                                <a href="/checkout" class="btn btn-primary">Checkout</a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
                </div>
            </div>
        </main>

        <Footer></Footer>
    </div>

</template>

<script>



    export default {

        data: function () {
            return {
                products: [],
                emptyCart: false
            }
        },

        methods: {
            getCartPoroducts() {
                axios.get("/api/cart").then(res => {
                    if (!res.data.CartProducts.length) {
                        this.emptyCart = true;
                    }

                    //console.log(res.data.CartProducts)

                    this.products = res.data.CartProducts;

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

            }
        },

        created() {
            this.getCartPoroducts()
        }

    }

</script>
<style scoped>

</style>>
