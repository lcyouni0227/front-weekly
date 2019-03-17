<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
            <slot v-if="!isEdit(scope)" name="show" :row="scope.row">
                {{ scope.row[prop] }}
            </slot>
            <slot v-else name="edit" :row="scope.row">
                <el-input type="text" v-model="scope.row[prop]" :size="$style.size()" clearable placeholder="请输入"></el-input>
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'XTableColumn',
        props: {
            edit:{type:Boolean,default:true},   /* 是否编辑 */
            prop: {type: String}        /* 字段名称 */
        },
        methods: {
            isEdit(scope){
                let v = this.$parent.$parent.editRow;
                return this.edit && (v.action === 'add' || v.action === 'edit') && v.rowNumber == scope.$index;
            }
        }
    }
</script>