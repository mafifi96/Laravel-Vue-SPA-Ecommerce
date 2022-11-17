<template>
        <Nav></Nav>
        <main class="mt-5 mb-5 px-3" style="overflow:hidden;">
            <div class="container-fluid">
                <div class="row overflow-hidden justify-content-between">
                    <div class="col-lg-3 col-md-9 mb-5">
                        <Categories></Categories>
                    </div>
                    <div class="col-lg-9 col-md-9 mb-5 ">
                         <template v-if="checkRoute">
                            <div class="shadow">
                                <!-- <slider></slider>
                                 -->
                            </div>
                        </template>
                        <template v-else>
                            <router-view></router-view>
                        </template> 
                        
                    </div>
                </div>
                 <template v-if="checkRoute">
                    <div class="row ">
                        <div class="content col-lg-12 col-md-12 col-sm-12 mb-3">
                            <router-view></router-view>
                        </div>
                    </div>
                </template>
            </div>
        </main>
        <Footer></Footer>
    
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
        },
        computed: {
            checkRoute : function() {
                return this.$route.name === 'home'
            }
        }

    }

</script>
