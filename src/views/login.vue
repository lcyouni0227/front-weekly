<template>
    <div class="login-container">
        <!--<div>{{getdata.name}}-&#45;&#45;{{getdata.age}}</div>-->
        <h3 class="headertip"><img :src="logo">
            <p class="projectName">{{projectName}}</p></h3>
        <el-form ref="form" :model="login" :rules="rules" status-icon label-position="left"
                 label-width="0px" class="login-page">
            <h3 class="title">{{projectName}}</h3>
            <el-form-item prop="passport">
                <x-input label="账号:" type="text" v-model="login.passport" auto-complete="off" placeholder="用户名"
                         size="big"></x-input>
            </el-form-item>
            <el-form-item prop="password">
                <x-input label="密码:" type="password" v-model="login.password" auto-complete="off" placeholder="密码"
                         size="big"></x-input>
            </el-form-item>
            <el-form-item prop="checkcode">
                <x-input label="验证码:" size="big" class="codeInput" @keyup.enter.native="handleLogin"
                         :placeholder="$t('login.checkCodePlaceholder')" v-model="login.checkcode"/>
                <img :src="$baseImgUrl + imageUrl" alt="点击刷新" class="codeImg" @click.stop="handleCode"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin-top:10px;width:100%;" @click="handleLogin">{{$t('login.btn')}}
                </el-button>
            </el-form-item>
            <!--<el-checkbox v-model="remember" class="remember">记住密码</el-checkbox>-->
            <!--<el-button type="text" @click="handleRegister" style="float:right"></el-button>-->
        </el-form>
    </div>
</template>

<script>
    import login from '@/views/support/login'
    import logoPic from '@/assets/img/logo.png'
    // import bg2 from '../public/img/background.png'


    export default {
        name: "login",
        mixins: [login],
        data() {
            return {
                logo: logoPic,
                projectName: '重邮数字媒体研究所周报管理系统',
                // registerPart: false,
                login: {
                    passport: '',
                    password: '',
                },
            }
        },
        mounted() {
            document.title = this.projectName;
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = this.logo;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        methods: {}
    }
</script>

<style scoped>
    /*html {*/
        /*height: 100%;*/
    /*}*/

    /*body {*/
        /*height: 100%;*/
        /*background-size: 100% 100%*/
    /*}*/

    .title {
        font-size: 22px;
        margin-bottom: 41px;
        text-align: center;
    }

    .codeInput {
        width: 275px;
    }

    .codeImg {
        height: 32px;
        width: 80px;
        float: right;
        padding-top: 4px;
        padding-right: 10px;
    }

    .projectName {
        height: 60px;
        position: relative;
        line-height: 60px;
        display: inline-block;
        top: -18px;
    }

    .headertip {
        position: absolute;
        left: 100px;
        top: 30px;
        font-size: 30px;
        font-weight: 800;
        color: #345f1b;
    }

    .headertip img {
        margin-right: 20px;
    }

    .login-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('../assets/img/background.png') bottom no-repeat;
        background-size: cover;
    }

    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 380px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    label.el-checkbox.remember {
        margin: 0px 0px 15px;
        text-align: left;
    }

</style>
