<template>
  <div class="cart-container">
    <h2 class="cart-title">Giỏ hàng</h2>
    <div v-if="!currentUser" class="cart-message">
      <p>Vui lòng <router-link to="/login" class="login-link">đăng nhập</router-link> để mua sản phẩm!</p>
    </div>
    <div v-else-if="Object.keys(cartItems).length === 0" class="cart-message">
      <p>Giỏ hàng trống!</p>
    </div>
    <div v-else class="cart-content">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Toppings</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in cartItems" :key="key">
            <td>{{ item.name }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.toppings.length ? item.toppings.map(t => t.nametopping).join(', ') : 'Không có' }}</td>
            <td>{{ formatPrice(item.price * item.quantity) }} đ</td>
            <td>
              <button @click="decreaseQuantity(key)" class="quantity-btn">-</button>
              {{ item.quantity }}
              <button @click="increaseQuantity(key)" class="quantity-btn">+</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cart-total">
        <p>Tổng cộng: {{ formatPrice(totalAmount) }} đ</p>
        <router-link v-if="currentUser" to="/purchar" class="checkout-btn">Thanh toán</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from '@/store/userStore';
import { useCartStore } from '@/store/Cart.js';

const store = useStore();
const cartStore = useCartStore();
const currentUser = computed(() => store.currentUser);

// Đồng bộ cart khi mount và khi currentUser thay đổi
onMounted(() => {
  if (currentUser.value) {
    cartStore.getCart();
    console.log('Cart initialized:', cartStore.cart);
  }
});

watch(
  () => currentUser.value,
  (newUser) => {
    if (newUser) {
      cartStore.getCart();
      console.log('Cart updated on user change:', cartStore.cart);
    }
  }
);

const cartItems = computed(() => {
  return { ...cartStore.cart }; // Trả về bản sao để tránh thay đổi trực tiếp
});

const totalAmount = computed(() => {
  return Object.values(cartItems.value).reduce((sum, item) => sum + item.price * item.quantity, 0);
});

function formatPrice(price) {
  return price.toLocaleString('vi-VN');
}

function increaseQuantity(key) {
  if (currentUser.value) {
    const cart = { ...cartStore.cart };
    if (cart[key]) {
      cart[key].quantity += 1;
      cartStore.cart = { ...cart };
      const cartKey = `cart_${currentUser.value.id}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      console.log('Cart after increase:', cartStore.cart);
    }
  }
}

function decreaseQuantity(key) {
  if (currentUser.value) {
    const cart = { ...cartStore.cart };
    if (cart[key] && cart[key].quantity > 1) {
      cart[key].quantity -= 1;
    } else {
      delete cart[key]; // Xóa sản phẩm nếu quantity <= 1
    }
    cartStore.cart = { ...cart };
    const cartKey = `cart_${currentUser.value.id}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
    console.log('Cart after decrease:', cartStore.cart);
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-title {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 20px;
  text-align: center;
}

.cart-message {
  text-align: center;
  color: #666;
  font-size: 16px;
}

.login-link {
  color: #4CAF50;
  text-decoration: underline;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.cart-table th {
  background: #4CAF50;
  color: white;
}

.cart-table td {
  vertical-align: middle;
}

.quantity-btn {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.quantity-btn:hover {
  background-color: #45a049;
}

.cart-total {
  text-align: right;
  margin-top: 20px;
}

.cart-total p {
  font-size: 18px;
  color: #4CAF50;
  margin-bottom: 10px;
}

.checkout-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.checkout-btn:hover {
  background: #43A047;
}

@media (max-width: 768px) {
  .cart-table {
    display: block;
    overflow-x: auto;
  }
  .cart-total {
    text-align: center;
  }
}
</style>