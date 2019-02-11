<template>
    <x-table-edit highlight-current-row stripe style="width:100%;height:100%"
                 :data-source="{module:'system'}"
        >
        <template slot="queryArea">
            <el-form-item label="系统编号">
                <el-input :size="$style.size()" v-model="query.sysid" placeholder="系统编号"></el-input>
            </el-form-item>
            <el-form-item label="系统名称">
                <el-input :size="$style.size()" v-query="'like'" v-model="query.name" placeholder="系统名称"></el-input>
             </el-form-item>
        </template>
        <el-table-column prop="sysid" label="系统编号" width="150">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.sysid}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.sysid" required minlength="1" maxlength="6" data-vv-name="sysid" placeholder="请输入系统编号"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="系统名称" width="200">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.name}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.name" minlength="1" maxlength="30" placeholder="请输入系统名称"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注" width="300">
            <template slot-scope="scope">
                <span v-if="$tableRowNoEdit(scope)">{{scope.row.memo}}</span>
                <el-input v-else :size="$style.size()" v-model="scope.row.memo" maxlength="100" placeholder="请输入备注"></el-input>
            </template>
        </el-table-column>
    </x-table-edit>
</template>

<script>
    export default {
        name:'role',
        data(){
            return {
                query: {querySymbol: {}}
            }
        }
    };
</script>