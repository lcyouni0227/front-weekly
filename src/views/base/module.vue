<!-- 模块管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'module'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}]"
    >
        <template slot="queryArea">
            <el-form-item label="所属系统">
                <x-select v-model="query.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </el-form-item>
            <el-form-item label="模块编号:">
                <el-input v-model="query.mid" :size="$style.size()" clearable placeholder="模块编号"></el-input>
            </el-form-item>
            <el-form-item label="模块名称:">
                <el-input v-model="query.name" v-query="'like'" :size="$style.size()" clearable placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="模块表:">
                <el-input v-model="query.tablename" v-query="'like'" :size="$style.size()" clearable placeholder="模块表"></el-input>
            </el-form-item>
        </template>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="mid" label="模块编号" width="200"/>
        <x-table-column prop="name" label="模块名称" width="400"/>
        <x-table-column prop="tablename" label="模块所属表"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'module',
        data(){
            return {
                query: {querySymbol: {}},
            }
        }
    };
</script>