<template>
    <div class="login-container">
        <h3 class="headertip"><img src="@/project/lamp/img/logo.png" alt="">智能灯控信息管理平台</h3>
        <el-form ref="form" :model="login" :rules="rules" status-icon label-position="left" label-width="0px" class="login-page">
            <h3 class="title">智慧灯控管理平台</h3>
            <el-form-item prop="passport">
                <el-input type="text" v-model="login.passport" auto-complete="off" placeholder="用户名" size="big"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="login.password" auto-complete="off" placeholder="密码" size="big"></el-input>
            </el-form-item>
            <el-form-item prop="checkcode">
                <el-input size="big" class="codeInput" @keyup.enter.native="handleLogin" :placeholder="$t('login.checkCodePlaceholder')" v-model="login.checkcode"/>
                <img :src="$baseImgUrl + imageUrl" alt="点击刷新" class="codeImg" @click.stop="handleCode"/>
            </el-form-item>
            <el-checkbox v-model="remember" class="remember">记住密码</el-checkbox>
            <el-form-item>
                <el-button type="primary" style="width:100%;" @click="handleLogin">{{$t('login.btn')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import login from '@/components/component/support/login'
    export default {
        name:"login",
        mixins:[login]
    }
</script>

<style scoped>
    .title{
        font-size: 22px;
        margin-bottom: 20px;

    }
    .codeInput{
        width: 256px;
    }
    .codeImg{
        height: 32px;
        width: 80px;
        float: right;
    }
    .headertip {
        position: absolute;
        left: 100px;
        top: 30px;
        font-size: 30px;
        font-weight: 800;
        color: rgba(0, 0, 0, .6);
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
        background: url(../../project/lamp/img/login_bg.jpg) bottom no-repeat;
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
