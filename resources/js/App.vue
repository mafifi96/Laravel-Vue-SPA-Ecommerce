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
        computed: {
            layout() {
                return this.$route.meta.layout
            }
        }

    }

</script>
