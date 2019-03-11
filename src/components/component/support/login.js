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
    methods: {
        /**
         * 变换验证码
         */
        changeCode: function () {
            let rand = Math.floor(Math.random() * (1000 + 1));
            this.imageUrl = "/public/checkCode?" + rand;
        },
        login() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    this.$axios.postJson('/public/login',this.login).then(res => {
                        if (res.code === 1) {
                            this.$message({message: "登陆成功", type: 'success'});
                            this.$router.push('/index');
                        } else {
                            this.changeCode();
                            this.$message({message: res.message, type: 'error'});
                        }
                    }).catch(res=>{
                        this.changeCode();
                        this.$message({message: res.message, type: 'warning'});
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