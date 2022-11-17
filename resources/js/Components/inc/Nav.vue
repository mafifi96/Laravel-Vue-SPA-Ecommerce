<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-white text-dark shadow-sm">
        <div class="container-fluid">

            <router-link class="nav-link text-dark fw-bold" :to="{name : 'home' }">Store</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll " style="--bs-scroll-height: 100px;">
                    <li class="nav-item">

                        <router-link :to="{ name: 'home' }" class="nav-link text-dark">Home</router-link>
                    </li>

                    <template v-if="Authenticated && isAdmin">

                        <li class="nav-item">
                            <router-link class="nav-link text-dark" :to="{name : 'dashboard' }">Dashboard</router-link>

                        </li>
                    </template>

                    <template v-if=" Authenticated && isCustomer">
                        <li class="nav-item">
                            <router-link class="nav-link text-dark" :to="{name : 'profile'}">Profile</router-link>
                        </li>
                    </template>
                    <template v-if="!Authenticated">

                        <li class="nav-item">
                            <router-link class="nav-link text-dark" :to="{name : 'register'}">register</router-link>

                        </li>

                        <li class="nav-item">

                            <router-link class="nav-link text-dark" :to="{name : 'login'}">login</router-link>

                        </li>
                    </template>

                    <li class="nav-item">
                        <router-link class="nav-link btn btn-primary text-white" :to="{name : 'cart'}">

                        <i class="fas fa-shopping-cart"></i>

                            <span class="badge bg-dark ml-2" v-if="$store.state.CartQuantity != 0">{{quantity}}
                            </span>

                        </router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" v-model="searchQuery" placeholder="Search"
                        aria-label="Search">
                    <button class="btn btn-outline-primary" @click.stop.prevent="search()" type="submit">Search</button>
                </form>

            </div>
        </div>
    </nav>

</template>

<script>
    import {
        mapGetters
    } from 'vuex'

    export default {

        data: function () {

            return {
                searchQuery: ''
            }
        },
        computed: {
            ...mapGetters({
                quantity : 'quantity',
                isAdmin: 'isAdmin',
                isCustomer: 'isCustomer',
                Authenticated: 'authenticated'
            })
        },
        methods: {
            search() {
                this.$router.push("/search?q=" + this.searchQuery)
            },
            getCartQuantity() {

            console.log("getting quantity - ")

            this.$store.dispatch('Quantity')

            console.log("quantity loaded - ")
            }

        },

        mounted() {
            this.getCartQuantity()
        }

    }

</script>
