<template>
  <div>
    <div class="logo">
      <div class="w">
        <img src="../../assets/img/login/logo.png" class="l"/>
        <span class="l">学习考试系统</span>
      </div>
    </div>
    <div class="conttent login-container">
      <img src="../../assets/img/login/cont.png" class="l content_l"/>
      <div class="login-border  animated fadeInRight">
        <div class="login-main">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户密码" name="user">
              <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm"
                       label-width="0">
                <el-form-item prop="username">
                  <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username"
                            auto-complete="off"
                            placeholder="请输入用户名">
                    <i slot="prefix" class="icon-yonghu"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType"
                            v-model="loginForm.password"
                            auto-complete="off" placeholder="请输入密码">
                    <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                    <i slot="prefix" class="icon-mima"></i>
                  </el-input>
                </el-form-item>
                <el-checkbox v-model="checked">记住账号</el-checkbox>
                <el-form-item>
                  <el-button type="primary" size="medium" @click.native.prevent="handleLogin" class="login-submit">登录
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--<el-tab-pane label="验证码" name="code">-->
            <!--<codeLogin></codeLogin>-->
            <!--</el-tab-pane>-->
          </el-tabs>
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
            <img src="../../assets/img/login/weix_code.jpg"/>
            <p>官方微信</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {isvalidUsername} from '@/utils/validate';

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = '';
        this.refreshCode();
        callback(new Error('请输入正确的验证码'))
      } else {
        callback();
      }
    };
    return {
      activeName: 'user',
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', validator: validateUsername}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'},
          {required: true, trigger: 'blur', validator: validateCode}
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

          // this.$store.dispatch('Login', this.loginForm).then(res => {
          //   this.$router.push({path: '../index'})
          // })
        }
      })
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
    position: relative;
  }

  .content_l {
    margin-top: 76px;
    margin-left: 65px;
    position: absolute;
    top: 15px;
    left: 300px;
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

  .el-button {
    width: 100%;
    margin-top: 20px ;
  }

  .bottom_box_r a {
    color: #3d81ff;
  }

  .login-main {
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .login-border {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 50px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 2px #eee;
    margin-right: 200px;
  }

  .login-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-input{
    margin-bottom: 20px;
  }
  .el-form-item__error{
    top: 39px!important;
  }
</style>
