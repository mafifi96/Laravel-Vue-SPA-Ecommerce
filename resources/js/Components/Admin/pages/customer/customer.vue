<template>
    <div>
        <!-- Begin Page Content -->
        <div class="container-fluid">
            <!-- Page header -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">customers</h1>

            </div>

            <!-- Content Row -->
            <div class="row">

                <div class="col-md-12">

                    <div class="card border-0 p-2">
                        <div class="card-header py-4 mb-2 bg-white">
                            <div class="text-center">
                                <img src="/imgs/default-image.jpg" style="height:20vh;"
                                    class="d-block mx-auto rounded-circle shadow shadow-sm" alt="placeholder">
                            </div>
                        </div>
                        <div class="card-body table-responsive">
                            <table class="table table-bordered text-center">
                                <tbody>
                                    <tr>
                                        <td class="text-capitalize">name</td>
                                        <td class="fw-bold">{{customer.name}}</td>
                                        <td class="text-capitalize">email</td>
                                        <td class="fw-bold">{{customer.email}}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-capitalize">address</td>
                                        <td class="fw-bold">{{customer.address ?? 'Not Provided'}}</td>
                                        <td class="text-capitalize">phone</td>
                                        <td class="fw-bold">{{customer.phone ?? 'Not Provided'}}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-capitalize" colspan="1">joined</td>
                                        <td class="fw-bold" colspan="3">{{formateDate(customer.created_at)}}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div class="card-footer py-2 bg-white">
                            <h4>
                                Customer Order`s <span> {{customer.orders?.length}} </span>
                            </h4>
                            <div class="mt-3">
                                <div>

                                    <ul class="list-group">
                                        <li class="list-group-item"
                                         v-for=" order in customer.orders" :key="order.id">
                                             <router-link
                                            :to="{name :'admin.orders.order',
                                            params :{id : order.id }}">
                                            {{formateDate(order.updated_at)}}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
        data: () => ({
            customer: {},
        }),
        methods: {
            async getcustomer() {
                await axios.get("/api/customers/" + this.$route.params.id).then(res => {

                    this.customer = res.data.customer;

                }).catch(err => {
                    console.log(err)
                })
            },
            warning(id) {
                this._id = id
                Swal.fire({
                    title: 'Warning!',
                    text: 'Do you want to delete this customer!',
                    icon: 'warning',
                    confirmButtonText: 'yes',
                    showCancelButton: true
                }).then(res => {
                    if (res.isConfirmed) {
                        this.deletecustomer(id)
                    }
                })
            },
            async deletecustomer(id) {

                await axios.delete(`/api/customers/${this._id}`).then(res => {

                    Swal.fire({
                        title: 'deleted!',
                        text: 'customer Deleted Successfully..!',
                        icon: 'success',
                        showCancelButton: true
                    })
                    this.getcustomers()
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
                return moment(date).format('MMMM Do YYYY, h:m a');
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getcustomer()
                //document.title = "Store | Customers - " + this.customer.name

            })

        }
    }

</script>

<style>

</style>
