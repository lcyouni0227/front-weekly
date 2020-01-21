import LangSelect from '@/components/LangSelect';

export default {
    name: 'login',
    components: {
        LangSelect
    },
    data() {
        return {
            //连接地址
            imageUrl: "/public/checkCaptchaCode.do",
            lang: this.$store.state.app.language,
            login: {
                passport: '',
                password: '',
                checkcode: ''
            },
            getdata:{},
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
        }
    },
    mounted() {
        sessionStorage.setItem("projectName",this.projectName);
        sessionStorage.setItem("logo",this.logo);
    },
    methods: {
        /**
         * 变换验证码
         */
        handleCode: function () {
            let rand = Math.floor(Math.random() * (1000 + 1));
            this.imageUrl = "/public/checkCaptchaCode.do?" + rand;
        },
        handleLogin() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    this.$axios.postJson('/public/login.do',this.login ).then(res => {
                        // console.log("login:",res)
                        // res = {
                        //                         //
                        //                         // }
                        if (res.code === 1) {
                            // debugger
                            sessionStorage.setItem("name",res.passport||'');
                            sessionStorage.setItem("realname",res.realname||'');
                            sessionStorage.setItem("username",res.username||'');
                            sessionStorage.setItem("post",res.post||'');
                            sessionStorage.setItem("userid",res.userid||'');
                            sessionStorage.setItem("grade",res.grade||'');
                            sessionStorage.setItem("group_num",res.group_num||'');
                            sessionStorage.setItem("privilege",res.privilege||'');
                            this.$message({message: "登录成功", type: 'success'});
                            this.getdata = res.data
                            this.$router.push('/index/dashboard');
                            // debugger
                        } else {
                            this.handleCode();
                            this.$message({message:"用户名或密码或验证码错误", type: 'error'});
                        }
                    }).catch(res=>{
                        this.handleCode();
                        this.$message({message:"服务器有问题", type: 'warning'});
                    })
                } else {
                    this.$message.error(this.$t('login.validfaild'))
                }
            })
        },
    }
}
