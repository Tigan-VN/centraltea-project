<template>
  <div class="bar-wrapper">
    <div class="container">
      <div class="top-bar">
        <div class="top-left">
          Hệ thống Trà Sữa R&B Tea
        </div>

        <div class="top-center">
          <div class="icon-text">
            <i class="fa-regular fa-clock"></i> 8:00-22:30
          </div>
          <div class="icon-text">
            <i class="fa-solid fa-phone"></i> Hotline: 0898.222.633
          </div>
        </div>

        <div class="top-right">
          <div v-if="currentUser">
            <span class="user-name">{{ currentUser.username }}</span>
            <button @click="handleLogout" class="logout-btn">Đăng xuất</button>
          </div>
          <div v-else>
            <router-link to="/login" class="login-link">Đăng nhập / Đăng ký</router-link>
          </div>
          <router-link to="/cart" class="cart-link">
            <div class="icon-text">
              Giỏ hàng / {{ cartItemCount }} <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="bottom-left">
          <a href="">
            <img src="@/assets/Logo-Centraltea.webp" alt="Tea Logo" class="logo">
          </a>
        </div>
        <div class="bottom-content">
          <ul class="nav-menu">
            <li><router-link to="/">Trang chủ</router-link></li>
            <li class="has-submenu">
              <router-link to="/menu">Menu <i class="fa-solid fa-angle-down"></i></router-link>
              <div class="menu-mega">
                <div class="menu-column">
                  <img src="@/assets/ảnh trà sữa.png" alt="trà sữa">
                  <div class="menu-category">
                    <h4>🥤 Trà Sữa</h4>
                    <ul>
                      <li>Trà cream<a href=""></a><span class="tagpopular">POPULAR</span></li>
                      <li>Trà sữa<a href=""></a><span class="taghot">HOT</span></li>
                      <li>Trà sữa tươi - Sữa tươi<a href=""></a></li>
                      <li>Trà trái cây<a href=""></a><span class="tagnew">NEW</span></li>
                      <li>Topping<a href=""></a></li>
                    </ul>
                  </div>
                </div>
                <div class="menu-column">
                  <img src="@/assets/ảnh bánh ngọt.png" alt="bánh ngọt">
                  <div class="menu-category">
                    <h4>🍰 Bánh Ngọt</h4>
                    <ul>
                      <li>Coffee<a href=""></a></li>
                      <li>Bánh ngọt<a href=""></a></li>
                    </ul>  
                  </div>
                </div>
              </div>
            </li>
            <li><a href="">Cửa hàng</a></li>
            <li class="has-submenu">
              <a href="">Chuyện trà <i class="fa-solid fa-angle-down"></i></a>
              <div class="mega-menu">
                <div class="mega-left">
                  <h4>Chuyện trà</h4>
                  <ul>
                    <li><a href="">Tin tức</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Khuyến mại</a></li>
                  </ul>
                </div>
                <div class="mega-right">
                  <img src="@/assets/ảnh chuyện trà.png" alt="ảng trà">
                </div>
              </div>
            </li>
            <li class="has-submenu">
              <a href="">Hướng dẫn cài đặt <i class="fa-solid fa-angle-down"></i></a>
              <div class="mega-menu">
                <div class="mega-left">
                  <h4>Hướng dẫn đặt trà</h4>
                  <ul>
                    <li><a href="">Cách chọn ly trà ngon</a></li>
                    <li><a href="">Đặt hàng qua đối tác giao hàng</a></li>
                    <li><a href="">Điều khoản mua hàng</a></li>
                  </ul>
                </div>
                <div class="mega-right">
                  <img src="@/assets/ảnh hướng dẫn đặt trà.png" alt="ảnh hướng dẫn đặt trà">
                </div>
              </div>
            </li>
            <li><a href="">Tuyển dụng</a></li>
            <li class="has-submenu">
              <a href="">Về chúng tôi <i class="fa-solid fa-angle-down"></i></a>
              <div class="mega-menu">
                <div class="mega-left">
                  <h4>Về chúng tôi</h4>
                  <ul>
                    <li><a href="">Giới thiệu R&B Tea</a></li>
                    <li><a href="">Giới thiệu Central Tea</a></li>
                    <li><a href="">Tuyển dụng</a></li>
                    <li><a href="">Điều khoản sử dụng</a></li>
                    <li><a href="">Chính sách sử dụng</a></li>
                  </ul>
                </div>
                <div class="mega-right">
                  <img src="@/assets/ảnh về chúng tôi.png" alt="ảnh về chúng tôi">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/userStore';
import { useCartStore } from '@/store/Cart.js';

// Khởi tạo các store và router
const store = useStore();
const cartStore = useCartStore();
const router = useRouter();

// Tính toán trạng thái user
const currentUser = computed(() => store.currentUser);

// Tính số lượng sản phẩm trong giỏ hàng
const cartItemCount = computed(() => {
  if (!currentUser.value) return 0;
  const cart = cartStore.getCart() || {};
  return Object.values(cart).reduce((sum, item) => sum + (item.quantity || 0), 0);
});

// Xử lý đăng xuất
const handleLogout = () => {
  store.logout(); // Xóa trạng thái user
  cartStore.getCart(); // Lấy giỏ hàng hiện tại
  localStorage.removeItem(`cart_${store.currentUser?.id}`); // Xóa giỏ hàng khỏi localStorage
  router.push('/login'); // Điều hướng về trang đăng nhập
};

onMounted(() => {
  // Đảm bảo currentUser được khởi tạo đúng
  if (!currentUser.value && localStorage.getItem('currentUser')) {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    store.setUser(savedUser); // Cập nhật lại nếu có dữ liệu trong localStorage
  }
});
</script>

<style>
  body {
      margin: 0;
      padding: 0;
    }

    .bar-wrapper {
      background-color: #000; /* nền bọc ngoài */
      padding: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: fixed;
      z-index: 9999;
      width: 100vw;
    }

    .top-bar {
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      height: 35px;
      margin-left: 183.6px;
      margin-right: 183.6px;
      margin: 0  auto;
      padding: 0;
      border: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #000;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    .top-left, .top-center, .top-right {
      display: flex;
      align-items: center;
    }

    .top-center {
      gap: 15px;
    }

    .icon-text {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .top-right {
      gap: 10px;
    }
    .top-right .login-link {
      color: #fff;
      text-decoration: none;
    }

    .top-right i {
      margin-left: 5px;
    }

    /* phần mới: bottom-bar */
.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 71px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

/* logo bên trái */
.bottom-left a {
  display: inline-block;
  width: 143px;
  height: 71px;
}

.bottom-left .logo {
  width: 130px;
  height: 71px;
  object-fit: contain;
}

/* menu điều hướng bên phải */
.bottom-content .nav-menu {
  width: 877px;
  height: 45.6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fff;
  font-family: Arial, sans-serif;
  gap: 10px;
}

.nav-menu li {
  /* margin-right: 20px; */
  position: relative;
}

.nav-menu li a {
  padding: 6px 10px;
  font-size: 14px;
  color: white;
  display: inline-block;
  text-decoration:none;
  white-space: nowrap;
}

.nav-menu li a:hover {
  color: #ffd700; /* màu vàng nhạt khi hover */
}

/* Cơ bản: menu con ẩn mặc định */
.has-submenu {
  position: relative;
}

/* Ẩn mặc định */
.mega-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 500px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  border-radius: 5px;
  z-index: 1000;
  flex-direction: row;
  padding: 20px;
  transition: all 0.3s ease;
}

/* Chỉ hiển thị khi hover vào LI */
.has-submenu:hover .mega-menu {
  display: flex;
}

.has-submenu:hover .menu-mega {
  display: flex;
}

/* Cột trái */
.mega-left {
  flex: 1;
  padding-right: 20px;
}

.mega-left h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #222;
}

.mega-left ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-left ul li {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.mega-left ul li a {
  text-decoration: none;
  color: #444;
  font-size: 15px;
}

/* Cột phải: hình ảnh */
.mega-right img {
  width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
  /* css cho menu */
.menu-mega {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 820px;
  height: 250px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;  
  padding: 20px;
  gap: 20px;
}

.menu-column {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
}


.menu-column img {
  width: 150px;
  height: 210px;
  border-radius: 5px;
  object-fit: cover;
}

.menu-category{
  flex: 1;
}
.menu-category h4 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #111;
}

.menu-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-category li {
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-size: 14px;
  color: #444;
}

.tagpopular, .taghot, .tagnew {
  font-size: 11px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 5px;
}

.taghot {
  background-color: red;
  color: white;
}

.tagnew {
  background-color: #1abc9c;
  color: white;
}

.tagpopular {
  background-color: #95a5a6;
  color: white;
}

.nav-menu> li:last-child .mega-menu {
  left: auto;
  right: 0;
}

@media (max-width: 768px) {
    .bottom-bar {
      flex-direction: column;
      align-items: center;
    }

    .bottom-left,
    .bottom-content {
      width: 100%;
      text-align: center;
    }

    .bottom-content .nav-menu {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
  .container {
  max-width: 1280px;  /* Kích thước theo ảnh bạn mong muốn */
  margin: 0 auto;      /* Căn giữa */
  width: 100%;
  padding: 0 15px;     /* Khoảng cách padding hai bên */
  box-sizing: border-box;
}

@media (max-width: 768px) {
    .bottom-bar {
      flex-direction: column;
      align-items: center;
    }

    .bottom-left,
    .bottom-content {
      width: 100%;
      text-align: center;
    }

    .bottom-content .nav-menu {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
</style>
<style scoped>
.product-detail {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 16px;
}
.detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.image-box {
  flex: 1;
  text-align: center;
}
.image-box img {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
}
.info-box {
  flex: 2;
}
.product-title {
  font-size: 2rem;
  margin-bottom: 10px;
}
.price {
  font-size: 1.3rem;
  color: #b30404;
  margin-bottom: 20px;
}
.size-btn-group, .topping-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}
.size-btn {
  padding: 8px 16px;
  border: 1px solid #b30404;
  background: #fff;
  color: #b30404;
  border-radius: 20px;
  cursor: pointer;
}
.size-btn:hover, .size-btn.active {
  background: #b30404;
  color: #fff;
}
.topping-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.add-cart-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: #0c2b44;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
.add-cart-btn:hover {
  background: #b30404;
}

.user-name {
  color: white;
  transition: color 0.3s;
}

.user-name:hover {
  color: #ffd700;
}
.login-link {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.login-link:hover {
  color: #ffd700;
}
.cart-link {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.cart-link:hover {
  color: #ffd700;
}
.top-right .lougout-btn{
  background-color: #000;
}
</style>