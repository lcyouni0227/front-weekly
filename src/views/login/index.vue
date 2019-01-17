<template>
    <div>
        <!--<div class="title">-->
        <!--<div class="w">-->
        <!--<div class="l title_l">-->
        <!--公共服务平台首页-->
        <!--</div>-->
        <!--<div class="r title_r">-->
        <!--<div class="title_phone r">-->
        <!--<img src="../assets/img/login/phone_icon.png"/>-->
        <!--<span>023-63203039</span>-->
        <!--</div>-->
        <!--<div class="title_btn r">-->
        <!--<span class="enter_btn"><a href="javascript:;">登录</a></span>-->
        <!--<span class="login_btn"><a href="javascript:;">免费注册</a></span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="logo">
            <div class="w">
                <img src="@/assets/img/login/logo.png" class="l"/>
                <span class="l">动产抵质押后管平台</span>
            </div>
        </div>
        <div class="conttent">
            <div class="w">
                <img src="@/assets/img/login/cont.png" class="l content_l"/>
                <div class="content_r l">
                    <h4>用户登录</h4>
                    <div class="int_box">
                        <span class="l"><img src="@/assets/img/login/user_ico.png"/></span>
                        <input v-model="loginForm.username" type="text" placeholder="用户名" class="ipt_user l"/>
                    </div>
                    <div class="int_box">
                        <span class="l"><img src="@/assets/img/login//psd_ico.png" class="psd_img"/></span>
                        <input v-model="loginForm.password" type="password" placeholder="密码" class="ipt_psd l"/>
                    </div>
                    <div class="icode_box">
                        <input type="text" placeholder="验证码" class="ipt_code l" v-model="loginForm.checkcode"/>
                        <img id="code" :src="$baseImgUrl + imageUrl" style="width:80px;border:0;cursor: pointer;margin-left: 10px;display: inline-block;margin-top: 6px"
                             @click.stop="changeCode()"/>
                    </div>
                    <div class="login_go" @click.stop="loginSubmit()">登 录</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="w">
                <div class="footer_content">
                    <div class="footer_l l">
                        <div class="footer_ul">
                            <ul>
                                <li class="l"><a href="javascripr:;">关于我们</a></li>
                                <li class="l"><a href="javascripr:;">如何加入</a></li>
                                <li class="l"><a href="javascripr:;">帮助中心</a></li>
                            </ul>
                        </div>
                        <p class="foot_p">版权所有©重庆物流金融服务股份有限公司 未经许可不得复制、转载或者摘编，违者必究</p>
                        <p class="foot_p">Chongqing Logistics Finance Service Co., Ltd. ALL Rights Reserved</p>
                        <p class="foot_p">重庆北部新区上峰上座21楼 | 023-63203039</p>
                        <p class="foot_p">备案/许可证编号：渝ICP备18001680号-1</p>
                    </div>
                    <div class="footer_r l">
                        <img src="@/assets/img/login/weix_code.jpg"/>
                        <p>官方微信</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import md5 from '../assets/md5';
    export default {
        created() {
            let that = this;
            that.changeCode();
            document.onkeydown = function (e) {
                let key = window.event.keyCode;
                if (key == 13&&(that.$route.path=='/'||that.$route.path=='/login')) {
                    that.loginSubmit();
                }
            }
        },
        data() {
            return {
                imageUrl: "/public/checkCode",
                loginForm: {
                    username: '',
                    password: '',
                    checkcode: ''
                },
                rules: {}
            }
        },
        methods: {
            loginSubmit() {
                let that = this;
                let passport = this.loginForm.username;
                if (passport.replace(/(^\s*)|(\s*$)/g, '') == '' || that.$lodash.isEmpty(passport)) {
                    this.$message({
                        type: 'warning',
                        message: '用户名不能为空'
                    });
                    return false;
                }
                let pwd = this.loginForm.password;
                if (pwd.replace(/(^\s*)|(\s*$)/g, '') == '' || that.$lodash.isEmpty(pwd)) {
                    this.$message({
                        type: 'warning',
                        message: '密码不能为空'
                    });
                    return false;
                }

                let checkcode = this.loginForm.checkcode;
                if (checkcode.replace(/(^\s*)|(\s*$)/g, '') == '' || that.$lodash.isEmpty(checkcode)) {
                    this.$message({
                        type: 'warning',
                        message: '验证码不能为空'
                    });
                    return false;
                }
                let loginData ={passport: passport, pwd: pwd, checkcode: checkcode, os: '0'};
                that.$post("/public/login", loginData)
                    .then(function (res) {
                        if (res.status == "1") {
                            that.$message({
                                message: '恭喜您，登录成功！',
                                type: 'success'
                            });
                            that.$router.push('/index');
                        } else {
                            that.changeCode();
                            that.$message({
                                message: res.message,
                                type: 'warning'
                            });
                        }
                    })
                    .catch(function (res) {
                        that.changeCode();
                        that.$message({
                            type: 'warning',
                            message: res.message
                        });
                    });

            },
            changeCode: function () {
                let that = this;
                let url = that.imageUrl;
                let rand = Math.floor(Math.random() * (1000 + 1));
                url += '?' + rand;
                that.imageUrl = url;
            }
        }
    }
</script>

<style lang="less" scoped>
    /*=============公共样式=================*/
    a, img, blockquote, body, div, code, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, pre, td, textarea, th, ul {
        margin: 0;
        padding: 0
    }

    li, ul {
        list-style-image: none;
        list-style-type: none
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    body, html {
        width: 100%;
        overflow-x: hidden;
        position: relative;
    }

    img {
        display: block;
        border: 0;
    }

    body, button, input {
        font-family: "Microsoft YaHei", "微软雅黑", "Microsoft JhengHei"
    }

    input, textarea {
        outline: none;
        border: 0; /* 方法1 */
        -webkit-appearance: none; /* 方法2 */
    }

    .clearfix:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }

    .l {
        float: left;
    }

    .r {
        float: right;
    }

    /*居中*/
    .transform {
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        position: absolute;
    }

    .transform_x {
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        left: 50%;
        position: absolute;
    }

    .transform_y {
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        top: 50%;
        position: absolute;
    }

    /*可视区域*/
    .w {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }

    /*内容*/
    .title {
        width: 100%;
        height: 40px;
        background: rgba(8, 8, 8, 1);
        line-height: 40px;
    }

    .title_l {
        font-size: 14px;
        color: rgba(254, 254, 254, 1);
    }

    .title_phone {
        font-size: 14px;
        color: rgba(254, 254, 254, 1);
    }

    .title_phone img {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 5px;
    }

    .title_btn {
        margin-right: 45px;
        overflow: hidden;
    }

    .title_btn span {
        height: 14px;
        line-height: 16px;
        padding: 0px 13px;
        display: inline-block;

    }

    .title_btn span a {
        cursor: pointer;
        font-size: 14px;
        color: rgba(254, 254, 254, 1);
        position: relative;
        top: -2.5px;
    }

    .title_btn .enter_btn {
        border-right: 1px solid #fff;
    }

    .logo {
        height: 80px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 15px 0px rgba(231, 231, 231, 0.35);
        line-height: 80px;
        overflow: hidden;
    }

    .logo img {
        height: 40px;
        width: 40px;
        display: inline-block;
        margin-top: 20px;
    }

    .logo span {
        display: inline-block;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-left: 10px;
    }

    .footer {
        height: 186px;
        background: rgba(18, 22, 25, 1);
        width: 100%;
    }

    .footer_content {
        overflow: hidden;
        height: 100%;
        width: 745px;
        margin: 0 auto;
    }

    .footer_l {
        height: 100%;
        width: 480px;
        overflow: hidden;
    }

    .footer_ul {
        margin: 30px auto 15px;
        overflow: hidden;
        width: 242px;

    }

    .footer_ul li {
        padding: 0px 12px;
        font-size: 14px;
        color: #fff;
        border-right: 1px solid #fff;
    }

    .footer_ul li:last-child {
        border: 0;
    }

    .footer_ul li a {
        color: #fff;
    }

    .foot_p {
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
    }

    .footer_r {
        margin-left: 160px;
    }

    .footer_r img {
        height: 105px;
        width: 105px;
        margin: 27px 0px 5px;
    }

    .footer_r p {
        text-align: center;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
    }

    .conttent {
        width: 100%;
        height: 775px;
        background: #006bbd;
    }

    .content_l {
        margin-top: 76px;
        margin-left: 65px;
        height: 570px;
        width: 567px;
    }

    .content_r {
        width: 300px;
        height: 290px;
        background: rgba(255, 255, 255, 1);
        margin-left: 168px;
        margin-top: 123px;
        padding: 55px 37px;
    }

    .content_r h4 {
        font-size: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 42px;
    }

    .int_box {
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        line-height: 40px;
        margin-top: 12px;
    }

    .int_box span {
        display: inline-block;
        width: 39px;
        height: 38px;
        background: rgba(242, 244, 247, 1);
        border-right: 0;
        border-radius: 4px 0px 0px 4px;
        border: 1px solid rgba(230, 233, 239, 1);
    }

    .int_box span img {
        margin: 8px auto 0px;
    }

    .int_box input {
        display: inline-block;
        height: 38px;
        width: 246px;
        line-height: 38px;
        border: 1px solid rgba(230, 233, 239, 1);
        border-radius: 0px 4px 4px 0px;
        padding-left: 10px;
    }

    .int_box span .psd_img {
        margin: 6px auto 0px;
    }

    .icode_box {
        width: 100%;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        line-height: 40px;
        margin-top: 12px;
    }

    .icode_box input {
        display: inline-block;
        height: 38px;
        width: 180px;
        line-height: 38px;
        border: 1px solid rgba(230, 233, 239, 1);
        border-radius: 4px;
        padding-left: 10px;
    }

    .icode_box span {
        height: 40px;
        line-height: 40px;
        width: 96px;
        text-align: center;
        margin-left: 10px;
    }

    .icode_box span img {
        height: 100%;
        width: 100%;
    }

    .login_go {
        width: 100%;
        height: 46px;
        background: rgba(45, 131, 196, 1);
        border-radius: 4px;
        margin-top: 20px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
    }

    .login_go a {
        display: block;
        height: 100%;
        width: 100%;
        color: #fff;
        line-height: 46px;
        font-size: 16px;
    }

    .bottom_box {
        width: 100%;
        margin-top: 10px;
    }

    .bottom_box_l {
        font-size: 14px;
        color: rgba(85, 85, 85, 1);
    }

    .bottom_box_r {
        font-size: 14px;
        color: rgba(85, 85, 85, 1);
    }

    .bottom_box_r a {
        color: #3d81ff;
    }
</style>
