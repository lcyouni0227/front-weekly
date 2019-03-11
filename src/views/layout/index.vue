<template>

    <el-container>
        <el-header>
            <top-bar/>
        </el-header>

        <el-container>
            <el-aside :width="isCollapse?'60px':'180px'">
                <side-menu/>
            </el-aside>
            <el-main>
                <tags-view/>
                <app-main/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // import sideMenu from './components/SideMenu.vue';
    import sideMenu from '@/components/component/xmain-menu';
    import TopBar from './components/TopBar'
    import AppMain from "./components/AppMain";
    import TagsView from "./components/TagsView";

    export default {
        name: "layout",
        components: {
            TagsView,
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
        background:#545c64;
        color: #fff;
        overflow: hidden;
    }

    .el-main {
        padding: 0;
        height: 100%;
        overflow: auto
    }
</style>
