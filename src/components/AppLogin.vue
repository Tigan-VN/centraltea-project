<template>
  <div class="login-container">
    <div v-if="isLoggedIn" class="login-box">
      <h2>Đã đăng nhập: {{ store.currentUser.username }}</h2>
      <button @click="handleLogout">Đăng xuất</button>
    </div>
    <div v-else class="login-box">
      <div v-if="isRegister" class="login-box">
        <h2>Đăng ký</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Tên đăng nhập:</label>
            <input v-model="registerData.username" type="text" required />
          </div>
          <div class="form-group">
            <label>Mật khẩu:</label>
            <input v-model="registerData.password" type="password" required />
          </div>
          <div class="form-group">
            <label>Xác nhận mật khẩu:</label>
            <input v-model="registerData.confirmPassword" type="password" required />
          </div>
          <div class="form-group">
            <label>Gmail:</label>
            <input v-model="registerData.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Số điện thoại:</label>
            <input v-model="registerData.phone" type="tel" pattern="[0-9]{10}" required placeholder="10 số" />
          </div>
          <button type="submit">Đăng ký</button>
          <p @click="isRegister = false" class="switch-link">Đã có tài khoản? Đăng nhập</p>
        </form>
      </div>
      <div v-else class="login-box">
        <h2>Đăng nhập</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Tên đăng nhập:</label>
            <input v-model="loginData.username" type="text" required />
          </div>
          <div class="form-group">
            <label>Mật khẩu:</label>
            <input v-model="loginData.password" type="password" required />
          </div>
          <button type="submit">Đăng nhập</button>
          <p @click="isRegister = true" class="switch-link">Chưa có tài khoản? Đăng ký</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from '@/store/userStore';

const router = useRouter();
const store = useStore();

const isRegister = ref(false);
const registerData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: ''
});
const loginData = ref({
  username: '',
  password: ''
});

const isLoggedIn = computed(() => !!store.currentUser);

onMounted(async () => {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      const response = await axios.get('http://localhost:3000/users');
      const userInDB = response.data.find(u => u.username === userData.username && u.password === userData.password);
      if (userInDB) {
        store.setUser(userInDB);
        router.push('/');
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra user:', error);
      localStorage.removeItem('currentUser');
    }
  }
});

const handleRegister = async () => {
  if (registerData.value.password !== registerData.value.confirmPassword) {
    alert('Mật khẩu và xác nhận mật khẩu không khớp!');
    return;
  }
  if (!registerData.value.email) {
    alert('Gmail là bắt buộc!');
    return;
  }
  if (!registerData.value.phone || !/^[0-9]{10}$/.test(registerData.value.phone)) {
    alert('Số điện thoại phải là 10 số!');
    return;
  }

  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    if (users.some(user => user.username === registerData.value.username)) {
      alert('Tên đăng nhập đã tồn tại!');
      return;
    }

    const newUser = {
      id: String(Math.max(...users.map(u => parseInt(u.id))) + 1),
      username: registerData.value.username,
      password: registerData.value.password,
      email: registerData.value.email,
      phone: registerData.value.phone
    };

    await axios.post('http://localhost:3000/users', newUser);
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    isRegister.value = false;
    registerData.value = { username: '', password: '', confirmPassword: '', email: '', phone: '' };
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    alert('Đã xảy ra lỗi khi đăng ký!');
  }
};

const handleLogin = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const user = response.data.find(u => u.username === loginData.value.username && u.password === loginData.value.password);
    if (user) {
      store.setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Đăng nhập thành công, currentUSer: ', store.currentUser);
      router.push('/');
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    alert('Đã xảy ra lỗi khi đăng nhập!');
  }
};

const handleLogout = () => {
  store.logout();
  localStorage.removeItem('currentUser');
  router.push('/login');
};
</script>

<style scoped>
/* Biến CSS dựa trên màu chủ đạo của Central Tea */
:root {
  --primary-color: #4CAF50; /* Xanh lá cây chủ đạo */
  --hover-color: #43A047; /* Xanh lá đậm hơn khi hover */
  --background-color: #96c93e; /* Trắng nền */
  --border-color: #E0E0E0; /* Xám nhạt viền */
  --text-color: #212121; /* Đen nhạt cho văn bản */
  --shadow-color: rgba(0, 0, 0, 0.1); /* Bóng mờ nhẹ */
  --spacing-unit: 15px;
}

/* Container chính */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #96c93e 0%, #E8F5E9 100%);
  padding: var(--spacing-unit);
}

/* Box chứa form */
.login-box {
  max-width: 450px;
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 0 6px 12px var(--shadow-color);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--shadow-color);
}

/* Nhóm form */
.form-group {
  margin-bottom: var(--spacing-unit);
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background-color: #FAFAFA;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.2);
  outline: none;
}

/* Button */
button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, var(--primary-color) 0%, #43A047 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: linear-gradient(90deg, var(--hover-color) 0%, #388E3C 100%);
  transform: translateY(-2px);
}

/* Link chuyển đổi form */
.switch-link {
  margin-top: var(--spacing-unit);
  color: var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
}

.switch-link:hover {
  color: var(--hover-color);
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 480px) {
  .login-box {
    max-width: 100%;
    padding: var(--spacing-unit);
  }

  input,
  button {
    font-size: 14px;
  }

  button {
    padding: 10px;
  }
}
</style>