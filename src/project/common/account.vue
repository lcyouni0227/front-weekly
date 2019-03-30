<!-- 账号管理 -->
<template>
    <x-table-edit :data-source="{module:'account',addField:'*'}">
        <x-query slot="query">
            <x-query-item prop="uid" label="编号"/>
            <x-query-item prop="name" opt="like" label="姓名"/>
            <x-query-item prop="status" opt="=" label="状态"/>
        </x-query>
        <el-table-column prop="aid" label="内码" width="80" :edit="false"/>
        <x-table-column prop="passport" label="登录账号" width="100">
            <template slot-scope="scope" slot="show">
                {{scope.row.passport}}
            </template>
        </x-table-column>
        <x-table-column prop="pwd" label="密码" width="50">
            <template slot="show">***</template>
        </x-table-column>
        <x-table-column prop="uid" label="用户编号" width="100"/>
        <!--<x-table-column prop="name" label="姓名" width="200"/>-->
        <x-table-column prop="utype" label="类型" width="100"/>
        <x-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope" slot="show">
                {{scope.row.status==0?'未启用':'启用'}}
            </template>
            <template slot-scope="scope" slot="edit">
                <el-select v-model="scope.row.status" placeholder="请选择">
                    <el-option :key="0" :label="'未启用'" :value="0"/>
                    <el-option :key="1" :label="'启用'" :value="1"/>
                </el-select>
            </template>
        </x-table-column>
        <x-table-column prop="limitip" label="登录IP限制" width="200"/>
        <x-table-column prop="regtime" label="注册时间" width="200"/>
        <x-table-column prop="pwdlimittime" label="密码时长(天)" type="Number" width="150"/>
        <x-table-column prop="pwdmodifytime" label="最后一次修改密码时间" width="200"/>
        <x-table-column prop="lastlogintime" label="最后一次登录时间" width="200"/>
        <x-table-column prop="lastloginip" label="最后一次登录IP" width="200"/>
        <x-table-column prop="logincount" label="登录次数" width="200"/>
        <!--<x-table-column prop="issuper" label="超级管理员" width="50">-->
            <!--<template slot-scope="scope" slot="show">-->
                <!--{{scope.row.issuper==0?'否':'是'}}-->
            <!--</template>-->
            <!--<template slot-scope="scope" slot="edit">-->
                <!--<el-select v-model="scope.row.issuper" placeholder="请选择">-->
                    <!--<el-option key="0" label="否" value="0"/>-->
                    <!--<el-option key="1" label="是" value="1"/>-->
                <!--</el-select>-->
            <!--</template>-->
        <!--</x-table-column>-->
        <x-table-column prop="memo" label="备注"/>

        <x-dialog-edit slot="edit" slot-scope="scope" request title="账号设置" width="800px" height="500px">
            <el-form label-position="right" label-width="140px" inline cols="2">
                <x-form-item label="账号内码" prop="aid">
                    <x-input v-model="scope.row.aid" :disabled="true"/>
                </x-form-item>
                <x-form-item label="启用状态" prop="status">
                    <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" :disabled="scope.action"/>
                </x-form-item>
                <x-form-item label="登录账号" prop="passport">
                    <x-input v-model="scope.row.passport" :disabled="scope.action"/>
                </x-form-item>
                <x-form-item label="登录密码" prop="pwd">
                    <x-input type="password" v-model="scope.row.pwd" :disabled="scope.action"/>
                </x-form-item>
                <x-form-item label="用户编号" prop="uid">
                    <x-select-table v-model="scope.row.uid" :disabled="scope.action" :data-source="{module:'user'}" dialogWidth="700" labelField="name" valueField="uid">
                        <x-query slot="query">
                            <x-query-item prop="uid" label="用户编号"/>
                            <x-query-item prop="name" opt="like" label="姓名"/>
                        </x-query>
                        <template>
                            <x-table-column prop="uid" label="编号" width="100"/>
                            <x-table-column prop="name" label="姓名" width="100"/>
                            <x-table-column prop="sex" label="性别" width="60"/>
                            <x-table-column prop="tel" label="电话" width="200"/>
                            <x-table-column prop="mobile" label="手机"/>
                        </template>
                    </x-select-table>
                </x-form-item>
                <x-form-item label="用户类型" prop="utype">
                    <x-input v-model="scope.row.utype" :disabled="scope.action"/>
                </x-form-item>
                <x-form-item label="密码时长" prop="pwdlimittime">
                    <el-input-number v-model="scope.row.pwdlimittime" :disabled="scope.action"/>(天)
                </x-form-item>
                <x-form-item label="登录次数" prop="logincount">
                    <x-input v-model="scope.row.logincount" :disabled="true"/>
                </x-form-item>
                <x-form-item label="注册时间" prop="regtime">
                    <x-input v-model="scope.row.regtime" :disabled="true"/>
                </x-form-item>
                <x-form-item label="最近修改密码时间" prop="pwdmodifytime">
                    <x-input v-model="scope.row.pwdmodifytime" :disabled="true"/>
                </x-form-item>
                <x-form-item label="最近登录时间" prop="lastlogintime">
                    <x-input v-model="scope.row.lastlogintime" :disabled="true"/>
                </x-form-item>
                <x-form-item label="最近登录IP" prop="lastloginip">
                    <x-input v-model="scope.row.lastloginip" :disabled="true"/>
                </x-form-item>
                <x-form-item label="登录IP限制" prop="limitip" cols="2">
                    <x-input type="textarea" v-model="scope.row.limitip" :disabled="scope.action"/>
                </x-form-item>
            </el-form>
        </x-dialog-edit>
    </x-table-edit>
</template>

<script>
    export default {
        name:'account'
    };
</script>

