<template>
    <x-table-edit :data-source="{module:'lot_build',orderBy:'build_sort asc'}">
        <x-query slot="query">
            <x-query-item prop="build_id" label="楼栋编号"/>
            <x-query-item prop="build_name" opt="like" label="楼栋名称"/>
        </x-query>
        <x-table-column prop="build_id" label="楼栋编号" width="200"/>
        <x-table-column prop="build_name" label="楼栋名称" width="200"/>
        <x-table-column prop="build_sort" type="Number" label="排序" width="200"/>
        <x-table-column prop="build_memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'lot_build',
    };
</script>