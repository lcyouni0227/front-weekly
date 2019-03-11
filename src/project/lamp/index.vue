<template>
    <el-container>
        <el-header>
            <x-index-top-bar/>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'64px':'164px'">
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

