<!-- 子系统管理 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'system'}"
        >
        <template slot="queryArea">
            <el-form-item label="系统编号">
                <el-input v-model="query.sysid" :size="$style.size()" clearable placeholder="系统编号"></el-input>
            </el-form-item>
            <el-form-item label="系统名称">
                <el-input v-model="query.name" v-query="'like'" :size="$style.size()" clearable placeholder="系统名称"></el-input>
             </el-form-item>
        </template>
        <x-table-column prop="sysid" label="系统编号" width="150"/>
        <x-table-column prop="name" label="系统名称" width="200"/>
        <x-table-column prop="memo" label="备注"/>
    </x-table-edit>
</template>

<script>
    export default {
        name:'system',
        data(){
           return {
               query: {querySymbol: {}}
           }
        }
    };
</script>
