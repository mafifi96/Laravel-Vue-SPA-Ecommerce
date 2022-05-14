<template>

    <div class="col-md-10 col-lg-10 col-sm-12 ">
        <div class="row">
            <div class="container">

                <!-- Outer Row -->
                <div class="row justify-content-center">

                    <div class=" col-md-6">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                <!-- Nested Row within Card Body -->
                                <div class="row">

                                    <div class="col-md-12">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <div v-show="errors && errors.msg" class="alert alert-danger">
                                                {{ errors.msg }}
                                            </div>

                                            <form class="user" @submit.prevent="submit" method="post">
                                                <input type="hidden" name="_token" :value="csrf">
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-user"
                                                        v-model="email" id="exampleInputEmail" name="email"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter mafifi350@gmail.com" required>
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        v-model="password" id="exampleInputPassword" name="password"
                                                        required placeholder="Password mafifi96">
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input"
                                                            id="customCheck" name="remember">
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary btn-user btn-block">
                                                    Login
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

            </div>
        </div>
    </div>

</template>

<script>
    import ValidationErrors from '../inc/ValidationErrors.vue'
    export default {
        components: {
            ValidationErrors
        },
        data() {
            return {
                errors: {},
                email: null,
                password: null,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        },
        methods: {
            submit() {
                axios.post("http://127.0.0.1:8000/api/login", {
                    email: this.email,
                    password: this.password,
                    _token: this.csrf
                }).then(res => {

                    // localStorage.setItem('user', JSON.stringify(response.data.user))

                    console.log(res.data.msg)
                    this.$router.push('/')

                }).catch(err => {

                    if (err.response.status === 414) {

                        this.errors = err.response.data;

                    }
                })
            }
        }


    }

</script>
