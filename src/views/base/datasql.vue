<!-- data-sql管理 -->
<template>
    <x-table-edit :data-source="{module:'datasql'}" :dic="[{name:'module', datasource:{valueField:'mid',labelField:'name',module:'module'}}]">
        <x-query slot="query">
            <x-query-item>
                <x-select prop="mid" label="所属模块" :data-source="{dic:'module'}" placeholder="请选择所属模块"></x-select>
            </x-query-item>
            <x-query-item prop="uuid" label="数据源编号"/>
            <x-query-item prop="name" opt="like" label="数据源名称"/>
        </x-query>
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
        <x-table-column prop="sqlinfo" label="sql语句">
            <template slot-scope="scope" slot="edit">
                <x-input v-model="scope.row.sqlinfo" clearable placeholder="请输入"
                         :dialog="{title:'SQL编辑器',width:'50%',height:'30px',content:'x-code-edit-sql'}"
                >
                    <x-code-edit-sql slot="dialogContent"/>
                </x-input>
            </template>

        </x-table-column>
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
