import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const layout = () => import('@/views/layout');
const notFound = () => import("@/components/common/404");
const login = () => import('@/page/login');
const routes = [
    {
        path: '/',
        name: '登录',
        component: login,
        meta: {
            title: '',
            requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
        }
    },
    {
        path: '/layout',
        name: 'index',
        component: layout,
        children: [{
            path: '*',
            name: '错误',
            component: notFound,
        }],
    }
];

export default new Router({
    scrollBehavior: {y: 0},
    routes: routes
})
