<template>
<div class="col-md-10 col-lg-10 col-sm-12 ">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 ">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->



                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <validation-errors :errors="errors" v-if="errors.length != 0">
                                            </validation-errors>

                                    <form class="user" @submit.prevent="register" method="post">

                                        <div class="form-group ">

                                            <input type="text" name="name" v-model="name" class="form-control form-control-user"
                                                id="exampleFirstName" placeholder="Name">
                                        </div>
                                        <div class="form-group">
                                            <input type="email" name="email" v-model="email" class="form-control form-control-user"
                                                id="exampleInputEmail" placeholder="Email Address">
                                        </div>
                                        <div class="form-group">

                                            <input type="password" name="password" v-model="password"
                                                class="form-control form-control-user" id="exampleRepeatPassword"
                                                placeholder="Password">

                                        </div>
                                        <button onclick="this.disabled='disabled';this.closest('form').submit();"
                                            type="submit" class="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <hr>
                            <div class="text-center">
                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div class="text-center">
                                <a class="small" href="/login">Already have an account? Login!</a>
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
                errors: [],
                name : null,
                email: null,
                password: null,
            }
        },
        methods: {
            register() {
                axios.post("http://127.0.0.1:8000/api/register", {
                    name : this.name,
                    email: this.email,
                    password: this.password
                }).then(res => {

                    // localStorage.setItem('user', JSON.stringify(response.data.user))

                    console.log(res.data)
                    //  this.$router.push('dashboard')

                }).catch(err => {
                    this.errors = err.data.errors;
                })
            }
        }


    }

</script>

