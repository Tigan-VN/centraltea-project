<template>
  <div class="purchar-container">
    <h2 class="purchar-title">Thanh toán</h2>

    <!-- Nếu chưa đăng nhập -->
    <div v-if="!currentUser" class="purchar-message">
      <p>Vui lòng <router-link to="/login" class="login-link">đăng nhập</router-link> để thanh toán!</p>
    </div>

    <!-- Nếu đã đăng nhập -->
    <div v-else class="purchar-content">

      <!-- Thông tin khách hàng -->
      <div class="user-info">
        <h3>Thông Tin khách Hàng</h3>
        <p><strong>Tên:</strong> {{ currentUser.username }}</p>
        <p><strong>Số điện thoại:</strong> {{ currentUser.phone }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <div class="address-form">
          <label>Địa chỉ:</label>
          <input v-model="address.city" placeholder="Thành phố" required />
          <input v-model="address.district" placeholder="Quận" required />
          <input v-model="address.ward" placeholder="Phường" required />
          <input v-model="address.street" placeholder="Số nhà" required />
        </div>
      </div>

      <!-- Chi tiết đơn hàng -->
      <div class="order-details">
        <h3>Chi tiết đơn hàng</h3>
        <table class="order-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Size</th>
              <th>Toppings</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in cartItems" :key="key">
              <td>{{ item.name }}</td>
              <td>{{ item.size }}</td>
              <td>{{ item.toppings.length ? item.toppings.map(t => t.nametopping).join(', ') : 'Không có' }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatPrice(item.price * item.quantity) }} đ</td>
            </tr>
          </tbody>
        </table>
        <p class="order-total">Tổng cộng: {{ formatPrice(totalAmount) }} đ</p>
      </div>

      <!-- Phương thức thanh toán -->
      <div class="payment-method">
        <h3>Phương thức thanh toán</h3>
        <label><input type="radio" v-model="paymentMethod" value="bank" /> Chuyển khoản ngân hàng</label>
        <label><input type="radio" v-model="paymentMethod" value="cod" /> Trả tiền khi nhận hàng</label>

        <!-- QR Code -->
        <div v-if="paymentMethod === 'bank' && totalAmount > 0" class="qr-code">
          <img :src="hoaDonStore.qrImage('bank', currentUser, totalAmount)" alt="QR Code" />
        </div>
      </div>

      <!-- Nút Thanh toán -->
      <button @click="handleCheckout" class="checkout-btn" :disabled="!isFormValid">Thanh toán</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/userStore';
import { useProductsStore } from '@/store/productAPI';
import { useCartStore } from '@/store/Cart.js';
import { useHoaDonStore } from '@/store/hoadon';
import axios from 'axios';

const router = useRouter();
const userStore = useStore();
const productStore = useProductsStore();
const cartStore = useCartStore();
const hoaDonStore = useHoaDonStore();

const currentUser = computed(() => userStore.currentUser);
const cartItems = computed(() => currentUser.value ? cartStore.getCart() || {} : {});
const totalAmount = computed(() => Object.values(cartItems.value).reduce((sum, item) => sum + item.price * item.quantity, 0));

const address = ref({ city: '', district: '', ward: '', street: '' });
const paymentMethod = ref('cod');

const isFormValid = computed(() => {
  return address.value.city && address.value.district && address.value.ward && address.value.street;
});

function formatPrice(price) {
  return price.toLocaleString('vi-VN');
}

async function handleCheckout() {
  if (!isFormValid.value) {
    alert('Vui lòng điền đầy đủ thông tin địa chỉ!');
    return;
  }
  if (Object.keys(cartItems.value).length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }
  if (paymentMethod.value === 'bank') {
    alert('Vui lòng quét mã QR để thanh toán!');
  }
  await submitOrder(paymentMethod.value === 'bank' ? 'Đã thanh toán' : 'Chưa thanh toán');
}

async function submitOrder(status) {
  try {
    const ordersRes = await axios.get('http://localhost:3000/orders');
    const newOrderId = String(Math.max(...ordersRes.data.map(o => parseInt(o.id))) + 1);

    const order = {
      id: newOrderId,
      user_id: currentUser.value.id,
      total: totalAmount.value,
      status: status,
      time: new Date().toISOString()
    };
    await axios.post('http://localhost:3000/orders', order);

    // Thêm chi tiết đơn hàng
    const orderDetailsRes = await axios.get('http://localhost:3000/orders_details');
    let lastDetailId = Math.max(...orderDetailsRes.data.map(od => parseInt(od.id)));

    await Promise.all(Object.entries(cartItems.value).map(async ([, item]) => {
      const sizeId = productStore.sizes?.find(s => s.namesize === item.size)?.id || '1';
      const orderDetail = {
        id: String(++lastDetailId),
        order_id: newOrderId,
        products_id: item.id,
        size_id: sizeId,
        quantity: item.quantity,
        price: item.price
      };
      await axios.post('http://localhost:3000/orders_details', orderDetail);
    }));

    // Xóa giỏ hàng
    localStorage.removeItem(`cart_${currentUser.value.id}`);
    cartStore.cart = {};
    alert('Đơn hàng đã được đặt thành công!');
    router.push('/');
  } catch (error) {
    console.error('Lỗi khi đặt hàng:', error);
    alert('Đã xảy ra lỗi khi đặt hàng!');
  }
}

onMounted(async () => {
  if (!productStore.sizes || productStore.sizes.length === 0) {
    await productStore.fetchSizes();
  }
});
</script>


<style scoped>
.purchar-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.purchar-title {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 20px;
  text-align: center;
}

.purchar-message {
  text-align: center;
  color: #666;
  font-size: 16px;
}

.login-link {
  color: #4CAF50;
  text-decoration: underline;
}

.user-info, .order-details, .payment-method {
  background-color: bisque;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.address-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.address-form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th,
.order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.order-table th {
  background: #4CAF50;
  color: white;
}

.order-total {
  font-size: 18px;
  color: #4CAF50;
  text-align: right;
  margin-bottom: 20px;
}

.payment-method label {
  display: block;
  margin: 10px 0;
}

.qr-code img{
  text-align: center;
  max-width: 200px;
  margin-top: 10px;
}

.checkout-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.checkout-btn:hover {
  background: #43A047;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>