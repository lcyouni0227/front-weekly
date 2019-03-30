<template>
    <x-table-edit :data-source="{module:'lot_room',orderBy:'room_sort asc'}"
                  :dic="[{name:'lot_build', dataSource:{valueField:'build_id',labelField:'build_name',module:'lot_build'}}
                  ,{name:'lot_floor', dataSource:{addField:'build_id',valueField:'floor_id',labelField:'floor_name',module:'lot_floor'}}]"

    >
        <x-query slot="query">
            <x-query-item>
                <x-select prop="build_id" label="所属楼栋" :data-source="{dic:'lot_build'}" placeholder="请选择所属楼栋"></x-select>
            </x-query-item>
            <x-query-item prop="room_id" label="楼层编号"/>
            <x-query-item prop="room_name" opt="like" label="楼层名称"/>
        </x-query>
        <x-table-column prop="build_id" label="所属楼栋" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.build_id | dic('lot_build')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.build_id" :data-source="{dic:'lot_build'}" :size="$style.size()" placeholder="请选择所属楼栋"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="floor_id" label="所属楼层" width="200">
            <template slot-scope="scope" slot="show">
                {{scope.row.floor_id | dic('lot_floor')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.floor_id" :casWatch="scope.row.build_id" :data-source="{dic:'lot_floor',rule:[{name:'build_id', opt:'=', val:scope.row.build_id}]}" :size="$style.size()" placeholder="请选择所属楼层"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="room_id" label="房间编号" width="200"/>
        <x-table-column prop="room_name" label="房间名称" width="200"/>
        <x-table-column prop="room_sort" label="排序" type="Number" width="200"/>
        <x-table-column prop="room_memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'lot_room',
    };
</script>