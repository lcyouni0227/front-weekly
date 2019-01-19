<template>
    <section class="main">
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    export default {
        name: "AppMain",
        computed: {
            // cachedViews() {
            //     return this.$store.state.tagsView.cachedViews;
            // }
        }
    };
</script>

<style lang="less" scoped>
    .main {
        height: calc(100% - 40px);
        padding: 15px;
        overflow: auto;
        box-sizing: border-box;
    }
</style>
