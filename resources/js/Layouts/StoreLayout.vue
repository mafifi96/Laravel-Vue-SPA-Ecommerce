<template>
    <div>
        <Nav></Nav>
        <main class="mt-5 mb-5 px-3" style="overflow:hidden;">
            <div class="container-fluid">
                <div class="row">
                    <Categories></Categories>

                    <router-view></router-view>

                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
    import Nav from '../Components/inc/Nav'
    import Categories from '../Components/inc/Categories'
    import Footer from '../Components/inc/Footer'

    export default {
        components : {
            Nav,
            Categories,
            Footer
        }

    }

</script>
