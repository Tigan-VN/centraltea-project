<template>
  <div class="menu-page">
    <!-- Sort và Breadcrumb -->
    <div class="page-title">
      <div class="breadcrumb">
        <router-link to="/">Trang chủ</router-link>
        <span>/</span>
        <router-link to="/menu">Menu</router-link>
      </div>
      <!-- Search -->
      <div class="search-box">
        <input 
        v-model="searchQuery"
        @focus="showSearchDropdown = true"
        @input="onInput"
        @blur="onSearchBlur"
        placeholder="Tìm kiếm sản phẩm..."
        type="text" name="" id=""
        />
        <button class="search-btn" @click="onSearchClick">Tìm kiếm</button>
      <!-- Search Results Dropdown -->
        <div v-if="showSearchDropdown && searchQuery" class="search-dropdown">
          <div v-if="filteredProducts.length">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="search-item"
              @mousedown.prevent="goToDetail(product.id)"
            >
            {{ product.name }}
            </div>
          </div>
          <div v-else class="search-item not-found"> Không tìm thấy sản phẩm.</div>
          </div>
      </div>
      <div class="sort-box">
        <select v-model="sortBy">
          <option value="popularity">Sắp xếp theo mức độ phổ biến</option>
          <option value="rating">Sắp xếp theo hạng trung bình</option>
          <option value="date">Sắp xếp theo mới nhất</option>
          <option value="price-asc">Giá: thấp đến cao</option>
          <option value="price-desc">Giá: cao đến thấp</option>
        </select>
      </div>
    </div>

    <!-- Main -->
    <div class="main">
      <!-- Left Sidebar -->
      <div class="col-left">
        <ul>
          <li :class="{ active: selectedCategory === 'all' }" @click="selectedCategory = 'all'">🥤 Tất cả</li>
          <li :class="{ active: selectedCategory === 'tea' }" @click="selectedCategory = 'tea'">Trà sữa</li>
          <li :class="{ active: selectedCategory === 'coffee' }" @click="selectedCategory = 'coffee'">Bánh Ngọt - Coffee</li>
          <li :class="{ active: selectedCategory === 'milk' }" @click="selectedCategory = 'milk'">Sữa tươi</li>
          <li :class="{ active: selectedCategory === 'fruit' }" @click="selectedCategory = 'fruit'">Trà trái cây</li>
          <li :class="{ active: selectedCategory === 'topping' }" @click="selectedCategory = 'topping'">Topping</li>
        </ul>
      </div>

      <!-- Right Content -->
      <div class="col-right">
        <!-- Grid sản phẩm -->
        <div class="product-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            @click="goToDetail(product.id)"
          >
            <div class="badge" v-if="product.badge">{{ product.badge }}</div>
            <img :src="getImage(product.img)" :alt="product.name" class="product-image" />
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ formatPrice(product.price) }} đ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '@/store/productAPI';
import { useRouter } from 'vue-router';

const store = useProductsStore();
const router = useRouter();

const selectedCategory = ref('all');
const sortBy = ref('popularity');

const searchQuery = ref('');
const showSearchDropdown = ref(false);

onMounted(async () => {
  if(!store.products.length){
  await store.fetchProducts();
  }
});

const filteredProducts = computed(() => {
  let products = [...store.products];

  if (selectedCategory.value !== 'all') {
    const categoryMap = {
      tea: [1, 2, 3, 4], // Trà sữa, Trà cream, Trà sữa tươi, Trà trái cây
      coffee: [6, 7],     // Coffee, Bánh ngọt
      milk: [3],          // Sữa tươi
      fruit: [4],         // Trà trái cây
      topping: [5]        // Topping
    };
    products = products.filter(p => categoryMap[selectedCategory.value].includes(p.categories_item_id));
  }

  // Lọc theo từ khóa tìm kiếm
  const q = searchQuery.value.trim().toLowerCase();
  if(q){
    products = products.filter(p => p.name?.toLowerCase().includes(q)
    );
  }
  
  // Sắp xếp
  if (sortBy.value === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
});

// Dropdown kết quả tìm kiếm
// const searchResults = computed(() => {
//   const q = searchQuery.value.trim().toLowerCase();
//   if (!q) return [];
//   return store.products.filter(p => p.name?.toLowerCase().includes(q));
// })

function onInput(){
  showSearchDropdown.value = !!searchQuery.value.trim();
}

function onSearchClick(){
  showSearchDropdown.value = !!searchQuery.value.trim();
}

function goToDetail(id) {
  router.push({ name: 'ProductDetail', params: { id } });
  showSearchDropdown.value = false;
  searchQuery.value = '';
}

function onSearchBlur() {
  setTimeout(() => {
    showSearchDropdown.value = false;
  }, 200);
}

function getImage(imgFileName) {
  try {
    return require(`@/assets/img/img/${imgFileName}`);
  } catch {
    return 'https://via.placeholder.com/150';
  }
}

function formatPrice(price) {
  return price.toLocaleString('vi-VN');
}
</script>

<style scoped>
.menu-page {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
}

.page-title {
  background-color: #96c93e;
  padding: 20px 5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.breadcrumb a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: #e0e0e0;
}

/* Search */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-box input {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: #c8f7c5;
  color: #333;
  width: 200px;
  transition: background-color 0.3s;
}

.search-box input:focus {
  background-color: #b0e0a5;
}

.search-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: #4caf50;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #45a049;
}

.search-dropdown {
  position: absolute;
  top: 100%; /* Ngay dưới input */
  left: 0;
  width: 100%;
  background-color: #96c93e;
  border-radius: 8px 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 999; /* Giúp nổi lên trên */

}

.search-item {
  padding: 8px 12px;
  cursor: pointer;
}

.search-item:hover {
  background-color:#4caf50;
  border-radius: 8px 12px;
}

.not-found {
  color: #000;
}

/* end search */

.sort-box select {
  border-radius: 20px;
  padding: 8px 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

.sort-box select:hover {
  background-color: #4caf50;
}

/* Layout */
.main {
  display: flex;
  padding: 40px 5em;
  gap: 30px;
  flex-wrap: wrap;
}

.col-left {
  flex: 0 0 200px;
  min-width: 160px;
}

.col-left ul {
  list-style: none;
  padding: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.col-left li {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: all 0.3s;
}

.col-left li:hover {
  background-color: #f0f0f0;
}

.col-left li.active {
  font-weight: bold;
  background-color: #96c93e;
  color: #fff;
  border-left: 4px solid #fff;
}

/* Product Grid */
.col-right {
  flex: 1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.product-image {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  font-weight: 500;
}

.product-price {
  font-weight: bold;
  color: #96c93e;
  font-size: 16px;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff4444;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    padding: 15px 20px;
    flex-direction: column;
    gap: 10px;
  }

  .main {
    padding: 20px;
    flex-direction: column;
  }

  .col-left {
    width: 100%;
    margin-bottom: 20px;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .product-image {
    height: 120px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 14px;
  }
}
</style>