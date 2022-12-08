<script setup>
    import {
        reactive,
        onMounted,
        computed
    } from 'vue';
    import {
        useRoute
    } from 'vue-router'

    const route = useRoute()

    //const product = ref({})
    const state = reactive({
        product: {
            id: Int8Array,
            title: String,
            description: Text,
            category: Object,
        },
        ID: route.params.id
    })

    const CatID = computed(()=>{
        return state.product.category.id
    })

    const CatName = computed(()=>{
        return state.product.category.name
    })

    function getProduc() {

        axios.get(`/api/products/${route.params.id}`).then(res => {

            state.product = res.data.product

            document.title = "Store | " + state.product.title

        }).catch(err => {
            console.log(err)
        })
    }

    onMounted(() => {
        getProduc()
    })

</script>

<template>

    <div>

        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page header -->
            <div class="d-sm-flex align-items-center justify-content-end mb-4">

                <router-link :to="{name :'admin.products.create'}" class="btn btn-sm btn-primary shadow-sm mx-2"><i
                        class="fas fa-plus fa-sm "></i>
                    Create product</router-link>
                <router-link :to="{name : 'admin.products.edit' , params : {id : route.params.id}}"
                    class="btn btn-info btn-sm shadow-sm"><i class="fas fa-edit fa-sm"></i> Edit</router-link>
            </div>

            <!-- Content Row -->
            <div class="row">

                <div class="col-md-12">
                    <h3 class="h3">{{state.product.title}}</h3>

                    <div class="product-cover" style="height:400px; width:100%;overflow:hidden;">

                        <template v-if="state.product.images?.length">
                            <img class="img-thumbnail" style="display: block; width:100%;height:100%"
                                :src="'/storage/'+ state.product.images[0]?.image" :alt="state.product.title"
                                :title="state.product.title" />
                        </template>

                        <template v-else>

                            <img class="img-thumbnail" style="display: block; width:100%;height:100%;"
                                src="/imgs/default-image.jpg" :alt="state.product.title" :title="state.product.title">

                        </template>


                    </div>

                    <div v-html="state.product.description" class="body mt-3"></div>

                    <div>
                        <p>
                            Category :
                            <router-link :to="'/admin/category/' + CatID">
                                {{CatName}}
                            </router-link>
                        </p>

                    </div>


                </div>

            </div>

        </div>

    </div>
</template>
