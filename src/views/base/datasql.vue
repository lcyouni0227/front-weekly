<!-- data-sql管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'datasql'}"
                  :dic="[{name:'module', datasource:{valueField:'mid',labelField:'name',module:'module'}}]"
        >
        <template slot="queryArea">
            <el-form-item label="数据源编号:">
                <el-input v-model="query.uuid" :size="$style.size()" clearable placeholder="数据源编号"></el-input>
            </el-form-item>
            <el-form-item label="数据源名称:">
                <el-input v-query="'like'" v-model="query.name" :size="$style.size()" clearable placeholder="数据源名称"></el-input>
             </el-form-item>
        </template>
        <x-table-column prop="mid" label="所属模块" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.mid | dic('module')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.mid" :data-source="{dic:'module'}" :size="$style.size()" placeholder="请选择所属模块"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="uuid" label="数据源编号" width="200px"/>
        <x-table-column prop="name" label="数据源名称" width="200px"/>
        <x-table-column prop="sqlinfo" label="sql语句"/>
        <x-table-column prop="memo" label="备注" width="150px"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'datasql',
        data(){
           return {
               query: {querySymbol: {}}
           }
        }
    };
</script>
