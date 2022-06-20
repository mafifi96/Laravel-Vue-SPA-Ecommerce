<template>
    <div>

        <component :is="layout"></component>

    </div>
</template>
<script>

    import StoreLayout from './Layouts/StoreLayout'
    import AdminLayout from './Layouts/AdminLayout'
    import CustomerLayout from './Layouts/CustomerLayout'


    export default {
        components: {
            StoreLayout,
            AdminLayout,
            CustomerLayout
        },
        data: function () {
            return {
                DefaultLayout: "StoreLayout"
            }
        },
        methods : {
            getToken() {
                axios.post('/api/session').then(res => {
                    console.log("user : " + res.data.message)

                }).catch(err => {

                        this.$store.state.user = {}
                        this.$store.state.authenticated = false

                })
            }
        },
        computed: {
            layout() {
                return this.$route.meta.layout ? this.$route.meta.layout : this.DefaultLayout
            }
        },
        mounted (){
            this.getToken()
        }

    }

</script>
