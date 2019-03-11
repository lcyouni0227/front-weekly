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
    import XSideMenu from '@/components/component/xmain-menu'
    export default {
        name: "layout",
        components: {
            XSideMenu
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse
            }
        }
    }
</script>

