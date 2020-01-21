<template>
    <div class="weeklyList">
        <div class="card">
            <div v-for="item in cardList" >
                <weeklyCard class="cardItem" :date="transferDate(new Date(item.creattime))" width="350" :cardName="'第'+item.nowweek+ '周'"
                            :edit="editTitle(item)" view="查看详情" :sumup="item.conclusion_part" @editClick="editWeekly(item.id)" @viewClick="showDialog(item.id)"></weeklyCard>
            </div>
        </div>
        <el-dialog
                :title="`第${nowweek}周 `+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ `日期：${startdate} - ${overdate}`"
                :visible.sync="dialogVisible"
                class="weekDialog"
                width="60%">
            <div class="content">
                <el-form ref="form" :model="form" label-width="80px" :rule="formRules">
                    <!--<p class="date"><span>日期：</span><span>{{form.startdate}} - {{form.overdate}}</span></p>-->
                    <p class="title">个人信息</p>
                    <el-row class="userInfo">
                        <el-col :span="6"><span>姓名：{{form.realname}}</span></el-col>
                        <el-col :span="6"><span>职位：{{form.post}}</span></el-col>
                        <el-col :span="6"><span>组别：{{form.groupnum}}</span></el-col>
                        <el-col :span="6"><span>年级：{{form.grade}}</span></el-col>
                    </el-row>
                    <p class="title">本周工作安排</p>
                        <el-form-item label="星期一" prop="done_mon">
                            <p v-if="show">{{form.done_mon}}</p>
                            <el-input v-else type="textarea" v-model="form.done_mon" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期二">
                            <p v-if="show">{{form.done_tues}}</p>
                            <el-input v-else type="textarea" v-model="form.done_tues" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期三">
                            <p v-if="show">{{form.done_wed}}</p>
                            <el-input v-else type="textarea" v-model="form.done_wed" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期四">
                            <p v-if="show">{{form.done_thur}}</p>
                            <el-input v-else type="textarea" v-model="form.done_thur" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期五">
                            <p v-if="show">{{form.done_fri}}</p>
                            <el-input v-else type="textarea" v-model="form.done_fri" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期六">
                            <p v-if="show">{{form.done_sat}}</p>
                            <el-input v-else type="textarea" v-model="form.done_sat" ></el-input>
                        </el-form-item>
                        <el-form-item label="星期日">
                            <p v-if="show">{{form.done_sun}}</p>
                            <el-input v-else type="textarea" v-model="form.done_sun" ></el-input>
                        </el-form-item>
                        <p class="title">工作总结和展望</p>
                        <el-form-item label="本周总结">
                            <p v-if="show">{{form.conclusion_part}}</p>
                            <el-input v-else type="textarea" v-model="form.conclusion_part" ></el-input>
                        </el-form-item>
                        <el-form-item label="意见建议">
                            <p v-if="show">{{form.improve_part}}</p>
                            <el-input v-else type="textarea" v-model="form.improve_part" ></el-input>
                        </el-form-item>
                        <el-form-item label="下周工作计划">
                            <p v-if="show">{{form.nextplan_part}}</p>
                            <el-input v-else type="textarea" v-model="form.nextplan_part" ></el-input>
                        </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit()" v-if="!show">保 存</el-button>
                <el-button type="primary" @click="dialogVisible = false" v-if="!show">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false" v-if="show">确 定</el-button>
            </span>
        </el-dialog>
        <div class="pages">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="handlePrevChange"
                    @next-click="handleNextChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import weeklyCard from "../components/component/weeklyCard"
    import support from '@/views/support/support'
    export default {
        name: "weeklyList",
        components: {weeklyCard},
        mixins: [support],
        data() {
            return {
                currentPage:1,
                show:true,
                pageSize:10,
                total:10,
                cardList: [],
                nowweek: '',
                weeklyId:'',
                dialogVisible: false,
                startdate: '',
                overdate: '',
                form: {
                    id:'',
                    startdate: '',
                    overdate: '',
                    realname: '',
                    post: '',
                    grade:'',
                    groupnum:'',
                    direction: '',
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
        computed:{
            editTitle(){
                return function (item) {
                    // console.log(42342424,this.$route.query.uid ==  sessionStorage.getItem("userid"))
                    // console.log(23424,this.$route.query.uid ==  undefined)
                    var currentWeekly = (new Date()).valueOf() <item.overdate + 24*60*60*1000;
                  return  (currentWeekly && (this.$route.query.uid == undefined))||(currentWeekly && (this.$route.query.uid ==  sessionStorage.getItem("userid"))) ? '编辑' : ''
                }
            }
        },
        created() {
            this.nowweek = this.getWeekOfYear()
            this.updateWeekly();
        },
        methods: {
            updateWeekly(){
                var uid = this.$route.query.uid;
                // console.log("uid",uid)
                var params = {id:-1,page:this.currentPage,row:this.pageSize, name: '', post: '', group: '',uid:uid || '' ,nowweek:''}     //id,page,row
                this.$axios.postJson('/public/query.do',params).then((res) => {
                    if(res.code == -1){
                        this.$router.push({path: '/login'})
                    }else {
                        this.cardList = res.users;
                        this.total = res.total;
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.updateWeekly();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.updateWeekly();
            },
            handlePrevChange(){
                if(this.currentPage <= 0){
                    this.currentPage =0;
                }else{
                    this.currentPage -=this.currentPage;
                }
                this.updateWeekly();
            },
            handleNextChange(){
                if(this.total /this.pageSize >= this.currentPage){
                    this.currentPage = this.currentPage;
                }else{
                    this.currentPage +=this.currentPage;
                }
                this.updateWeekly();
            },
            onSubmit() {
                this.$confirm('确定保存?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible = false;
                    var params={id:this.form.id,form:this.form}
                    this.$axios.postJson('/public/insertAndUpdate.do', params).then((res) => {
                        if(res.code == -1){
                            this.$router.push({path: '/login'})
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    });
                });
            },
            showDialog(id) {
                this.dialogVisible = true;
                this.show=true
                var uid = this.$route.query.uid;
                var params = {uid:uid ||'',id:id,name:'',post:'',group_num:'',page:this.currentPage,row:this.pageSize,nowweek:''}  //只要id
                this.$axios.postJson('/public/query.do',params).then((res) => {
                    // console.log('dialog:',res);
                    if(res.code == -1){
                        this.$router.push({path: '/login'})
                    }else{
                        this.form = res.users[0];
                        this.nowweek = res.users[0].nowweek;
                        this.startdate = this.transferDate(new Date(res.users[0].startdate))
                        this.overdate = this.transferDate(new Date(res.users[0].overdate))
                    }
                })
            },
            editWeekly(id){
                this.dialogVisible = true;
                this.show=false
                var uid = this.$route.query.uid;
                    var params = {uid:uid||'',id:id, name: '', post: '', group_num: '', page: this.currentPage, row: this.pageSize, nowweek: ''}
                    this.$axios.postJson('/public/query.do',params).then((res) => {  //接口名预留
                        if(res.code == -1){
                            this.$router.push({path: '/login'})
                        }else {
                            this.form = res.users[0];
                            this.startdate = this.transferDate(new Date(res.users[0].startdate))
                            this.overdate = this.transferDate(new Date(res.users[0].overdate))
                        }
                    })
                // this.$router.push({path: '/weekly/addWeekly',query:{id:id}})
            },
        }
    }
</script>

<style scoped lang="less">
    .weeklyList {
        background-color: #fcfcfc;
        height: 100%;
        margin: 0 auto;
        .card {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            .cardItem {
                margin: 15px 20px;
            }
        }
        .pages {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        .content {
            font-size: 15px;
            .title {
                font-size: 16px;
                color: #03A9F4;
                border-left: 2px solid #2196F3;
                height: 30px;
                line-height: 30px;
                font-weight: 600;
                padding-left: 10px;
                margin: 5px;
            }
            .userInfo{
                height: 32px;
                line-height: 32px;
                margin-left: 35px;
            }
            .date {
                margin-bottom: 10px;
            }
        }

    }

    .content .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 6px;
    }
</style>
<style>
    .weekDialog .el-dialog {
        max-height: 700px;
        overflow: auto;
    }
    .weekDialog .el-dialog__title{
        font-size: 23px;
    }
    .card .el-card .el-card__body {
        min-height: 110px;
    }
</style>
