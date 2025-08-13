import { defineStore } from 'pinia';
import axios from 'axios';

const API = 'http://localhost:3000';

export const useStore = defineStore('user', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    setUser(user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    actions: {
    // Kiểm tra email đã tồn tại chưa
    async isEmailTaken(email) {
      const q = encodeURIComponent(email.trim().toLowerCase());
      const { data } = await axios.get(`${API}/users?email=${q}`);
      return Array.isArray(data) && data.length > 0;
    },

    // Đăng ký: chặn trùng email
    async registerUser({ username, email, phone, password }) {
      const normalized = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        throw new Error('INVALID_EMAIL');
      }
      if (await this.isEmailTaken(normalized)) {
        throw new Error('EMAIL_TAKEN');
      }

      const payload = { username, email: normalized, phone, password };
      // để JSON-Server tự tăng id
      const { data } = await axios.post(`${API}/users`, payload);
      this.currentUser = data;
      return data;
    },

    // Đổi email trong hồ sơ: cũng chặn trùng
    async updateEmail(newEmail) {
      if (!this.currentUser) throw new Error('NOT_LOGGED_IN');

      const normalized = newEmail.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
        throw new Error('INVALID_EMAIL');
      }

      // nếu đổi sang chính email cũ thì bỏ qua
      if (normalized !== this.currentUser.email) {
        if (await this.isEmailTaken(normalized)) {
          throw new Error('EMAIL_TAKEN');
        }
      }

      const { data } = await axios.patch(
        `${API}/users/${this.currentUser.id}`,
        { email: normalized }
      );
      this.currentUser = { ...this.currentUser, ...data };
      return data;
    }
  }
  }
});