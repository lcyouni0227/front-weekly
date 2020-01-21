<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" inline width="90%">
            <el-form-item label="名字">
                <el-input v-model="form.realname" clearable></el-input>
            </el-form-item>
            <el-form-item label="周数">
                <el-select v-model="value" filterable placeholder="请选择" clearable>
                    <el-option
                            v-for="item in weeks"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="value2" placeholder="请选择职位" clearable>
                    <el-option
                            v-for="item in posts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组别">
                <el-select v-model="value3" placeholder="请选择组别" clearable>
                    <el-option
                            v-for="item in groups"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData"> 搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="openAddUser" style=" margin: 10px 0;"> 添加用户</el-button>
        <div class="userList">
            <el-table
                    :data="tableData"
                    border
                    stripe
            >
                <el-table-column
                        type="index"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="姓名"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="academy"
                        label="学院"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="年级"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="group_num"
                        label="组别"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="post"
                        label="职位"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="count"
                        align="center"
                        label="总数"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="uid"
                        v-if="false"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="280">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent=" showRow(scope.$index, tableData)"
                                size="small">
                            查看周报
                        </el-button>
                        <el-button
                                @click.native.prevent=" editUserDialog(scope.$index, tableData)"
                                type="primary"
                                size="small">
                            修改
                        </el-button>
                        <el-button
                                @click.native.prevent=" deleteUser(scope.$index, tableData)"
                                type="danger"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                :title="editOrAdd ? '编辑用户信息': '添加用户信息'"
                :visible.sync="dialogVisible"
                class="weekDialog"
                width="51%">
            <div class="content">
                <el-form ref="register" :model="register" :rules="registerRules" status-icon label-position="left"
                         label-width="0px"
                         class="login-page">
                    <el-form-item prop="name">
                        <x-input label="姓名:" type="text" v-model="register.realname" auto-complete="off"
                                 placeholder="请输入姓名" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="name" class="label">
                        <x-input label="用户名:" type="text" v-model="register.username" auto-complete="off"
                                 placeholder="请输入用户名" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="sex" label="性别" class="label">
                        <el-select v-model="register.sex" placeholder="请选择性别" clearable>
                            <el-option
                                    v-for="item in sexs"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="academy">
                        <x-input label="学院:" type="text" v-model="register.academy" auto-complete="off"
                                 placeholder="请输入所在学院" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="group" label="组别" class="label">
                        <el-select v-model="register.group_num" placeholder="请选择组别" clearable>
                            <el-option
                                    v-for="item in groups"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="grade" class="label">
                        <x-input label="年级:" type="text" v-model="register.grade" auto-complete="off"
                                 placeholder="请输入年级" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="post"  v-if="show">
                        <x-input label="年级:" type="text" v-model="register.post" auto-complete="off"
                                 placeholder="请输入" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="privilege" label="权限" class="label">
                        <el-select v-model="register.privilege" placeholder="请选择权限" clearable>
                            <el-option
                                    v-for="item in privileges"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <x-input label="电话:" type="text" v-model="register.phone" auto-complete="off"
                                 placeholder="请输入电话" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <x-input label="邮箱:" type="text" v-model="register.email" auto-complete="off"
                                 placeholder="请输入邮箱" size="big"></x-input>
                    </el-form-item>
                    <el-form-item prop="passport">
                        <x-input label="密码:" type="text" v-model="register.password" auto-complete="off"
                                 placeholder="请输入密码" size="big"></x-input>
                    </el-form-item>
                    <el-form-item style="display: flex;justify-content: center">
                        <el-button type="primary"  @click="changeUser()" size="big" v-if="editOrAdd">确认修改</el-button>
                        <el-button type="primary"  @click="addUser()" size="big" v-else>确认添加</el-button>
                        <el-button type="primary" style="width:110px;" @click="dialogVisible = false" size="big">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
    import support from '@/views/support/support'

    export default {
        name: "userList",
        mixins: [support],
        data() {
            return {
                form: {
                    realname: '',
                },
                currentPage: 1,
                pageSize: 10,
                total: 10,
                tableData: [],
                dialogVisible: false,
                editOrAdd: true,
                register: {
                    realname: '',
                    username: '',
                    sex: '',
                    academy: '',
                    group_num: '',
                    grade: '',
                    phone: '',
                    post: '',
                    email: '',
                    password: '',
                    privilege: ''
                },
                show: false,
                registerRules: {
                    realname: [{required: true, message: "必填项", trigger: "blur"}],
                    username: [{required: true, message: "必填项", trigger: "blur"}],
                    group_num: [{required: true, message: "必填项", trigger: "blur"}],
                    grade: [{required: true, message: "必填项", trigger: "blur"}],
                    academy: [{required: true, message: "必填项", trigger: "blur"}],
                    password: [{required: true, message: "必填项", trigger: "blur"}],
                    phone: [{required: true, message: "必填项", trigger: "blur"}],
                    email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}],
                },
                weeks: [],
                value: '',
                privileges: [],
                sexs: [{
                    value: "男",
                    label: "男"
                }, {
                    value: "女",
                    label: "女"
                }],
                posts: [{
                    value: '组长',
                    label: '组长'
                }, {
                    value: '组员',
                    label: '组员'
                }],
                value2: '',
                groups: [{
                    value: '前端组',
                    label: '前端组'
                }, {
                    value: '后台组',
                    label: '后台组'
                }, {
                    value: '安卓组',
                    label: '安卓组'
                }, {
                    value: '机器学习组',
                    label: '机器学习组'
                }],
                value3: '',
            }
        },
        created() {
            this.updateUsers();
            for (var i = 1; i < this.getWeekOfYear() + 1; i++) {
                this.weeks.push({value: i, label: `第${i}周`});
            }
        },
        methods: {
            updateUsers() {
                var params = {
                    name: this.form.realname,
                    post: this.value2,
                    group_num: this.value3,
                    page: this.currentPage,
                    row: this.pageSize,
                    nowweek: this.value
                }
                this.$axios.postJson('/public/userquery.do', params).then((res) => {
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else {
                        this.tableData = res.userlist;
                    }
                })
            },
            searchData() {
                var params = {
                    name: this.form.realname,
                    post: this.value2,
                    group_num: this.value3,
                    page: this.currentPage,
                    row: this.pageSize,
                    nowweek: this.value
                }
                this.$axios.postJson('/public/userquery.do', params).then((res) => {
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else {
                        // console.log('search:', res);
                        this.tableData = res.userlist;
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.updateUsers();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.updateUsers();
            },
            handlePrevChange() {
                if (this.currentPage <= 0) {
                    this.currentPage = 0;
                } else {
                    this.currentPage -= this.currentPage;
                }
                this.updateUsers();
            },
            handleNextChange() {
                if (this.total / this.pageSize >= this.currentPage) {
                    this.currentPage = this.currentPage;
                } else {
                    this.currentPage += this.currentPage;
                }
                this.updateUsers();
            },
            showRow(index, tableData) {
                if(this.tableData[index].count == 0){
                    this.$alert('该用户当前没有填写周报', '提示', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$router.push({path: '/weekly/weeklyList', query: {uid: this.tableData[index].userid}})
                }
            },
            openAddUser(){
                this.dialogVisible = true;
               this.editOrAdd = false
                if(sessionStorage.getItem("privilege") == 310){
                    this.privileges.push({
                            value: '210',
                            label: "组长"
                        },{
                        value: '110',
                        label: "组员"
                    })
                }else{
                    this.privileges.push({
                        value: '110',
                        label: "组员"
                    })
                }
            },
            addUser() {
                if (this.register.privilege == "210") {
                    this.register.post = "组长"
                } else {
                    this.register.post = "组员"
                }
                this.$axios.postJson('/public/addUser.do', this.register).then((res) => {
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else if(res.code == -2){
                        this.$message({
                            message: '添加失败,用户名已存在',
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.$router.push({path: '/index/dashboard'})
                    }
                })
            },
            editUserDialog(index, tableData) {
                this.editOrAdd = true;
                this.dialogVisible = true
                var params = {
                    name: this.form.realname,
                    post: this.value2,
                    group_num: this.value3,
                    page: this.currentPage,
                    row: this.pageSize,
                    nowweek: this.value,
                    uid:this.tableData[index].userid
                }
                this.$axios.postJson('/public/userquery.do', params).then((res) => {
                   console.log(res)
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else {
                        // console.log('search:', res);
                        this.register = res.userlist[0];
                    }
                })

            },
            deleteUser(index, tableData) {
                var params = {uid: tableData[index].userid};
                console.log("deleteuid:", index, tableData, params, typeof params)
                if(this.tableData[index].username == sessionStorage.getItem("username")){
                    this.$alert('不可删除该账号', '提示', {
                        confirmButtonText: '确定',
                    });
                }else{
                    this.$confirm('确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.postJson('/public/delete.do', params).then((res) => {
                            if (res.code == -1) {
                                this.$router.push({path: '/login'})
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.updateUsers();
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            changeUser() {
                var params={register:this.register}
                console.log("changeUser:",params);
                this.$axios.postJson('/public/change.do', params).then((res) => {
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else{
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.updateUsers();
                    }
                })
            },
        },
    }
</script>
<style>
    .label .el-form-item__label, .label .x-input-label {
        width: 110px !important;
    }

    .label .el-select .el-input {
        width: 744px;
    }
    .weekDialog .el-dialog .el-dialog__body{
        width: 90%;
        margin: 0 auto;
    }
</style>
<style scoped>

    .pages {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
</style>
