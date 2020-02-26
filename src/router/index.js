import Vue from 'vue'
import VueRouter from 'vue-router'
import state from "@/store/state";
import data from "@/router/data";
import result from "@/router/result";

Vue.use(VueRouter);

// 在这里把子路由引进来
const children = merge([
    data,
    result,
]);

// 合并多个数组
function merge(arr) {
    let result = [];
    arr.forEach((r) => {
        result = result.concat(r)
    });
    return result
}

const routes = [
    {
        path: '',
        redirect: {name: 'index'}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/layout/Login')
    },
    {
        path: '/alm',
        name: 'index',
        component: () => import('@/views/layout/Index'),
        children
    }
];

const router = new VueRouter({
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
