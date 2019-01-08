<template>

    <el-container>
        <el-header>
            <top-bar/>
        </el-header>

        <el-container>
            <el-aside :width="isCollapse?'64px':'164px'">
                <side-menu class="sidebar-container"/>
            </el-aside>
            <el-main>
                <app-main/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import sideMenu from './components/SideMenu.vue';
    import TopBar from './components/TopBar'
    import AppMain from "./components/AppMain";

    export default {
        name: "layout",
        components: {
            AppMain,
            sideMenu,
            TopBar
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-container {
        width: 100%;
        height: 100%;
    }

    .el-header {
        padding: 0;
        font-size: 0;
        line-height: 60px;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
    }

    .el-aside {
        transition: width .3s;
        background:#556d84;
        color: #fff;
        overflow: hidden;
    }

    .el-main {
        padding: 0;
        height: 100%;
        overflow: auto
    }
</style>
