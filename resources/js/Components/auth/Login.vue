<template>

<div class="row justify-content-center">
<div class="col-lg-7 col-md-7 col-sm-12">
                        <div class="card o-hidden border-0 shadow shadow-y-sm">
                            <div class="card-body p-0">
                                <!-- Nested Row within Card Body -->
                                <div class="row">

                                    <div class="col-md-12">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <div class="alert alert-danger"
                                                v-if="errors && (errors.email || errors.password || errors.message)">
                                                <div v-for="(v, k) in errors" :key="k">
                                                    <p v-for="error in v" :key="error" class="text-sm">
                                                        {{ error }}
                                                    </p>
                                                </div>
                                            </div>

                                            <form class="user" @submit.prevent="login" method="post">
                                                <input type="hidden" name="_token" :value="csrf">
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-user"
                                                        v-model="creds.email" id="exampleInputEmail" name="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter mafifi350@gmail.com" required>
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        v-model="creds.password" id="exampleInputPassword"
                                                        name="password" required placeholder="Password mafifi96">
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input"
                                                            id="customCheck" name="remember">
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button :disabled=processing class="btn btn-primary btn-user btn-block">
                                                    {{processing ? "login..." : "Login"}}
                                                </button>

                                            </form>
                                            <hr>
                                            <div class="text-center">
                                                <a class="small" href="/forgot-password">Forgot Password?</a>
                                            </div>
                                            <div class="text-center">
                                                <a class="small" href="/register">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
</div>
</div>
</template>

<script>

    import {
        mapActions
    } from 'vuex'


    export default {

        data() {
            return {
                errors: null,
                creds: {
                    email: '',
                    password: '',
                },
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

                processing: false
            }
        },
        methods: {
            ...mapActions({
                signIn: 'login'
            }),
            async login() {
                this.processing = true
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/api/login', this.creds).then(res => {

                   // window.axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.token}`}

                    this.signIn()

                }).catch(err => {
                    this.errors = err.response.data.errors;
                    console.log(err)
                }).finally(() => {
                    this.processing = false
                })
            },
            redirectAuth() {
                if (this.$store.getters.isAdmin) {
                    this.$router.push({
                        name: 'dashboard'
                    })

                } else if (this.$store.getters.isCustomer) {
                    this.$router.push({
                        name: 'customer'
                    })
                }
            }
        },
        watch: {
            '$store.getters.authenticated': function () {
                this.redirectAuth()
            }
        },
        created(){
            document.title = "Store | Login"
        },
        mounted() {
            this.redirectAuth()

        }

    }

</script>
