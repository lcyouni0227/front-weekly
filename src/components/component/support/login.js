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
            this.imageUrl = "/public/checkCode?" + rand;
        },
        handleLogin() {
            this.$refs['form'].validate(async valid => {
                if (valid) {
                    this.$axios.postJson('/public/login',this.login).then(res => {
                        if (res.code === 1) {
                            sessionStorage.setItem("name",res.data.name||'');
                            this.$message({message: "登陆成功", type: 'success'});
                            this.$router.push('/index');
                        } else {
                            this.handleCode();
                            this.$message({message: res.message, type: 'error'});
                        }
                    }).catch(res=>{
                        this.handleCode();
                        this.$message({message: res.message, type: 'warning'});
                    })
                } else {
                    this.$message.error(this.$t('login.validfaild'))
                }
            })
        },
        handleFindPassword(){
            if(this.findPassword){

            }
        }
    }
}