import Vue from 'vue'
import VueRouter from 'vue-router'
import state from "@/store/state";

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: {name: 'index'}
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/Index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'login') {
        // 判断是否已登录，如果存在token，则已登录
        if (state.user.token) {
            next();
        } else {
            next({name: 'login', query: {redirect: to.path}});
        }
    }
    next();
});

export default router
