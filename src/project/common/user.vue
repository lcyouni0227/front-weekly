<!-- 用户管理 -->
<template>
    <x-table-edit :data-source="{module:'user'}">
        <x-query slot="query">
            <x-query-item prop="uid" label="编号"/>
            <x-query-item prop="name" opt="like" label="姓名"/>
        </x-query>
        <x-table-column prop="uid" label="编号" width="150"/>
        <x-table-column prop="name" label="姓名" width="200"/>
        <x-table-column prop="sex" label="性别" width="200">
            <template slot-scope="scope" slot="edit">
                <el-select v-model="scope.row.sex" placeholder="请选择">
                    <el-option key="男" label="男" value="男"/>
                    <el-option key="女" label="女" value="女"/>
                </el-select>
            </template>
        </x-table-column>
        <x-table-column prop="tel" label="电话" width="200"/>
        <x-table-column prop="mobile" label="手机" width="200"/>
        <x-table-column prop="email" label="邮箱" width="200"/>
        <x-table-column prop="address" label="住址" width="200"/>
        <x-table-column prop="memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'user'
    };
</script>
