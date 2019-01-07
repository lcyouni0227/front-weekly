<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>
    <div id="sidebar-wrap" :class="{ collapsed: isCollapse}">

        <el-menu
                background-color="#394557"
                text-color="#98A4AD"
                :default-active="defaultActive"
                :unique-opened="true"
                :router="true"
                mode="vertical"
                :collapse="isCollapse"
                class="sideMenu"
        >
            <h3 class="isCollapse" :class="[isCollapse ? 'in': 'out']">
                <span v-show="!isCollapse">菜&nbsp&nbsp单</span>
                <i :class="[isCollapse ? 'icon-indent in': 'icon-outdent out','iconfont']" @click="toggleSiderBar"></i>
            </h3>
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
            this.$get('/menu', {}).then(res => {
                that.menu = res.data;
            })
        },
        data() {
            return {
                menu: []

            };
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse;
            },
            defaultActive() {
                return this.$route.path;
            },
        },
        methods: {
            toggleSiderBar() {
                this.$store.commit('toggleSiderBar')
            },
        }
    };
</script>
<style scoped lang="less">
    #sidebar-wrap {
        width: 160px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 5;
        background: #394557;
        transition: all 0.5s;

        &.collapsed {
            width: 64px;

        }

        .isCollapse {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #98A4AD;
            box-sizing: border-box;


            span {
                display: inline-block;
                width: 100px;
                text-align: center;
                font-size: 14px;
                padding-left: 30px;
            }

            i {
                display: inline-block;
                width: 30px;
                text-align: center;
            }

            .in {
                width: 60px;
            }

            .out {
                width: 30px;
            }

        }

    }

    .el-menu {
        height: 100%;
        font-size: 14px;
        border: 0;

        .isCollapse {
            width: 100%;
        }
    }

    // 美化左侧导航的留白
    .el-submenu .el-menu-item {
        padding: 0 20px;
        min-width: 160px;
        font-size: 14px;
        padding-left: 53px !important;
    }

</style>
