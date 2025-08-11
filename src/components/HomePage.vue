<template>
    <div class="home">
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <SwiperSlide v-for="(banner, index) in banners" :key="index">
        <img :src="banner" alt="Banner" class="banner-image" />
      </SwiperSlide>
    </Swiper>
    </div>
    <!-- background1 -->
    <div class="home">
        <!-- <img src="@/assets/background1.webp" alt="background1" class="background1"> -->
        <div class="home-content">
            <div class="home-middle">
                <div class="middle-left">
                    <div class="middle-inner">
                        <div class="inner">
                            <div class="text">
                                <h2><span>Sản phẩm mới của R&B Tea</span></h2>
                            </div>
                            <br>
                            <div class="text-mid">
                                <h2><span>Những ly trà mới với hương vị độc đáo tạo nên hương vị rất riêng của R&B Tea mà nhất đinh bạn phải thử</span></h2>
                            </div>
                            <br>
                            <br>
                            <div class="uongtrangay">
                                <router-link to="/menu">
                                    <span>Uống trà ngay</span>
                                </router-link>
                                <router-view/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="middle-right">
                <!-- gọi comp right-inner -->
                    <rightInner/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

import SwiperCore from 'swiper'
import {Autoplay, Pagination} from 'swiper/modules'
import rightInner from './RightInner.vue'


SwiperCore.use([Autoplay, Pagination])

const banners = ref([
    new URL('@/assets/banner1.webp', import.meta.url).href,
    new URL('@/assets/banner2.webp', import.meta.url).href,
    new URL('@/assets/banner3.webp', import.meta.url).href,
    new URL('@/assets/banner4.webp', import.meta.url).href

])


</script>

<style scoped>
.home{
    padding: 10px 0;
}
.mySwiper{
    width: 100%;
    height: auto;
}

.banner-image{
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.banner-image:hover{
    transform: scale(1.02);
}

.background1{
    width: 100%;
    height: auto;
}

.home-content{
    display: flex;
    justify-content: center;
    background-image: url('@/assets/background1.webp');
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    position: relative;
}

.home-middle{
    position: relative;
    display: flex;
    flex-flow: row wrap;
    max-width: 1080px;
    width: 100%;
    z-index: 1;
}
.middle-inner{
    margin-left: auto;
    margin-right:0;
    padding: 180px 62px 180px 77px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: auto;
    height: 750px;
}
.inner{
    width: 371px;
    height: 373.8px;
    padding: 20px 0;
}
.middle-inner .text{
    font-size: 1.5rem;
    text-align: left;
    color: #000000;
}
.uongtrangay {
    border-radius: 5px;
    display: inline-block;
    padding: 7px 20px 0px 20px;
    background-color: white;
    text-decoration: none;
    transition: border-radius 0.3 ease, background-color 0.3s ease;
    
}
.uongtrangay:hover{
    background-color:darkgrey   ;
}
/* nội dung middle-right */
.middle-right{
    /* width: 692.08px;
    height: 540px; */
    /* background-color: white; */
    margin-top: 100px;
    display: flex;
    
}
.right-inner{
    width: 510px;
    height: 630px;
    margin: 0 auto;
    padding: 17px 35px;
    background-color:white
}
.right-content{
    width: 440px;
    height: 601.075px;
    /* padding: 28px 35px 28px 35px; */
    gap: 30px 30px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    /* box-sizing: border-box; */
    justify-items: center;
}
/* định dạng cho các item khác */
.badge-content{
    position: absolute;
    /* display:inline-block;
    backface-visibility: hidden;
    display: table; */
    top: 10px;
    left: -5px;
    z-index: 1;
    margin-top: 10px;
}
.badge-circle{
    background-color: #96c93e;
    border-radius: 50%;
    color: white;
    width: 40px;
    height: 40px;
    line-height: 30px;
    font-weight: bold;
    font-size: 12px;
    padding: 5px;
    display: inline-block;
    text-align: center;
}
.sp1 {
    width: 210px;
    height: 280px;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: scale();
    position: relative;
}
.sp2 {
    width: 210px;
    height: 280px;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: scale();
    position: relative;
}
.sp3 {
    width: 210px;
    height: 280px;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: scale();
    position: relative;
}
.sp4{
    width: 210px;
    height: 280px;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: scale();
    position: relative;
}
.sp-item{
    width: 100%;
    max-width: 250px;
    transition: transform 0.3s ease;
}
.box-image{
    height: auto; 
    /* margin: 0 auto; */
    /* overflow: hidden; */
    position: relative;
    width: 100%;
    transition:ease-in-out;
}
.product .box-image .anhsp1{
    width: 210px;
    height: 210px;
}
.quick-view{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #2d6a4f;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
    font-size: 14px;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
}
.box-image:hover .quick-view{
    opacity: 1;
    transform: translateY(0);
    color: #fff;
}
.sp-item:hover{
    transform: scale(1.02);
}
.box-text{
    font-size: 1em;
    padding-bottom: .3em;
    padding-top: .7em;
    position: relative;
    width: 100%;
    text-align: center;
}
.box-text .title-wrapper {
    color: #96c93e;
}
.box-text .price-wrapper{
    font-weight: bold;
}

a,
.router-link-active,
.router-link-exact-active {
  color: #96c93e; /* màu ban đầu bạn muốn */
  text-decoration: none; /* nếu muốn bỏ gạch chân */
}
</style>