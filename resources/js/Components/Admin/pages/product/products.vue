<template>
    <div>
        <div class="dialog">
            <div class="card">
                <div class="card-header">
                    <h4>Are You Sure You Want To Delete This Item ?</h4>
                </div>
                <div class="card-body" style="padding:10px;text-align:center;">
                    <div class="btn-group">
                        <a class="btn btn-danger mx-4" @click.prevent="deleteProduct()">Delete</a>
                        <a class="btn btn-primary" @click.prevent="cancel()">Cancel</a>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page header -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Products</h1>
                <router-link :to="{name : 'admin.products.create'}"
                    class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-plus fa-sm "></i>
                    Create Product</router-link>
            </div>

            <!-- Content Row -->
            <div class="row">

                <div class="col-md-12">

                    <div class="card">
                        <div class="card-header">
                            <h6 class="h6 text-muted">All products</h6>
                        </div>
                        <div class="card-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Careated At</th>
                                        <th scope="col">Last Update</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <KeepAlive>
                                <tbody>

                                    <tr v-for="(product , index) in products" :key="index">
                                        <td scope="row">{{(index + 1)}}</td>
                                        <td>
                                            <router-link :to="{name : 'admin.product' , params : {id : product.id}}">
                                                {{product.title}}</router-link>
                                        </td>
                                        <td>{{product.price}}</td>
                                        <td>{{product.quantity}}</td>
                                        <td>
                                            <router-link
                                                :to="{name : 'admin.category' , params : {id : product.category.id}}"
                                                class="btn text-decoration-none">{{product.category.name}}</router-link>
                                        </td>
                                        <td>{{formateDate(product.created_at)}}</td>
                                        <td>{{formateDate(product.updated_at)}}</td>

                                        <td>
                                            <div class="btn-group">
                                                <router-link
                                                    :to="{name : 'admin.products.edit', params : {id : product.id}}"
                                                    class="btn btn-primary">
                                                    <i class="fas fa-edit"></i>
                                                </router-link>
                                                <a @click.prevent="warning($event)" :data-id="product.id"
                                                    class="btn btn-danger "><i class="fas fa-trash"></i>
                                                </a>

                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </KeepAlive>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <!-- /.container-fluid -->
    </div>
</template>
<script>
    import moment from 'moment'

    export default {
        data: function () {

            return {
                products: {}
            }
        },
        methods: {
            getProducts() {
                axios.get("/api/products").then(res => {

                    this.products = res.data;

                }).catch(err => {
                    console.log(err)
                })
            },
            warning(e) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Do you want to delete this product!',
                    icon: 'warning',
                    confirmButtonText: 'yes',
                    showCancelButton: true
                }).then(res => {
                    if (res.isConfirmed) {
                        this.deleteProduct(e)
                    }
                })
            },
            async deleteProduct(e) {

                let ID = e.target.dataset.id

                await axios.delete("/api/products/" + ID).then(res => {

                    Swal.fire({
                        title: 'deleted!',
                        text: 'Product Deleted Successfully..!',
                        icon: 'success',
                        showCancelButton: true
                    })

                    this.getProducts()

                }).catch(err => {

                    Swal.fire({
                        title: 'error!',
                        text: 'something went wrong..!',
                        icon: 'error',
                        showCancelButton: true
                    })

                })

            },
            formateDate(date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        mounted() {
            this.getProducts()
            document.title = "Store | Products"

        }
    }

</script>

<style scoped>

</style>
