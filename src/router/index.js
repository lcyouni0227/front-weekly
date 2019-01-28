import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const layout = () => import('@/views/layout');
const notFound = () => import("@/components/common/404");
const login = () => import('@/views/login/login');
//权限管理
const authority = () => import('@/views/Authority');
//视图设计
const ViewDesign = () => import('@/views/ViewDesign');
//部门管理
const BM = () => import('@/views/BM');
//关于我们
const About = () => import('@/views/About');
const subSystem = () => import('@/views/subSystem');
const xtableEdit = () => import('@/xcomponents/xtableEdit');

const routes = [
    {
        path: '/',
        name: '登录',
        component: login,

    },
    {
        path: '/index',
        name: '仪表盘',
        component: layout,
        children: [{
            path: 'subSystem',
            name: '子系统管理',
            component:subSystem
        },{
            path: 'xtableEdit',
            name: 'xtableEdit',
            component:xtableEdit
        },{
            path: 'authority',
            name: '权限管理',
            component:authority
        },{
            path:'ViewDesign',
            name:'视图设计',
            component:ViewDesign
        },{
            path:'BM',
            name:'部门设计',
            component:BM
        },{
            path:'about',
            name:'关于我们',
            component:About
        }, {
            path: '*',
            name: '错误',
            component: notFound,
        }],
    }
];

export default new Router({
    routes: routes
})
