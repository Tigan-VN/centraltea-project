import { defineStore } from 'pinia';
import { useStore } from '@/store/userStore'; // Để lấy currentUser

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {} // State reactive
  }),
  actions: {
    addToCart(product) {
      const userStore = useStore();
      if (!userStore.currentUser) return;

      const cartKey = `cart_${userStore.currentUser.id}`;
      let cart = { ...this.cart }; // Sao chép state hiện tại
      const productKey = `${product.id}_${product.size || 'default'}`;
      if (cart[productKey]) {
        cart[productKey].quantity += 1;
      } else {
        cart[productKey] = { ...product, quantity: 1 };
      }
      this.cart = { ...cart }; // Cập nhật state
      localStorage.setItem(cartKey, JSON.stringify(cart)); // Đồng bộ với localStorage
      console.log('Cart after add:', this.cart);
    },
    getCart() {
      const userStore = useStore();
      if (!userStore.currentUser) return this.cart;
      const cartKey = `cart_${userStore.currentUser.id}`;
      const savedCart = JSON.parse(localStorage.getItem(cartKey)) || {};
      if (JSON.stringify(this.cart) !== JSON.stringify(savedCart)) {
        this.cart = { ...savedCart }; // Đồng bộ nếu khác
      }
      return this.cart;
    }
  }
});