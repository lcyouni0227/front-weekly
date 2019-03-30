<template>
    <x-table-edit :data-source="{module:'lot_rtu',orderBy:'build_id asc,room_id asc'}"
                  :dic="[{name:'lot_build', dataSource:{valueField:'build_id',labelField:'build_name',module:'lot_build'}}
                  ,{name:'lot_room', dataSource:{addField:'build_id,floor_id',valueField:'room_id',labelField:'room_name',module:'lot_room'}}]"

    >
        <x-query slot="query">
            <x-query-item>
                <x-select prop="build_id" label="所属楼栋" :data-source="{dic:'lot_build'}" placeholder="请选择所属楼栋"></x-select>
            </x-query-item>
            <x-query-item prop="room_id" opt="like" label="房间编号"/>
        </x-query>
        <x-table-column prop="build_id" label="所属楼栋" width="100">
            <template slot-scope="scope" slot="show">
                {{scope.row.build_id | dic('lot_build')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.build_id" :data-source="{dic:'lot_build'}" :size="$style.size()" placeholder="请选择所属楼栋"></x-select>
            </template>
        </x-table-column>
        <x-table-column prop="room_id" label="所属房间" width="100">
            <template slot-scope="scope" slot="show">
                {{scope.row.room_id | dic('lot_room')}}
            </template>
            <template slot-scope="scope" slot="edit">
                <x-select v-model="scope.row.room_id" :casWatch="scope.row.build_id" :data-source="{dic:'lot_room',rule:[{name:'build_id', opt:'=', val:scope.row.build_id}]}" :size="$style.size()" placeholder="请选择所属房间"></x-select>
            </template>
        </x-table-column>
        <!--<x-table-column prop="room_id" label="所属房间" width="200">-->
            <!--<template slot-scope="scope" slot="show">-->
                <!--{{scope.row.room_id | dic('lot_room')}}-->
            <!--</template>-->
            <!--<template slot-scope="scope" slot="edit">-->
                <!---->
                <!--&lt;!&ndash;<x-select-cascader v-model="scope.row.room_id" :data-source="{source:'rtu_room',parentValueField:'build_id',parentLabelField:'build_name',labelField:'room_id',valueField:'room_name'}"></x-select-cascader>&ndash;&gt;-->
                <!--&lt;!&ndash;<x-select-table v-model="scope.row.room_id" :data-source="{module:'lot_room'}"&ndash;&gt;-->
                                <!--&lt;!&ndash;:dic="[{name:'lot_build', datasource:{valueField:'build_id',labelField:'build_name',module:'lot_build'}}]"&ndash;&gt;-->
                                <!--&lt;!&ndash;dialogWidth="950" labelField="room_name" valueField="room_id">&ndash;&gt;-->
                    <!--&lt;!&ndash;<x-query slot="query">&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-query-item>&ndash;&gt;-->
                            <!--&lt;!&ndash;<x-select prop="build_id" label="所属楼栋" :data-source="{dic:'lot_build'}" placeholder="请选择所属楼栋"></x-select>&ndash;&gt;-->
                        <!--&lt;!&ndash;</x-query-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-query-item prop="room_id" label="房间编号"/>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-query-item prop="room_name" opt="like" label="房间名称"/>&ndash;&gt;-->
                    <!--&lt;!&ndash;</x-query>&ndash;&gt;-->
                    <!--&lt;!&ndash;<template>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-table-column prop="build_id" label="所属楼栋" width="200">&ndash;&gt;-->
                            <!--&lt;!&ndash;<template slot-scope="scope" slot="show">&ndash;&gt;-->
                                <!--&lt;!&ndash;{{scope.row.build_id | dic('lot_build')}}&ndash;&gt;-->
                            <!--&lt;!&ndash;</template>&ndash;&gt;-->
                        <!--&lt;!&ndash;</x-table-column>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-table-column prop="room_id" label="房间编号" width="200"/>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-table-column prop="room_name" label="房间名称" width="200"/>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-table-column prop="room_sort" label="排序" type="Number" width="100"/>&ndash;&gt;-->
                        <!--&lt;!&ndash;<x-table-column prop="room_memo" label="备注"/>&ndash;&gt;-->
                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                <!--&lt;!&ndash;</x-select-table>&ndash;&gt;-->
            <!--</template>-->
        <!--</x-table-column>-->
        <x-table-column prop="rtu_id" label="编号" width="150"/>
        <x-table-column prop="rtu_name" label="名称" width="150"/>
        <x-table-column prop="rtu_status" label="是否启用" width="100">
            <template slot-scope="scope" slot="show">
                <i :class="'iconfont icon  ' + (scope.row.rtu_status==0?'icon-stop close':'icon-start open') "/>
                {{scope.row.rtu_status==0?'未启用':'启用'}}
            </template>
            <template slot-scope="scope" slot="edit">
                <el-select v-model="scope.row.rtu_status" placeholder="请选择">
                    <el-option :key="0" :label="'未启用'" :value="0"/>
                    <el-option :key="1" :label="'启用'" :value="1"/>
                </el-select>
            </template>
        </x-table-column>
        <x-table-column prop="rtu_online" label="在线状态" width="100" :edit="false">
            <template slot-scope="scope" slot="show">
                <i :class="'iconfont icon  ' + (scope.row.rtu_online==0?'icon-online close':'icon-online open') "/>
                {{scope.row.rtu_online==0?'离线':'在线'}}
            </template>
        </x-table-column>
        <x-table-column prop="rtu_memo" label="备注"/>

        <template slot="rowButtonArea" slot-scope="scope">
            <el-button type="text" @click="openLamp(scope.row)" icon="el-icon-circle-check-outline" plain size="mini">开灯</el-button>
            <el-button type="text" @click="closeLamp(scope.row)" icon="el-icon-circle-close-outline" plain size="mini">关灯</el-button>
        </template>
    </x-table-edit>
</template>

<script>
    import "@/project/lamp/icon/iconfont.css"
    // import XSelectCascader from '../../../components/component/xselect-cascader';
    export default {
        name:'lotRtu',
        // components: {XSelectCascader},
        methods:{
            openLamp(row){
                console.log(row);
                this.$axios.postJson('/lamp/setLampOnOff',{rtu_id:row.rtu_id,lamp_id:4294967295,onOff:true}).then((res)=>{
                    console.log(res);
                }).catch(()=>{

                })
            },
            closeLamp(row){
                console.log(row);
                this.$axios.postJson('/lamp/setLampOnOff',{rtu_id:row.rtu_id,lamp_id:4294967295,onOff:false}).then((res)=>{
                    console.log(res);
                }).catch(()=>{

                })
            }
        }
    };
</script>
<style scoped>
    .open{
        color:#6ce26c;
        font-size: 22px;
        font-weight: bold;
    }
    .close{
        font-size: 20px;
        font-weight: bold;
    }
</style>