import { defineStore } from 'pinia';

export const useHoaDonStore = defineStore('hoadon', {
  state: () => ({
    bankAccount: '4260162678709',        // Số tài khoản ngân hàng
    bankName: 'MBBank',             // Mã ngân hàng VietQR (TPBank = TPB)
    bankOwner: 'Bùi Minh Tân',   // Tên chủ tài khoản
  }),

  getters: {
    qrImage: (state) => (paymentMethod, customer, total) => {
      if (paymentMethod !== 'bank' || !total || total <= 0) return '';
      const content = `THANH TOAN DON HANG - ${customer?.email || 'guest'}-${total}`;
      return `https://img.vietqr.io/image/${state.bankName}-${state.bankAccount}-compact.png` +
        `?amount=${total}` +
        `&addInfo=${encodeURIComponent(content)}`;
    },
  },
});
