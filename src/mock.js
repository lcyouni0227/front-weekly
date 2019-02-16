//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据

var loginData = function () {
    var mockData = [];
    mockData = {
        "code": "1",
        "message": "登录成功",
        "data": [
            {
                user: "工作台",
                password: "0"
            },]
    };
    return mockData
};
Mock.mock('/user/loginData', 'get', loginData);
Mock.mock('/api/privilege/getButtons', 'post', ()=>{
    return {
        code:1,
        data: {
            buttons: [
                {
                    name: 'add',
                    template: ''
                },
                {
                    name: 'edit',
                    template: ''
                },
                {
                    name: 'del',
                    template: ''
                }
            ]
        }
    }
});
Mock.mock('/api/getMenu', 'get', () => {
    return {
        code:1,
        data:[
            {
                name: '基础设置',
                icon: 'el-icon-time',
                path: '/index',
                component: 'layout/index',
                children: [{
                    name: '子系统管理',
                    icon: 'el-icon-time',
                    path: '/index/system',
                    component:'base/system'
                },{
                    name: 'tree',
                    icon: 'el-icon-time',
                    path: '/index/tree',
                    component:'base/tree'
                },{
                    name: '菜单模板',
                    icon: 'el-icon-time',
                    path: '/index/menu_base',
                    component:'base/menu_base'
                },{
                    name: '模块管理',
                    icon: 'el-icon-time',
                    path: '/index/module',
                    component:'base/module'
                },{
                    name: '数据源定义',
                    icon: 'el-icon-time',
                    path: '/index/sql',
                    component:'base/datasql'
                },{
                    name: '角色管理',
                    icon: 'el-icon-time',
                    path: '/index/role',
                    component:'base/role'
                },{
                    name: '机构管理',
                    icon: 'el-icon-time',
                    path: '/index/org',
                    component:'base/org'
                }
                ]
            },
            {
                name: '项目设置',
                icon: 'el-icon-time',
                path: '/project',
                children: [{
                    name: 'test1',
                    icon: 'el-icon-time',
                    path: '/index/system11',
                    // component:'base/system'
                },{
                    name: 'test2',
                    icon: 'el-icon-time',
                    path: '/index/org11',
                    // component:'base/org'
                }
                ]
            }

        ]
        // data: [{
        //     "name": "基础设置",
        //     "name_en": "baseSetting",
        //     "path": "/index",
        //     "icon": "el-icon-time",
        //     "children": [{
        //         "name": "子系统",
        //         "name_en": "system",
        //         "path": "/index/system",
        //         "component":"@/views/base/system",
        //         "icon": "el-icon-document"
        //     },{
        //         "name": "机构管理",
        //         "name_en": "org",
        //         "path": "@/views/base/org",
        //         "component":"org",
        //         "icon": "el-icon-document"
        //     }]
        // }, {
        //     "name": "部门管理",
        //     "name_en": "BM",
        //     "path": "/index/BM",
        //     "icon": "el-icon-picture-outline",
        //     "children": []
        // },{
        //     "name": "权限",
        //     "name_en": "Authority",
        //     "path": "/index/Authority",
        //     "icon": "el-icon-setting",
        //     "children": []
        // },{
        //     "name": "视图设计",
        //     "name_en": "ViewDesign",
        //     "path": "/index/ViewDesign",
        //     "icon": "el-icon-setting",
        //     "children": []
        // }]

    }
});
