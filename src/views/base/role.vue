<template>
    <x-table-edit highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'role'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}]"
        >
        <template slot="queryArea">
            <el-form-item label="所属系统">
                <x-select v-model="query.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </el-form-item>
            <el-form-item label="角色编号:">
                <el-input v-model="query.rid" :size="$style.size()" clearable placeholder="角色编号"></el-input>
            </el-form-item>
            <el-form-item label="角色名称:">
                <el-input v-query="'like'" v-model="query.name" :size="$style.size()" clearable placeholder="角色名称"></el-input>
             </el-form-item>
        </template>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="rid" label="角色编号" width="200"/>
        <x-table-column prop="name" label="角色名称" width="200"/>
        <x-table-column prop="memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'role',
        data(){
            return {
                query: {querySymbol: {}}
            }
        }
    };
</script>