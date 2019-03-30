<template>
    <x-table-edit :data-source="{module:'role'}" :dic="[{name:'system', dataSource:{valueField:'sysid',labelField:'name',module:'system'}}]">
        <x-query slot="query">
            <x-query-item>
                <x-select prop="sysid" label="所属系统" :data-source="{dic:'system'}" placeholder="请选择所属系统"></x-select>
            </x-query-item>
            <x-query-item prop="rid" label="角色编号"/>
            <x-query-item prop="name" opt="like" label="角色名称"/>
        </x-query>
        <x-table-column prop="sysid" label="所属系统" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.sysid | dic('system')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.sysid" :data-source="{dic:'system'}" :size="$style.size()" placeholder="请选择所属系统"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="rid" label="角色编号" width="200"/>
        <x-table-column prop="name" label="角色名称" width="200"/>
        <x-table-column prop="memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'role',
    };
</script>