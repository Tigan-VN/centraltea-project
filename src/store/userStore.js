import { defineStore } from 'pinia';

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
    }
  }
});