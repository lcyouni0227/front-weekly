<!-- 模块管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'module'}"
                  :dic="{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}"
    >
        <template slot="queryArea">
            <el-form-item label="模块编号">
                <el-input v-tooltip="'模块编号'" :size="$style.size()" v-model="query.mid" placeholder="模块编号"></el-input>
            </el-form-item>
            <el-form-item label="模块名称">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="模块表">
                <el-input :size="$style.size()" v-model="query.tablename" placeholder="模块表"></el-input>
            </el-form-item>
        </template>
        <el-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.sysid | dic('system')}}</span>
                <x-select v-else :size="$style.size()" v-model="scope.row.sysid" placeholder="请选择"
                          :data-source="{searchField:'name',valueField:'sysid',labelField:'name',module:'system'}"
                >
                </x-select>
            </template>
        </el-table-column>
        <el-table-column prop="mid" label="模块编号" width="200">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.mid}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.mid" required minlength="1" maxlength="6" placeholder="请输入模块编号"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="模块名称" width="400">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.name}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.name" minlength="1" maxlength="30" placeholder="请输入模块名称"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="tablename" label="模块所属表">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.tablename}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.tablename" minlength="1" maxlength="30" placeholder="模块所属表"></el-input>
            </template>
        </el-table-column>
    </x-table-edit>
</template>

<script>
    export default {
        name:'module',
        data(){
            return {
                module:'system',
                query: {querySymbol: {}},
            }
        }
    };
</script>