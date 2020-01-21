<template>
    <div id="app">
        <transition name="slide-fade">
            <router-view style="height: 100%"/>
        </transition>
    </div>
</template>
<style scoped>
    html, body, #app {
        width: 100%;
        height: 100%;
    }
</style>
<style lang="less">
    @import "common/style/common.less";

    .slide-fade-enter-active {
        transition: all .1s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
        /*transform: translateX(10px);*/
        opacity: 0;
    }
</style>
