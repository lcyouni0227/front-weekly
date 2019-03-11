<template>
    <div class="login-page">
        <div class="login-wrap">
            <el-col :class="translateLeft" :span="10">
                <lang-select class="lang"/>
                <div v-show="notforget">
                    <div class="logo">
                        <img src="@/assets/img/login/logo.png" alt="">
                        <div class="title">
                            <a><span>数字媒体</span><span class="subtitle">研究所</span></a>
                        </div>
                    </div>
                    <div class="login-form">
                        <el-form :model="login" :rules="rules" ref="ruleForm">
                            <el-form-item prop="passport">
                                <el-input @keyup.enter.native="handleLogin('ruleForm')" :placeholder="$t('login.userplaceholder')" v-model="login.passport"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input @keyup.enter.native="handleLogin('ruleForm')" :placeholder="$t('login.pwdplaceholder')" type="password" v-model="login.password"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="16">
                                    <el-form-item prop="checkcode">
                                        <el-input @keyup.enter.native="handleLogin('ruleForm')" :placeholder="$t('login.checkCodePlaceholder')" v-model="login.checkcode"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <img id="code" :src="$baseImgUrl + imageUrl" style="width:80px;border:0;cursor: pointer;margin-left: 10px;display: inline-block;margin-top: 6px" @click.stop="changeCode()"/>
                                </el-col>
                            </el-row>

                            <el-form-item class="btn">
                                <el-button type="primary" @click="handleLogin('ruleForm')">{{$t('login.btn')}}</el-button>
                            </el-form-item>

                        </el-form>
                    </div>

                    <div class="login-footer">
                        <el-col :span="12">
                            <el-checkbox v-model="remember" name="type">{{$t('login.remember')}}</el-checkbox>
                        </el-col>
                        <el-col class="forgetpwd" :span="12">
                            <span @click="wrapSwitch(false)">{{$t('login.forgetpwd')}}</span>
                        </el-col>
                    </div>
                </div>

                <div v-show="!notforget">
                    <div class="title forgetwrap-title">
                        <a><span>数字媒体</span><span class="subtitle">研究所</span></a>
                    </div>
                    <div class="forget-form">
                        <el-form :model="forgetForm" ref="forgetRuleForm">
                            <el-form-item>
                                <el-input :placeholder="$t('login.forget_email')" v-model="forgetForm.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input :placeholder="$t('login.forget_code')" v-model="forgetForm.code"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input :placeholder="$t('login.forget_passwrd')" type="password" v-model="forgetForm.newPassword"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input :placeholder="$t('login.confirm_passwrd')" type="password" v-model="forgetForm.confirmPassword"></el-input>
                            </el-form-item>
                            <el-form-item class="btn">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-button @click="wrapSwitch(true)" type="primary">{{$t('login.forget_back')}}</el-button>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-button @click="forgetHandle" type="primary">{{$t('login.forget_btn')}}</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </el-col>

            <el-col :class="translateRight" :span="14">
                <div class="wallpaper"></div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import LangSelect from '@/components/LangSelect';

    export default {
        name: 'login',
        components: {
            LangSelect
        },
        data() {
            return {
                //连接地址
                imageUrl: "/public/checkCode",
                lang: this.$store.state.app.language,
                login: {
                    passport: '',
                    password: '',
                    checkcode: ''
                },
                rules: {
                    passport: [
                        {
                            required: true,
                            message: this.$t('login.valid.userexist'),
                            trigger: 'change'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: this.$t('login.valid.pwdexist'),
                            trigger: 'change'
                        },
                    ],
                    checkcode: [{required: true, message: this.$t('login.valid.checkcodeError'), trigger: 'change'},
                        {min: 4, max: 4, message: this.$t('login.valid.checkcodeError'), trigger: 'change'}
                    ]
                },
                remember: true,
                switchLeft: false,
                switchRight: false,
                notforget: true,
                forgetForm: {
                    email: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            }
        },
        computed: {
            //动画
            translateLeft() {
                return {
                    'translate-left': true,
                    'login-col': true,
                    'switch-left': this.switchLeft
                }
            },
            translateRight() {
                return {
                    'translate-right': true,
                    'login-col': true,
                    'switch-right': this.switchLeft
                }
            }
        },
        methods: {
            /**
             * 变换验证码
             */
            changeCode: function () {
                let rand = Math.floor(Math.random() * (1000 + 1));
                this.imageUrl = "/public/checkCode?" + rand;
            },
            //转换以后清除文字，并开始运动
            wrapSwitch(state) {
                this.switchLeft = !this.switchLeft;
                this.switchRight = !this.switchRight;
                setTimeout(() => {
                    this.notforget = state;
                    this.$refs['ruleForm'].resetFields()
                }, 300)
            },

            handleLogin(formName) {
                let that = this;
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        that.$axios.postJson('/public/login',this.login).then(res => {
                            if (res.code === 1) {
                                that.$message({message: "登陆成功", type: 'success'});
                                that.$router.push('/index');
                            } else {
                                that.changeCode();
                                that.$message({message: res.message, type: 'error'});
                            }
                        }).catch(res=>{
                            that.changeCode();
                            that.$message({message: res.message, type: 'warning'});
                        })
                    } else {
                        this.$message.error(this.$t('login.validfaild'))
                    }
                })
            },
            forgetHandle() {
                this.$message.success(this.$t('login.pwdChanged'));
                this.wrapSwitch(true)
            }
        }
    }
</script>

<style lang="less" scoped>
    .forget-form,
    .login-form {
        .el-form-item__content {
            line-height: 40px;
        }

        .el-input__inner {
            padding-top: 2px;
            height: 40px;
            line-height: 40px;
        }
    }

    .btn button {
        width: 100%;
        padding: 12px 20px;
    }
</style>

<style lang="less">

    .login-col {

        height: 100%
    }

    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;

        .lang {
            position: absolute;
            right: 59px;
            top: 4px;
        }

        .svg-github {
            position: absolute;
            right: 29px;
            top: 25px;
        }

        .translate-left,
        .translate-right {
            will-change: auto;
            transform: translateX(0px);
            transition: transform .6s ease-in-out;
        }

        .switch-left {
            transform: translateX(525px);
        }

        .switch-right {
            transform: translateX(-375px);
        }
    }

    .login-wrap {
        overflow: hidden;
        width: 900px;
        height: 450px;
        background: white;
        border-radius: 4px;
        transform: translateY(-10px);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .logo {
            padding-top: 26px;
            text-align: center;

            img {
                height: 74px;
            }
        }

        .title {
            font-weight: bold;
            color: #41b883;
            padding-top: 8px;
            font-size: 22px;

            a {
                cursor: cell;
            }

            a:before {
                content: '[';
                opacity: 0;
                margin-right: 10px;
                transform: translateX(-10px);
                transition: transform .2s, opacity .2s;
            }

            a:after {
                content: ']';
                opacity: 0;
                margin-left: 10px;
                transform: translateX(10px);
                transition: transform .2s, opacity .2s;
            }

            a:hover:before,
            a:hover:after {
                opacity: 1;
                transform: translateX(0);
            }

            .subtitle {
                color: #2e5273;
            }
        }

        .forgetwrap-title {
            padding-top: 30px;
            padding-left: 15px;
        }

        .forget-form {
            padding: 20px 30px 30px;
            padding-bottom: 0;
        }

        .login-form {
            padding: 30px;
            padding-bottom: 0;
        }

        .login-footer {
            padding: 0 30px;

            .forgetpwd {
                text-align: right;

                span {
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    color: #606266;
                }
            }
        }

        .wallpaper {
            width: 100%;
            height: 100%;
            background: url('../../assets/img/login/cont.png');
            background-size: cover;
            position: relative;
        }
    }
</style>
