<!-- 菜单模板管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                  :att-field="'_pid,muid'"
                  :data-source="{module:'menu_base'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}
                  ,{name:'module', datasource:{valueField:'mid',labelField:'name',module:'module'}}
                  ,{name:'menu_base', datasource:{parentField:'_pid',valueField:'muid',labelField:'name',module:'menu_base'}}]"
    >
        <template slot="queryArea">
            <el-form-item label="所属系统">
                <x-select v-model="query.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </el-form-item>
            <el-form-item label="菜单名称">
                <el-input v-model="query.name" v-query="'like'" :size="$style.size()" clearable placeholder="菜单名称"></el-input>
            </el-form-item>
        </template>
        <x-table-tree-column prop="name" parent-field="_pid" value-field="muid" label="菜单名称" width="200"/>
        <x-table-column prop="muid" label="菜单编号" width="200"/>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="mid" label="所属模块" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.mid | dic('module')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.mid" :data-source="{dic:'module'}" :size="$style.size()" placeholder="请选择所属模块"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="_pid" label="上级菜单" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row._pid | dic('menu_base')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select-tree v-model="scope.row._pid" :data-source="{dic:'menu_base'}" dialog-width="300px"/>
            </template>
        </x-table-column>
        <x-table-column prop="icon" label="菜单图标" width="200">
            <template slot-scope="scope" slot="show">
                <i :class="scope.row.icon">{{scope.row.icon}}</i>
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select-icon v-model="scope.row.icon" dialog-width="500"/>
            </template>
        </x-table-column>
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
                // data:[{
                //     id:111,
                //     _pid:0
                // }]
            }
        }
    };
</script>