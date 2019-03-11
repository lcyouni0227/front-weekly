//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据

// Mock.mock('/api/public/login', 'post', ()=>{
//     return {
//         code:1,
//         data:{
//             name:'张三'
//         }
//     }
// });
Mock.mock('/api/privilege/getButtons', 'post', ()=>{
    return {
        code:1,
        data: {
            buttons: {
                add:{
                    action:'',
                    template:''
                },
                edit:{},
                del:{}
            }
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
                component: 'lamp/index',
                children: [{
                    name: 'test1',
                    icon: 'el-icon-time',
                    path: '/index/test1',
                    component:'lamp/test1'
                },{
                    name: '个人资料柜',
                    icon: 'el-icon-time',
                    path: '/index/owndisk',
                    component:'owndisk/owndisk'
                },{
                    name: '个人资料柜',
                    icon: 'el-icon-time',
                    path: '/index/file',
                    component:'owndisk/file'
                },{
                    name: '子系统管理',
                    icon: 'el-icon-time',
                    path: '/index/system',
                    component:'common/system'
                },{
                    name: '菜单模板',
                    icon: 'el-icon-time',
                    path: '/index/menu_base',
                    component:'common/menu_base'
                },{
                    name: '模块管理',
                    icon: 'el-icon-time',
                    path: '/index/module',
                    component:'common/module'
                },{
                    name: '数据源定义',
                    icon: 'el-icon-time',
                    path: '/index/sql',
                    component:'common/datasql'
                },{
                    name: '角色管理',
                    icon: 'el-icon-time',
                    path: '/index/role',
                    component:'common/role'
                },{
                    name: '机构管理',
                    icon: 'el-icon-time',
                    path: '/index/org',
                    component:'common/org'
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
