<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">


            <router-link class="nav-link" :to="{name : 'home' }">Store</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <li class="nav-item">
                        <!-- <a class="nav-link " aria-current="page" href="/">Home</a> -->
                        <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                    </li>

                    <template v-if="Authenticated && isAdmin">

                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name : 'dashboard' }">Dashboard</router-link>

                        </li>
                    </template>

                    <template v-if=" Authenticated && isCustomer">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name : 'customer'}">Profile</router-link>
                        </li>
                    </template>
                    <template v-if="!Authenticated">

                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name : 'register'}">register</router-link>

                        </li>

                        <li class="nav-item">

                            <router-link class="nav-link" :to="{name : 'login'}">login</router-link>

                        </li>
                    </template>

                    <li class="nav-item">
                        <router-link class="nav-link cart" :to="{name : 'cart'}"><i class="fas fa-shopping-cart"></i>
                            <span id="cart" v-if="$store.state.CartQuantity != 0">{{ $store.state.CartQuantity }}
                            </span>
                        </router-link>
                    </li>
                </ul>
                <form class="d-flex" >
                    <input class="form-control me-2" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" @click.stop.prevent="search()" type="submit">Search</button>
                </form>

            </div>
        </div>
    </nav>

</template>

<script>

import {mapGetters} from 'vuex'

    export default {

        data: function () {

            return {
                searchQuery : ''
            }
        },
        computed : {
            ...mapGetters({
                isAdmin : 'isAdmin',
                isCustomer : 'isCustomer',
                Authenticated : 'authenticated'
            })
        },
        methods: {
            search()
            {
                this.$router.push("/search?q="+this.searchQuery)
            },
            getCartQuantity()
            {
                this.$store.dispatch('Quantity')
            }

        },

        mounted() {
            this.getCartQuantity()

        }

    }

</script>


<style scoped>

</style>
