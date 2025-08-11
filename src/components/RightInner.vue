<template>
  <div class="right-inner">
    <div class="right-content">
        <div class="sp1 sp-item">
            <div class="sp1-inner">
                <div class="product">
                    <div class="box-image">
                        <div class="badge-content">
                            <div class="badge-circle">NEW</div>
                        </div>
                            <router-link to="/menu">
                                <img src="@/assets/yến mạch khoai môn sữa.webp " alt="yến mạch khoai môn" class="anhsp1">
                            </router-link>
                            <div class="quick-view">QUICK VIEW</div>
                    </div>
                    <!-- văn bản -->
                    <div class="box-text">
                        <div class="title-wrapper">
                            <div>
                                <router-link to="/menu">Yến mạch khoai môn sữa</router-link>
                            </div>
                        </div>
                        <div class="price-wrapper">
                            <span>60.000 ₫ – 85.000 ₫</span>
                        </div>
                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sp2 sp-item">
                                <div class="sp1-inner">
                                    <div class="product">
                                        <div class="box-image">
                                            <div class="badge-content">
                                                <div class="badge-circle">NEW</div>
                                            </div>
                                            <router-link to="/menu">
                                                <img src="@/assets/lục trà sữa việt quất.webp " alt="lục trà sữa tươi việt quất" class="anhsp1">
                                            </router-link>
                                            <div class="quick-view">QUICK VIEW</div>
                                        </div>
                                        <!-- văn bản -->
                                        <div class="box-text">
                                            <div class="title-wrapper">
                                                <p>
                                                    <router-link to="/menu">Lục trà sữa tươi việt quất</router-link>
                                                </p>
                                            </div>
                                            <div class="price-wrapper">
                                                <span>60.000 ₫ – 85.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sp3 sp-item">
                                <div class="sp1-inner">
                                    <div class="product">
                                        <div class="box-image">
                                            <div class="badge-content">
                                                <div class="badge-circle">NEW</div>
                                            </div>
                                            <router-link to="/menu">
                                                <img src="@/assets/lục trà trái cây Moctail.webp " alt="lục trà trái cây Moctail" class="anhsp1">
                                            </router-link>
                                            <div class="quick-view">QUICK VIEW</div>
                                        </div>
                                        <!-- văn bản -->
                                        <div class="box-text">
                                            <div class="title-wrapper">
                                                <p>
                                                    <router-link to="/menu">Lục trà trái cây Moctail</router-link>
                                                </p>
                                            </div>
                                            <div class="price-wrapper">
                                                <span>60.000 ₫ – 85.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sp4 sp-item">
                                <div class="sp1-inner">
                                    <div class="product">
                                        <div class="box-image">
                                            <div class="badge-content">
                                                <div class="badge-circle">NEW</div>
                                            </div>
                                            <router-link to="/menu">
                                                <img src="@/assets/yến mạch khoai môn sữa.webp " alt="yến mạch khoai môn" class="anhsp1">
                                            </router-link>
                                            <div class="quick-view">QUICK VIEW</div>
                                        </div>
                                        <!-- văn bản -->
                                        <div class="box-text">
                                            <div class="title-wrapper">
                                                <p>
                                                    <router-link to="/menu">Yến mạch khoai môn sữa</router-link>
                                                </p>
                                            </div>
                                            <div class="price-wrapper">
                                                <span>55.000 ₫ – 85.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
export default {

}
</script>

<style>
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