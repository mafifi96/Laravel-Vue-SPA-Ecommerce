<script setup>

    import Spinner from '../inc/Spinner'

    import {
        reactive,
        computed,
        onMounted,
        watch,
        ref
    } from 'vue';
import { useStore } from 'vuex';
    import {
        useRoute
    } from 'vue-router'

    const route = useRoute()
    const store = useStore()

    const _data = reactive({
        category: {},
        Id: route.params.id,
        title: route.params.name
    })

    const loading = ref(true)

    const isLoading = computed(()=>{
        return loading.value
    })


    const empty = computed(() => {
        return _data.category['products']?.length == 0

    })

    const size = computed(() => {
        return _data.category['products']?.length
    })

    async function getProducts() {

        await axios.get("/api/categories/" + _data.Id).then(res => {
            _data.category = res.data;
            loading.value = false
            document.title = "Store | Category - " + _data.category.name
        }).catch(err => {
            console.log(err)
        }).finally(()=>{
            loading.value = false
        })
    }

    function addToCart(e) {

        let Id = e.target.dataset.id;

        let fm = e.target.closest("form")[0];

        let Quantity = fm.value;

        if ((Quantity == '' && !isNaN(Quantity)) || (Quantity >= 1 && !isNaN(Quantity))) {

            Quantity = (Quantity == '') ? 1 : Quantity;

            axios.post("/api/cart/add", {
                product_id: Id,
                quantity: Quantity,
            }).then(res => {

                store.dispatch('Quantity')

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

    onMounted(() => {
        getProducts()
        console.log("mounted")
    })

    watch(route, (to, from) => {

        if(to.name == 'category')
        {
        _data.Id = route.params.id
        getProducts()
        }
    })

</script>

<template>

    <div class="col-md-10 col-lg-10 col-sm-12 ">
        <div class="container">
            <div class="row">
                <Spinner v-show="isLoading"></Spinner>
                <!-- Products -->
                <div class="col-md-12 col-lg-12 col-sm-12">
                    <div class="row">
                        <h6 v-show="!empty" class="mb-3 text-center">
                            <strong>
                                {{ size }}
                            </strong>
                            {{ size > 1 ? "products" : "product"}}
                            in
                            <strong>
                                {{_data.category.name}}
                            </strong> category </h6>
                        <div class="col-md-12 col-sm-12 col-lg-6 mb-3 " v-for=" product in _data.category['products']"
                            :key="product.id">

                            <div class="product mb-2 shadow-sm j">
                                <div class="pro-header mb-1">
                                    <router-link :to="{ name :'product', params : {id : product.id } }">
                                        <!--                                         <img :src="'/storage/'+ product.images[0].image" style="height:40vh;"
                                            class="img-fluid card-img-top" alt="placeholder">
 -->
                                    </router-link>

                                </div>

                                <div class="pro-body mb-1 p-2">
                                    <h5 :title=" product.title ">
                                        <router-link :to="{ name :'product', params : {id : product.id } }"
                                            style="color:#555;font-weight:400"
                                            class="text-decoration-none text-left text-capitalize">
                                            {{ product.title }}
                                        </router-link>
                                    </h5>
                                    <p style="font-weight:800;color:#000;">&dollar;{{ product.price }}</p>

                                    <div class="pro-add p-2">

                                        <form method="post" name="add">
                                            <div class="row">
                                                <div class="col-md-8 justify-content-">
                                                    <div class="form-group">
                                                        <input type="number" class="form-control" name="quantity"
                                                            value="" :placeholder="'in stock ' + product.quantity "
                                                            :max=product.quantity>
                                                    </div>
                                                </div>

                                                <div class="col-md-2 pull-right">
                                                    <button @click.prevent="addToCart($event)"
                                                        :data-id="product.id"
                                                        class="btn btn-primary addtocart" name="submit">Add</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <h6 v-show="empty && !isLoading" class="text-capitalize text-center">no
                            products in
                            <strong>{{_data.category.name}}</strong> category </h6>
                    </div>
                </div>
            </div>
        </div>


    </div>


</template>


