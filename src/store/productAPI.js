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
    const products = res.data;

    // Lấy toàn bộ comment
    const commentsRes = await axios.get('http://localhost:3000/comments');
    const comments = commentsRes.data;

    // Tính rating trung bình cho từng product
    this.products = products.map(prod => {
      const prodComments = comments.filter(c => c.productId === prod.id);
      const reviewCount = prodComments.length;
      const avgRating = reviewCount > 0
        ? (prodComments.reduce((sum, c) => sum + c.rating, 0) / reviewCount)
        : 0;
      return {
        ...prod,
        avgRating: parseFloat(avgRating.toFixed(1)),
        reviewCount
      };
    });

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
