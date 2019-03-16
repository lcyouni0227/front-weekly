<template>
    <el-container>
        <el-header>
            <x-index-top-bar/>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'64px':'250px'">
                <x-index-menu/>
            </el-aside>
            <el-main>
                <x-index-tags/>
                <x-index-main/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import XIndexTopBar from '@/components/component/xindex-topbar'
    import XIndexMenu from '@/components/component/xindex-menu'
    import XIndexTags from '@/components/component/xindex-tags'
    import XIndexMain from '@/components/component/xindex-main'
    export default {
        name: "layout",
        components: {
            XIndexTopBar,
            XIndexMenu,
            XIndexTags,
            XIndexMain
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
