<!-- 模块管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'module'}"
                  :dic="[{name:'system', datasource:{valueField:'sysid',labelField:'name',module:'system'}}]"
    >
        <x-query slot="query">
            <x-query-item>
                <x-select prop="sysid" label="所属系统" :data-source="{dic:'system'}" placeholder="请选择所属系统"></x-select>
            </x-query-item>
            <x-query-item prop="mid" label="模块编号"/>
            <x-query-item prop="name" opt="like" label="模块名称"/>
            <x-query-item prop="tablename" opt="like" label="所属表"/>
        </x-query>
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
        name:'module'
    };
</script>