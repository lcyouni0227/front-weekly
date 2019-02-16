<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
            <slot v-if="!isEdit(scope)" name="show" :row="scope.row" :$index="scope.$index">
                {{ scope.row[prop] }}
            </slot>
            <slot v-else name="edit" :row="scope.row" :$index="scope.$index">
                <el-input v-model="scope.row[prop]" :size="$style.size()" placeholder="请输入"></el-input>
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'XTableColumn',
        props: {
            prop: {
                type: String
            }
        },
        methods: {
            isEdit(scope){
                let v = this.$parent.$parent.editRow;
                return (v.action === 'add' || v.action === 'edit') && v.rowNumber == scope.$index;
                // return this.$parent.$parent.editRow && this.$parent.$parent.editRow.key == scope.row[this.$parent.$parent.keyField];
            }
        }
    }
</script>