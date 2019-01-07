
<template>
    <div id="topbar-wrap" :class="{ topCollapsed: isCollapse }">
        <el-row type="flex" justify="space-between">
            <el-col :span="5">
                <i :class="[isCollapse ? 'icon-spread': 'icon-recovery','iconfont']" @click="toggleSiderBar"></i>
            </el-col>
            <el-col :span="12">
                <el-row type="flex" class="row-right" justify="end" style="margin-right:-15px">
                    <el-col :span="3">
                        <a class="user">{{userName}}</a>
                    </el-col>
                    <el-col :span="1">
                        <lang-select/>
                    </el-col>
                    <el-col :span="1">
                        <i :class="[isFullscreen? 'icon-zuixiaohua': 'icon-quanping','iconfont','']" title="切换全屏"
                           @click="toggleFullscreen"></i>
                    </el-col>
                    <el-col :span="2">
                        <i class="icon-tuichu iconfont logout" title="退出" @click.prevent="logout"></i>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import screenfull from 'screenfull'
    import LangSelect from '@/components/LangSelect'

    export default {
        name: 'topbar',
        components: {
            LangSelect
        },
        data() {
            return {
                userName: 'xuyanxu',
                isFullscreen: false
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse
            }
        },
        methods: {
            toggleSiderBar() {
                this.$store.commit('toggleSiderBar')
            },
            toggleFullscreen() {
                if (!screenfull.enabled) {
                    this.$message.warning('您的浏览器不支持全屏')
                    return false
                }
                screenfull.toggle()
                // isFullscreen 居然是反的
                this.isFullscreen = !screenfull.isFullscreen
            },
            logout() {
                this.$router.push('signin')
            },

        },
        watch: {
            $route(to, from) {
                this.pathName = this.$route.path.substring(1);
                this.nowPath = this.$route.path
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../../assets/font/iconfont.css";

    #topbar-wrap {
        .user{
            text-align: center;
        }
        overflow: hidden;
        border-bottom: 1px solid #ddd;
        background: #fff;
        color: #353d47;
        padding: 0 15px;
        z-index: 4;
        box-sizing: border-box;

        a {
            line-height: 60px;
        }

        i {
            font-size: 20px;
            line-height: 60px;
            transition: all 0.5s;

            &:hover {
                cursor: pointer;
            }
        }

        .fa-language:hover {
            transform: rotateY(180deg)
        }

        .logout {
            text-decoration: none;


            &:hover {
                color: #1dc4e9;
            }
        }
    }

    .row-right > div {
        text-align: center;
    }
</style>
