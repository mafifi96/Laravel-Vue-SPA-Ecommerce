<template>

    <h3 class="text-dark text-capitalize mb-3 d-block">latest products</h3>
    <div class="row">

        <Spinner v-show="loading"></Spinner>
        <!-- Products -->

        <div class="col-md-4 col-sm-12 col-lg-4 mb-3 " v-for=" product in products" :key="product.id">

            <div class="product mb-2 shadow-sm ">
                <div class="pro-header mb-1 bg-light">
                    <router-link :to="{ name :'product', params : {id : product.id } }">
                        <template v-if="product.images?.length != 0">

                            <img :src="'/storage/'+ product.images[0].image" style="height:40vh;"
                                class="img-fluid card-img-top" alt="placeholder">
                        </template>

                        <template v-else>
                            <img src="/imgs/default-image.jpg" style="height:40vh;" class="img-fluid card-img-top"
                                alt="placeholder">
                        </template>

                    </router-link>
                </div>

                <div class="pro-body mb-1 p-2">
                    <h5 :title=" product.title ">
                        <router-link :to="{ name :'product', params : {id : product.id } }"
                            style="color:#555;font-weight:400" class="text-decoration-none text-left text-capitalize">
                            {{ product.title }}
                        </router-link>
                    </h5>
                    <p style="font-weight:800;color:#000;">&dollar;{{ product.price }}</p>

                    <div class="pro-add p-2">

                        <form method="post" name="add">
                            <div class="row">
                                <div class="col-md-8 justify-content-">
                                    <div class="form-group">
                                        <input type="number" class="form-control" name="quantity" value=""
                                            :placeholder="'in stock ' + product.quantity " :max=product.quantity>
                                    </div>
                                </div>

                                <div class="col-md-2 pull-right">
                                    <button @click.prevent="addToCart($event)" :data-title=product.title
                                        :data-price=product.price :data-id=product.id class="btn btn-primary addtocart"
                                        name="submit">Add</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>

    </div>

    <div class="row mt-3">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <Pagination @changePage="getProducts" :pages="pages"></Pagination>
        </div>
    </div>

</template>

<script>
    import Spinner from './Spinner'
    import Pagination from './Pagination'

    export default {

        data() {
            return {
                products: [],
                pages: [],
                loading: true,
                page: 1
            }
        },
        components: {
            Spinner,
            Pagination
        },
        methods: {
            getProducts(page = '/api/products?page=1') {


                axios.get(page).then(res => {
                    this.products = res.data.data;
                    this.pages = res.data.links
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                })
            },
            addToCart(e) {

                let Id = e.target.dataset.id;

                let fm = e.target.closest("form")[0];

                let Quantity = fm.value;

                if ((Quantity == '' && !isNaN(Quantity)) || (Quantity >= 1 && !isNaN(Quantity))) {

                    Quantity = (Quantity == '') ? 1 : Quantity;

                    axios.post("/api/cart/add", {
                        product_id: Id,
                        quantity: Quantity,
                    }).then(res => {

                        this.$store.dispatch('Quantity')

                        console.log("product added : " + res.data.message)

                    }).catch(err => {

                        console.log(err.data.message)

                    })

                } else if (Quantity <= 0 || isNaN(Quantity)) {
                    console.log(Quantity)
                    alert("Invalid Quantity");
                    fm.quantity.value = "";
                    return;
                }

            }
        },
        computed: {
            getPage: function () {
                if (this.$route.params.id && !isNaN(this.$route.params.id)) {
                    return this.$route.params.id
                }
            }
        },
        mounted() {

            this.getProducts();
            document.title = "Store"
        },
    }

</script>


<style scoped>



</style>
