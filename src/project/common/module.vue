<!-- 模块管理 -->
<template>
    <div>
        <x-query slot="query" :targetRef="'$refs.table'">
            <x-query-item>
                <x-select prop="sysid" label="所属系统" :data-source="{module:'system',valueField:'sysid',labelField:'name'}" placeholder="请选择所属系统"></x-select>
            </x-query-item>
            <x-query-item prop="mid" label="模块编号"/>
            <x-query-item prop="name" opt="like" label="模块名称"/>
            <x-query-item prop="tablename" opt="like" label="所属表"/>
        </x-query>
        <x-splitter :init="50">
            <template slot="1">
                <x-table-edit ref="table" style="padding-right: 10px" @row-click="rowClick" :data-source="{source:'sys_module'}">
                    <x-table-tree-column prop="name" parent-field="_pid" value-field="mid" label="模块名称" width="150"/>
                    <x-table-column prop="mid" label="模块标识" width="150"/>
                    <x-table-column prop="tablename" label="表名" width="150"/>
                    <x-table-column prop="sysid" label="所属系统" width="200">
                        <template slot-scope="scope" slot="show">
                            {{scope.row.sysname}}
                        </template>
                        <template slot-scope="scope" slot="edit">
                            <x-select v-model="scope.row.sysid" :data-source="{module:'system',valueField:'sysid',labelField:'name'}" :size="$style.size()" placeholder="请选择"></x-select>
                        </template>
                    </x-table-column>
                    <x-table-column prop="_pid" label="上级模块">
                        <template slot-scope="scope" slot="show">
                            {{scope.row._pidname}}
                        </template>
                        <template slot-scope="scope" slot="edit">
                            <x-select-tree v-model="scope.row._pid" :data-source="{module:'module',parent:'_pid',valueField:'mid',labelField:'name'}" dialog-width="300px"/>
                        </template>
                    </x-table-column>
                    <!--<x-table-column prop="name" label="模块名称" width="150"/>-->
                </x-table-edit>
            </template>
            <template slot="2">
                <x-table-edit title="功能按钮列表" :data-source="dataSourceX" :initNewRowData="initNewRowData" :loadData="false" style="padding-left:10px">
                    <x-table-column prop="mid" :edit="false" :hidden="true" label="模块编号" width="100"/>
                    <!--<x-table-column prop="midname" :edit="false" :save="false" label="模块名称" width="150"/>-->
                    <x-table-column prop="action" label="按钮标识" width="100"/>
                    <x-table-column prop="name" label="按钮名称" width="150">
                        <template slot-scope="scope" slot="edit">
                            <x-select v-model="scope.row.action" @label="label=>{scope.row.name=label}" :nameField="scope.row.name" allow-create :loadData="false" :size="$style.size()" placeholder="请选择">
                                <el-option :key="'add'" :label="'新增'" :value="'add'"/>
                                <el-option :key="'edit'" :label="'修改'" :value="'edit'"/>
                                <el-option :key="'del'" :label="'删除'" :value="'del'"/>
                            </x-select>
                        </template>
                    </x-table-column>
                    <x-table-column prop="sort" label="排序" width="150">
                        <!--<template slot-scope="scope" slot="edit">-->
                            <el-input-number slot-scope="scope" slot="edit" v-model="scope.row.sort" :min="0" :max="32760"/>
                        <!--</template>-->
                    </x-table-column>
                    <x-table-column prop="memo" label="备注"/>
                </x-table-edit>
            </template>
        </x-splitter>
    </div>
</template>

<script>
    export default {
        name:'module',
        data(){
            return {
                // data:[{id:'add',name:'新增'},{id:'edit',name:'修改'},{id:'del',name:'删除'}],
                dataSourceX:{module:'module_action',orderBy:'sort asc'},
                initNewRowData:{}
            }
        },
        methods:{
            rowClick(row){
                this.initNewRowData = {mid:row.mid};
                this.dataSourceX = {module:'module_action',orderBy:'sort asc',rule:[{name:'mid',opt:'=',val:row.mid}]}
            }
        }
    };
</script>