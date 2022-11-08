<template>

        <div class="shadow">
            <ul class="list-group">
                <li class="list-group-item" v-for="category in categories" v-bind:key="category.id">
                    <router-link :to="{name : 'category' , params : {id: category.id , name : category.name}}" class=" text-decoration-none text-dark d-block">
                        {{ category.name }}
                        </router-link>
                </li>
            </ul>
        </div>

</template>

<script>

    export default {
        data() {
            return {
                categories: []
            }
        },
        methods: {
            getCategories() {
                axios.get("/api/categories").then(res => {
                    this.categories = res.data;

                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getCategories()

        }
    }

</script>

<style scoped>
.list-group-item a{
    transition :all .3s ease-in-out;
}
.list-group-item a:hover{
    color:#0d6efd  !important;
    padding-left:2px;
}


</style>
