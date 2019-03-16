<!-- 左侧导航组件 -->
<template>
    <el-scrollbar id="sidebar-wrap" class="scrollbar-wrapper">
        <el-menu :collapse="isCollapse" background-color="#545c64" text-color="#fff" :default-active="defaultActive" :unique-opened="true" :router="true" mode="vertical">
            <h3 class="isCollapse" :class="[isCollapse ? 'in': 'out']" style="background-color:rgb(52,68,74)">
                <span v-show="!isCollapse">菜    单</span>
                <i :class="[isCollapse ? 'icon-indent in': 'icon-outdent out','iconfont']" @click="toggleSiderBar"></i>
            </h3>
            <x-tree-menu :data="menu"></x-tree-menu>
        </el-menu>
    </el-scrollbar>
</template>
<script>
    export default {
        name: "XIndexMenu",
        created() {
            this.menu = this.$store.state.controlStyle.menu;
            // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.$axios.get("/user/online");
            }, 600000);
            this.setTimer();
        },
        data() {
            return {
                menu: [],
                timer: null
            };
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse;
            },
            defaultActive() {
                return this.$route.path;
            }
        },
        methods: {
            toggleSiderBar() {
                this.$store.commit('toggleSiderBar')
            },
            setTimer() {
                if(this.timer == null) {
                    this.timer = setInterval(() => {
                        this.$axios.get("/user/online");
                    }, 600000)
                }
            }
        },
        destroyed: function () {
            // 每次离开当前界面时，清除定时器
            clearInterval(this.timer);
            this.timer = null
        }
    };
</script>
<style scoped lang="less">
    #sidebar-wrap {
        .isCollapse {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #fff;
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
            .in {width: 64px;}
            .out {width: 30px;}
        }
    }
    .scrollbar-wrapper {
        height: 100%;
        .el-scrollbar__view {height: 100%;}
        .el-scrollbar__wrap {overflow-x: hidden;}
    }
</style>
