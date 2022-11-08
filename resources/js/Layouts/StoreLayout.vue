<template>
    <KeepAlive>
    <div>
        <Nav></Nav>
        <main class="mt-5 mb-5 px-3" style="overflow:hidden;">
            <div class="container-fluid">
                <div class="row overflow-hidden justify-content-between">
                    <div class="col-lg-3 col-md-9 mb-5">
                        <Categories></Categories>
                    </div>
                    <div class="col-lg-9 col-md-9 mb-5 ">
                        <div v-if="this.$route.name == 'home'" class="shadow">
                        <slider></slider>
                        </div>
                        <router-view v-else></router-view>
                    </div>
                </div>
                <div v-if="this.$route.name == 'home'"  class="row ">
                    <div class="content col-lg-12 col-md-12 col-sm-12 mb-3">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</KeepAlive>
</template>

<script>
    import Nav from '../Components/inc/Nav'
    import Categories from '../Components/inc/Categories'
    import Footer from '../Components/inc/Footer'
    import Slider from '../Components/inc/Slider'

    export default {
        components: {
            Nav,
            Categories,
            Footer,
            Slider
        }

    }

</script>
