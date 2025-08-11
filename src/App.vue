<template>
  <div id="app">
    <AppHeader/>
    <main class="main-content">
      <router-view/>
    </main>

    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
// import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    // HomePage,
    AppFooter
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* ✅ Reset margin/padding để tránh khoảng trống bất ngờ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 🔧 Layout toàn trang: dùng Flex để đẩy footer xuống */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 🔧 Nội dung chính co giãn để đẩy footer xuống dưới */
.main-content {
  flex: 1;
  padding-top: 106px;
}

</style>
