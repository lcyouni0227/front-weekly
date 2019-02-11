<!-- data-sql管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'datasql'}"
                  :dic="{name:'module', datasource:{valueField:'mid',labelField:'name',module:'module'}}"
        >
        <template slot="queryArea">
            <el-form-item label="编号">
                <el-input :size="$style.size()" v-model="query.uuid" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="名称"></el-input>
             </el-form-item>
        </template>
        <el-table-column prop="uuid" label="编号" width="200px">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.uuid}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.uuid" minlength="1" maxlength="30" placeholder="请输入编号"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="200px">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.name}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.name" minlength="1" maxlength="30" placeholder="请输入名称"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="mid" label="所属模块" width="150px">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.mid | dic('module')}}</span>
                <x-select v-else :size="$style.size()" v-model="scope.row.mid" placeholder="请选择模块"
                          :data-source="{searchField:'name',valueField:'mid',labelField:'name',dic:'module'}"
                >
                </x-select>
            </template>
        </el-table-column>
        <el-table-column prop="sqlinfo" label="sql语句">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.sqlinfo}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.sqlinfo" placeholder="请输入sql"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注" width="150px">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.memo}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.memo" maxlength="100" placeholder="请输入备注"></el-input>
            </template>
        </el-table-column>
    </x-table-edit>
</template>

<script>
    export default {
        name:'system',
        data(){
           return {
               module:'system',
               query: {querySymbol: {}}
           }
        }
    };
</script>
