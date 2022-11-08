<template>
  <swiper
    :slides-per-view="1"
    :space-between="10"
    :pagination="{
      type: 'progressbar',
    }"
    navigation
    autoplay
    :modules="modules"
    @swiper="onSwiper"
    @slideChange="onSlideChange"

  >
    <swiper-slide v-for="(p , index) in sliderProducts" :key="index">
    <img class="img-fluid rounded-2" style="height:74.5vh;width:100vw;object-fit:cover;" :src="'/storage/'+ p.images[0].image">

    </swiper-slide>

  </swiper>
</template>
<script>
  // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
        return {
            sliderProducts : []
        }
    },
    methods : {
        async Products() {
                await axios.get("/api/slider").then(res => {
                    this.sliderProducts = res.data.products
                }).catch(err => {
                    console.log(err)
                })
            }
    },
    mounted(){
        this.Products()
    },
    setup() {
      const onSwiper = (swiper) => {

      };
      const onSlideChange = () => {

      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y , Autoplay]
      };
    },
  };
</script>
