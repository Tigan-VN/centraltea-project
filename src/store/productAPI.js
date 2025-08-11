import { defineStore } from "pinia";
import axios from "axios";
//import { APIURL } from "@/constaint";

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    productDetail: null,
    sizes: [],
    toppings: []
  }),

  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/products');
        this.products = res.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    },

    async fetchProductDetails(id) {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        this.productDetail = res.data;
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      }
    },

    async fetchSizes() {
      try {
        const res = await axios.get('http://localhost:3000/sizes');
        this.sizes = res.data;
      } catch (error) {
        console.error('Lỗi khi lấy size:', error);
      }
    },

    async fetchToppings() {
      try {
        const res = await axios.get('http://localhost:3000/toppings');
        this.toppings = res.data;
      } catch (error) {
        console.error('Lỗi khi lấy topping:', error);
      }
    }
  }
});
