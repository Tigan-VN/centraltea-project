import{createRouter, createWebHistory} from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import MenuPage from '@/components/MenuPage'
import ProductDetail from '@/components/ProductDetail.vue';
import AppLogin from '@/components/AppLogin.vue';
import AppCart from '@/components/AppCart.vue';
import AppPurchar from '@/components/AppPurchar.vue';
// import { useStore } from '@/store/userStore';

const routes = [
    {
        path:'/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path:'/menu',
        name: 'MenuPage',
        component: MenuPage,
    },
    {
        path:'/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
    },
    {
        path: '/login',
        name: 'AppLogin',
        component: AppLogin,
        
    },
    {
        path: '/cart',
        name: 'AppCart',
        component: AppCart,
    },
    {
        path: '/purchar',
        name: 'AppPurchar',
        component: AppPurchar,
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes
});

// // Middleware để kiểm tra trạng thái đăng nhập
// router.beforeEach((to, from, next) => {
//   const store = useStore(); // Lấy store
//   if (to.meta.requiresAuth && !store.currentUser) {
//     // Nếu route yêu cầu đăng nhập và chưa đăng nhập, chuyển đến /login
//     next('/login');
//   } else {
//     next(); // Cho phép tiếp tục
//   }
// });
export default router;