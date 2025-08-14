<template>
  <div class="product-detail" v-if="product">
    <div class="detail-content">
      <div class="image-box">
        <img :src="getImage(product.img)" :alt="product.name" />
      </div>
      <div class="info-box">
        <h1 class="product-title">
          {{ product.name }}
          <span v-if="averageRating > 0" class="avg-rating">
            ({{ averageRating }} ★ | {{ comments.lenght }} đánh giá)
          </span>
        </h1>
        <p class="price">Giá cơ bản: {{ formatPrice(product.price) }} đ</p>

        <!-- Size -->
        <div class="size-select">
          <label>Chọn size:</label>
          <div class="size-btn-group">
            <button
              v-for="size in sizes"
              :key="size.id"
              :class="['size-btn', { active: selectedSize === size.id }]"
              @click="selectedSize = size.id"
            >
              {{ size.namesize }} (+{{ formatPrice(size.price) }} đ)
            </button>
          </div>
        </div>

        <!-- Topping -->
        <div class="topping-select" v-if="product.categories_item_id !== 5">
          <label>Chọn topping:</label>
          <div class="topping-list">
            <label v-for="topping in toppings" :key="topping.id" class="topping-item">
              <input type="checkbox" :value="topping.id" v-model="selectedToppings" />
              {{ topping.nametopping }} (+{{ formatPrice(topping.price) }} đ)
            </label>
          </div>
        </div>

        <p class="total-price">Tổng: {{ calculateTotal }} đ</p>
        <button class="add-cart-btn" @click="addToCart">Thêm vào giỏ hàng</button>
      </div>
    </div>
     <!-- Bình luận -->
    <div class="comment-list" v-if="comments.length">
      <h3>Ý kiến khách hàng</h3>
      <div v-for="cmt in comments" :key="cmt.id" class="comment-item">
        <p><strong>{{ cmt.username }}</strong> - {{ cmt.rating }}★</p>
        <p>{{ cmt.text }}</p>
        <small>{{ new Date(cmt.date).toLocaleString('vi-VN') }}</small>
      </div>
    </div>
    <div v-else>
      <p>Chưa có bình luận nào cho sản phẩm này.</p>
    </div>

    <!-- Form gửi bình luận: chỉ hiện khi đã đăng nhập -->
    <div v-if="userStore.currentUser" class="comment-form">
      <h3>Đánh giá & Bình luận</h3>
      <div class="rating-stars">
        <span v-for="star in 5" :key="star" class="star"
              :class="{ active: star <= userRating }"
              @click="userRating = star">★</span>
      </div>
      <textarea v-model="userComment" placeholder="Nhập bình luận..." rows="3"></textarea>
      <button @click="submitComment">Gửi</button>
    </div>
    <div v-else>
      <p>Vui lòng <router-link to="/login">đăng nhập</router-link> để đánh giá sản phẩm.</p>
    </div> 
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/store/productAPI';
import { useCartStore } from '@/store/Cart.js';
import { useStore } from '@/store/userStore';
import axios from 'axios';

const cartStore = useCartStore();
const store = useProductsStore();
const userStore = useStore();
const route = useRoute();

const product = ref(null);
const sizes = ref([]);
const toppings = ref([]);
const selectedSize = ref(null);
const selectedToppings = ref([]);

// rating & comment
const comments = ref([]);
const userRating = ref(0);
const userComment = ref('');

// Fetch data + bình luận
onMounted(async () => {
  const id = route.params.id;
  await store.fetchProductDetails(id);
  await store.fetchSizes();
  await store.fetchToppings();

  product.value = store.productDetail;
  sizes.value = store.sizes;
  toppings.value = store.toppings;
  selectedSize.value = sizes.value[0]?.id || null;

  // lấy danh sách bình luận từ JS
  const res = await axios.get(`http://localhost:3000/comments?productId=${id}`);
  comments.value = res.data;
});

// gửi bình luận
async function submitComment(){
  if (!userRating.value || !userComment.value.trim()) {
    alert('Vui lòng chọn số sao và nhập nội dung bình luận.');
    return;
  }

  const newComment = {
      productId: product.value.id,
      username: userStore.currentUser.username,
      rating: userRating.value,
      text: userComment.value,
      date: new Date().toISOString()
    };

    try {
      const res = await axios.post('http://localhost:3000/comments', newComment);
      comments.value.push(res.data);
      userRating.value = 0;
      userComment.value = '';
      alert('Bình luận đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error);
      alert('Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại sau.');
    }
}
// điểm trung bình rating
const averageRating = computed(() => {
  if(comments.value.lenght === 0) return 0;
  const sum = comments.value.reduce((total, c) => total + c.rating, 0);
  return (sum / comments.value.length).toFixed(1);
});
// Watch currentUser changes
watch(
  () => userStore.currentUser,
  (newUser) => {
    console.log('currentUser updated in ProductDetail:', newUser);
  }
);

function getImage(imgFileName) {
  try {
    return require(`@/assets/img/img/${imgFileName}`);
  } catch {
    return 'https://via.placeholder.com/300';
  }
}

function formatPrice(price) {
  return price.toLocaleString('vi-VN');
}

const calculateTotal = computed(() => {
  if (!product.value) return 0;
  let total = product.value.price;

  const selectedSizeObj = sizes.value.find(s => s.id === selectedSize.value);
  if (selectedSizeObj) total += selectedSizeObj.price;

  const toppingPrice = toppings.value
    .filter(t => selectedToppings.value.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);
  total += toppingPrice;

  return total.toLocaleString('vi-VN');
});

function addToCart() {
  console.log('Attempting to add to cart, currentUser:', userStore.currentUser);
  if (!userStore.currentUser) {
    alert('Vui lòng đăng nhập để mua sản phẩm!');
    return;
  }

  if (!product.value) return;

  let selectedSizeObj = sizes.value.find(s => Number(s.id) === Number(selectedSize.value));
  if (!selectedSizeObj && sizes.value.length > 0) {
    selectedSizeObj = sizes.value[0];
    selectedSize.value = selectedSizeObj.id;
  }

  const basePrice = product.value.price;
  const sizePrice = selectedSizeObj ? selectedSizeObj.price : 0;
  const toppingPrice = toppings.value
    .filter(t => selectedToppings.value.includes(t.id))
    .reduce((total, t) => total + t.price, 0);
  const totalPrice = basePrice + sizePrice + toppingPrice;

  const cartItem = {
    id: product.value.id,
    name: product.value.name,
    image: product.value.img,
    size: selectedSizeObj?.namesize || 'M',
    toppings: selectedToppings.value.length ? toppings.value.filter(t => selectedToppings.value.includes(t.id)) : [],
    price: totalPrice,
    quantity: 1
  };

  cartStore.addToCart(cartItem); // Gọi phương thức addToCart
  console.log('Cart item added:', cartItem); // Debug
  alert('Đã thêm vào giỏ hàng!');
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 60px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.image-box {
  flex: 1;
  min-width: 300px;
  text-align: center;
}

.image-box img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-box {
  flex: 2;
  min-width: 300px;
}

.product-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
}

.price,
.total-price {
  font-size: 1.5rem;
  color: #96c93e;
  margin-bottom: 20px;
  font-weight: 600;
}

.size-select,
.topping-select {
  margin-bottom: 20px;
}

.size-select label,
.topping-select label {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 10px;
  display: block;
}

.size-btn-group,
.topping-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-btn {
  padding: 10px 20px;
  border: 2px solid #96c93e;
  background: #fff;
  color: #96c93e;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.size-btn:hover,
.size-btn.active {
  background: #96c93e;
  color: #fff;
}

.topping-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #555;
}

.topping-item input {
  margin: 0;
}

.add-cart-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: #96c93e;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.add-cart-btn:hover {
  background: #7ba730;
}

.avg-rating {
  font-size: 18px;
  color: gold;
  margin-left: 5px;
}

.comment-list {
  margin-top: 20px;
}

.comment-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.comment-item strong {
  color: #333;
}

.rating-stars {
  font-size: 22px;
  margin: 5px 0;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
}

.star.active {
  color: gold;
}

.comment-form textarea {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.comment-form button {
  background-color: #28a745;
  border: none;
  padding: 8px 15px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.comment-form button:hover {
  background-color: #218838;
}

/* Responsive */
@media (max-width: 768px) {
  .product-detail {
    margin: 20px;
    padding: 15px;
  }

  .detail-content {
    flex-direction: column;
  }

  .image-box img {
    max-width: 250px;
  }

  .product-title {
    font-size: 1.8rem;
  }

  .price,
  .total-price {
    font-size: 1.2rem;
  }

  .size-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .add-cart-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
}
</style>