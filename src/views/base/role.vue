<template>
    <x-table-edit highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'role'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}]"
        >
        <template slot="queryArea">
            <el-form-item label="角色编号:">
                <el-input :size="$style.size()" v-model="query.rid" placeholder="角色编号"></el-input>
            </el-form-item>
            <el-form-item label="角色名称:">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="角色名称"></el-input>
             </el-form-item>
        </template>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select :size="$style.size()" v-model="scope.row.sysid" placeholder="请选择所属系统"
                          :data-source="{searchField:'name',valueField:'sysid',labelField:'name',dic:'system'}"
                >
                </x-select>
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