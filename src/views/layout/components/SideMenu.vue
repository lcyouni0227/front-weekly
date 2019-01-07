<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
    <div id="sidebar-wrap" :class="{ collapsed: toggSiderBar }">
        <h3 class="logo">
            <span>{{ $t('user.name')}}</span>
        </h3>
        <el-menu
                background-color="#3f4d67"
                text-color="#fff"
                :default-active="defaultActive"
                :unique-opened="true"
                :router="true"
                mode="vertical"
                :collapse="toggSiderBar"
        >
            <template v-for="item in menu">
                <el-submenu v-if="item.children.length !== 0" :index="item.router" :key="item.router">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">
                        <span slot="title">{{child.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item.router" :key="item.router">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name}}</span>
                </el-menu-item>
            </template>

        </el-menu>
    </div>
</template>
<script>

    export default {
        name: "sidemenu",
        created() {
            const that = this;
            this.$get('/menu',{}).then(res => {

               that.menu = res.data;
            })
        },
        data() {
            return {
                menu: []

            };
        },
        computed: {
            toggSiderBar() {
                return this.$store.state.controlStyle.isCollapse;
            },
            defaultActive() {
                return this.$route.path;
            },
        },
        methods: {}
    };
</script>
<style scoped lang="less">
    #sidebar-wrap {
        width: 160px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 5;
        transition: all .5s;
        background: #3f4d67;

        &.collapsed {
            width: 64px;
            transition: all 0.5s;
        }


        .logo {
            color: #fff;
            text-align: center;
            padding: 18px 0;
            margin: 0;
            height: 60px;
            box-sizing: border-box;
        }
    }

    .el-menu {
        height: 100%;
        border: 0;
    }

    // 美化左侧导航的留白
    .el-submenu .el-menu-item {
        padding: 0 20px;
        min-width: 160px;
        padding-left: 53px !important;
    }

</style>
