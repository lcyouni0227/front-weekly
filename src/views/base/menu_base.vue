<!-- 菜单模板管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                  :data-source="{module:'menu_base'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}},{name:'module', datasource:{valueField:'mid',labelField:'name',module:'module'}}]"
    >
        <template slot="queryArea">
            <el-form-item label="模块编号">
                <el-input v-tooltip="'模块编号'" :size="$style.size()" v-model="query.mid" placeholder="模块编号"></el-input>
            </el-form-item>
            <el-form-item label="模块名称">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="模块名称"></el-input>
            </el-form-item>
        </template>
        <x-table-tree-column prop="name" tree-key="_id" parent-key="_pid" label="菜单名称" width="200"/>
        <x-table-column prop="_id" label="菜单编号" width="200"/>
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
        <x-table-column prop="mid" label="所属模块" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.mid | dic('module')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select :size="$style.size()" v-model="scope.row.mid" placeholder="请选择所属模块"
                          :data-source="{searchField:'name',valueField:'mid',labelField:'name',dic:'module'}"
                >
                </x-select>
            </template>
        </x-table-column>
        <x-table-column prop="icon" label="菜单图标" width="200"/>
        <x-table-column prop="path" label="菜单路由" width="200"/>
        <x-table-column prop="component" label="菜单页面"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'menu_base',
        data(){
            return {
                query: {querySymbol: {}},
            }
        }
    };
</script>