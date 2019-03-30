<template>
    <x-table-edit :data-source="{module:'lot_floor',orderBy:'floor_sort asc'}"
                  :dic="[{name:'lot_build', dataSource:{valueField:'build_id',labelField:'build_name',module:'lot_build'}}]"

    >
        <x-query slot="query">
            <x-query-item>
                <x-select prop="build_id" label="所属楼栋" :data-source="{dic:'lot_build'}" placeholder="请选择所属楼栋"></x-select>
            </x-query-item>
            <x-query-item prop="floor_id" label="楼层编号"/>
            <x-query-item prop="floor_name" opt="like" label="楼层名称"/>
        </x-query>
        <x-table-column prop="build_id" label="所属楼栋" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.build_id | dic('lot_build')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.build_id" :data-source="{dic:'lot_build'}" :size="$style.size()" placeholder="请选择所属楼栋"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="floor_id" label="楼层编号" width="200"/>
        <x-table-column prop="floor_name" label="楼层名称" width="200"/>
        <x-table-column prop="floor_sort" label="排序" type="Number" width="200"/>
        <x-table-column prop="floor_memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'lot_floor',
    };
</script>