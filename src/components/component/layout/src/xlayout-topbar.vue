<template>
    <div id="topbar-wrap" :class="{ topCollapsed: isCollapse }">
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <div class="logo"><img :src="logo">
                    <span>{{projectName}}</span>
                </div>
            </el-col>
            <el-col :span="12">
                <el-row type="flex" class="row-right" justify="end" style="margin-right:-15px">
                    <el-col :span="6">
                        <div class="user">欢迎您:{{userName}}</div>
                    </el-col>
                    <el-col :span="2">
                        <lang-select/>
                    </el-col>
                    <el-col :span="2">
                        <i :class="[isFullscreen? 'icon-zuixiaohua': 'icon-quanping','iconfont','']" title="切换全屏" @click="toggleFullscreen"></i>
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
        name: 'XLayoutTopBar',
        components: {
            LangSelect
        },
        data() {
            return {
                isFullscreen: false
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.controlStyle.isCollapse
            },
            userName(){
                return sessionStorage.getItem("name")||'';
            },
            projectName(){
                return sessionStorage.getItem("projectName")||'云开发平台';
            },
            logo(){
                return sessionStorage.getItem("logo");
            }
        },
        methods: {
            toggleSiderBar() {
                this.$store.commit('toggleSiderBar')
            },
            toggleFullscreen() {
                if (!screenfull.enabled) {
                    this.$message.warning('您的浏览器不支持全屏');
                    return false
                }
                screenfull.toggle();
                this.isFullscreen = !screenfull.isFullscreen
            },
            logout() {
                this.$confirm('确定退出系统吗?', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$axios.postJson('/public/logout').then((res)=>{
                        if(res.code==1){
                            this.$store.state.controlStyle.menu = null;
                            this.$router.push('/login')
                        }else{
                            this.$message.warning('登出异常,请稍后再试！');
                        }
                    }).catch(()=>{
                        this.$message.warning('登出异常,请稍后再试！');
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>
<style scoped lang="less">
    /*@import "../../assets/font/iconfont.css";*/
    #topbar-wrap {
        height: 60px;
        /*background: #fff;*/
        background-color: #2a94de;
        color: #353d47;
        z-index: 4;
        box-sizing: border-box;
        .user {
            text-align: center;
            user-select: none;
            cursor: pointer;
            font-size: 12px;
            color: #ffffff;
            img {
                height: 40px;
                vertical-align: top;
                margin-top: 10px;
                margin-right: 5px;
            }
        }
        .logo {
            user-select: none;
            line-height: 60px;
            height: 60px;
            display: inline-block;
            img {
                height: 40px;
                margin-top: 10px;
                vertical-align: top;
                border-radius: 50%;
            }
            span {
                height: 60px;
                display: inline-block;
                line-height: 60px;
                /*color: #3d5266;*/
                color:#ffffff;
                font-weight: bold;
                font-size: 20px;
            }
        }
        a {line-height: 60px;}
        i {
            color: #ffffff;
            font-size: 20px;
            line-height: 60px;
            transition: all 0.5s;
            &:hover {cursor: pointer;}
        }
        .fa-language:hover {transform: rotateY(180deg)}
        .logout {
            text-decoration: none;
            &:hover {color: #1dc4e9;}
        }
    }
    .row-right > div {text-align: center;}
</style>
