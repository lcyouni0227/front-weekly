<template>
    <div>
        <top-bar/>
        <div class="botton">
            <side-menu/>
            <div :class="[isCollapse?'out':'in']" class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import sideMenu from './components/SideMenu.vue';
    import TopBar from './components/TopBar'

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
    .botton {
        width: 100%;
        position: fixed;
        top: 60px;
        left: 0;
        bottom: 0;

    }

    .main {
        height: 100%;
        box-sizing: border-box;
        overflow-y: scroll;
        transition: all 0.5s;
        padding: 10px;
    }

    .out {
        margin-left: 64px;
    }

    .in {
        margin-left: 160px;
    }
</style>
