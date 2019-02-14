<!-- 模块管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'module'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}]"
    >
        <template slot="queryArea">
            <el-form-item label="模块编号:">
                <el-input v-tooltip="'模块编号'" :size="$style.size()" v-model="query.mid" placeholder="模块编号"></el-input>
            </el-form-item>
            <el-form-item label="模块名称:">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="模块表:">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.tablename" placeholder="模块表"></el-input>
            </el-form-item>
        </template>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select :size="$style.size()" v-model="scope.row.sysid" placeholder="请选择"
                          :data-source="{searchField:'name',valueField:'sysid',labelField:'name',dic:'system'}"
                >
                </x-select>
            </template>
        </x-table-column>
        <!--<x-table-tree-column prop="name" treeKey="mid"  label="菜单名称">-->
            <!--<template slot-scope="scope" slot="show">-->
                <!--{{scope.row.name}}-->
            <!--</template>-->
            <!--<template slot-scope="scope" slot="edit">-->
                <!--<el-input v-model="scope.row.name" :size="$style.size()" placeholder="请输入模块编号"></el-input>-->
            <!--</template>-->
        <!--</x-table-tree-column>-->
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