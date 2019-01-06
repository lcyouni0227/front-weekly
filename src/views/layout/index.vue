<template>
    <div>
        <!-- 这是侧导航 -->
        <side-menu/>
        <div class="con-wrap" :class="{conCollapse: isCollapse}">
            <!-- 这是顶部导航 -->
            <top-bar/>
            <!-- 这是组件要插入的地方 -->
            <div class="page-component-wrap">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    import sideMenu from './../../components/SideMenu.vue';
    import TopBar from './../../components/TopBar'

    export default {
        name: "layout",
        components: {
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
    .con-wrap {
        padding-left: 160px;
        transition: all 0.5s;
        position: fixed;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;

        h3 {
            margin-top: 0;
            color: #324157;
        }

        .page-component-wrap {
            padding: 10px;
            height: 100%;
            overflow-y: scroll;
            background-color: rgb(241, 243, 246);
        }
    }

    .con-wrap.conCollapse {
        padding-left: 64px;
        transition: all 0.5s;
    }
</style>
