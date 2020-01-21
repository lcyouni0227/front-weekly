<template>
    <div class="arrange">
        <p v-if="showConfirm" class="showConfirm">您本周已填写周报，请到周报列表查看!</p>
        <el-form ref="form" :model="form" label-width="80px" :rules="formRules" v-else>
            <el-row class="dateTime">
                <el-col :span="12"><span>第{{form.nowweek}}周</span></el-col>
                <el-col :span="12"><span>日期：</span><span>{{showStartDate}}-{{showEndDate}}</span></el-col>
            </el-row>
            <p class="title">个人信息</p>
            <el-row class="userInfo">
                <el-col :span="6">
                    <x-input label="姓名:" placeholder="请输入内容" v-model="form.realname" :disabled="true"></x-input>
                </el-col>
                <el-col :span="6">
                    <x-input label="职位:" placeholder="请输入内容" v-model="form.post" :disabled="true"></x-input>
                </el-col>
                <el-col :span="6">
                    <x-input label="组别:" placeholder="请输入内容" v-model="form.group_num" :disabled="true"></x-input>
                </el-col>
                <el-col :span="6">
                    <x-input label="年级:" placeholder="请输入内容" v-model="form.grade" :disabled="true"></x-input>
                </el-col>
            </el-row>
            <p class="title">本周工作安排</p>
            <el-form-item label="星期一" prop="done_mon">
                <el-input type="textarea" v-model="form.done_mon" ></el-input>
            </el-form-item>
            <el-form-item label="星期二"  prop="done_tues">
                <el-input type="textarea" v-model="form.done_tues"></el-input>
            </el-form-item>
            <el-form-item label="星期三" prop="done_wed">
                <el-input type="textarea" v-model="form.done_wed" ></el-input>
            </el-form-item>
            <el-form-item label="星期四" prop="done_thur">
                <el-input type="textarea" v-model="form.done_thur" ></el-input>
            </el-form-item>
            <el-form-item label="星期五"  prop="done_fri">
                <el-input type="textarea" v-model="form.done_fri"></el-input>
            </el-form-item>
            <el-form-item label="星期六" prop="done_sat">
                <el-input type="textarea" v-model="form.done_sat" ></el-input>
            </el-form-item>
            <el-form-item label="星期日" prop="done_sun">
                <el-input type="textarea" v-model="form.done_sun" ></el-input>
            </el-form-item>
            <p class="title">工作总结和展望</p>
            <el-form-item label="本周总结"  prop="conclusion_part">
                <el-input type="textarea" v-model="form.conclusion_part"></el-input>
            </el-form-item>
            <el-form-item label="意见建议"  prop="improve_part">
                <el-input type="textarea" v-model="form.improve_part"></el-input>
            </el-form-item>
            <el-form-item label="下周工作计划"  prop="nextplan_part">
                <el-input type="textarea" v-model="form.nextplan_part"></el-input>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="onSubmit" size="big" style="width: 150px;">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import support from '@/views/support/support'
    export default {
        name: "addWeekly",
        mixins: [support],
        data() {
            return {
                showStartDate: '',
                showConfirm:false,
                showEndDate: '',
                form: {
                    startdate: '',
                    overdate: '',
                    nowweek: '',
                    realname: '',
                    post: '',
                    group_num: '',
                    grade: '',
                    done_mon: '',
                    done_tues: '',
                    done_wed: '',
                    done_thur: '',
                    done_fri: '',
                    done_sat: '',
                    done_sun: '',
                    conclusion_part: '',
                    improve_part: '',
                    nextplan_part: ''
                },
                formRules:{
                    done_mon: [{required: true, message: "必填项", trigger: "blur"}],
                    done_tues: [{required: true, message: "必填项", trigger: "blur"}],
                    done_wed: [{required: true, message: "必填项", trigger: "blur"}],
                    done_thur: [{required: true, message: "必填项", trigger: "blur"}],
                    done_fri: [{required: true, message: "必填项", trigger: "blur"}],
                    done_sat: [{required: true, message: "必填项", trigger: "blur"}],
                    done_sun: [{required: true, message: "必填项", trigger: "blur"}],
                    conclusion_part: [{required: true, message: "必填项", trigger: "blur"}],
                    improve_part: [{required: true, message: "必填项", trigger: "blur"}],
                    nextplan_part: [{required: true, message: "必填项", trigger: "blur"}],
                },
            }
        },
        created() {
            this.form.nowweek = this.getWeekOfYear()
            this.getWeek()
            this.init()
            this.form.realname = sessionStorage.getItem("realname")||'';
            this.form.post = sessionStorage.getItem("post")||'';
            this.form.group_num = sessionStorage.getItem("group_num")||'';
            this.form.grade = sessionStorage.getItem("grade")||''
        },
        methods: {
            init(){
                var params = {id:-1,page:this.currentPage,row:this.pageSize, name: '', post: '', group: '',uid:'' ,nowweek:''}     //id,page,row
                this.$axios.postJson('/public/query.do',params).then((res) => {
                    if(res.code == -1){
                        this.$router.push({path: '/login'})
                    }else {
                        console.log(1111,res.users[0].nowweek,this.getWeekOfYear())
                        if(res.users[0].nowweek == this.getWeekOfYear()){
                            this.showConfirm = !this.showConfirm;
                        }
                    }
                })
            },
            onSubmit() {
                this.form.nowweek = this.getWeekOfYear()
                // console.log("form:",this.form)
                var params={id:0,form:this.form}

                this.$axios.postJson('/public/insertAndUpdate.do', params).then((res) => {
                    if(res.code == -1){
                        this.$router.push({path: '/login'})
                    }else{
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.$router.push({path: '/weekly/weeklyList'})
                    }
                })
            },


        }
    }
</script>

<style scoped lang="less">
    .arrange {
        width: 80%;
        margin: 0 auto;
        .showConfirm{
            font-size: 20px;
            top: 200px;
            position: relative;
            text-align: center;
        }
        .userInfo {
            display: flex;
            justify-content: center;
        }
        .userInfo .x-input-label {
            font-size: 16px;
            margin: 0 10px;
        }
        .userInfo .el-input-group {
            width: 90%;
            margin-left: 29px;
        }
        .dateTime {
            padding-bottom: 10px;
            border-bottom: 1px solid #a2a9aa5c;
        }
        .dateTime span {
            display: inline-block;
            margin: 5px 20px;
            font-size: 20px;
        }
        .title {
            font-size: 23px;
            color: #03A9F4;
            border-left: 2px solid #2196F3;
            height: 36px;
            line-height: 36px;
            font-weight: 600;
            padding-left: 10px;
            margin: 10px;
        }
        .btn {
            display: flex;
            justify-content: center;
        }
    }
</style>
