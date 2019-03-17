<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
            <slot v-if="!isEdit(scope)" name="show" :row="scope.row">
                {{ scope.row[prop] }}
            </slot>
            <slot v-else name="edit" :row="scope.row">
                <el-input-number v-if="isNumber()" v-model="scope.row[prop]" v-bind="$attrs"></el-input-number>
                <el-input v-else v-model="scope.row[prop]" :size="$style.size()" v-bind="$attrs" clearable placeholder="请输入"></el-input>
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'XTableColumn',
        props: {
            edit:{Type:Boolean,default:true},   /* 是否编辑 */
            prop: {Type: String}        /* 字段名称 */
        },
        methods: {
            isNumber(){
                if(this.$attrs.type){
                    if (this.$attrs.type==='Number'){
                        return true;
                    }
                }
                return  false;
            },
            isEdit(scope){
                let v = this.$parent.$parent.editRow;
                return this.edit && (v.action === 'add' || v.action === 'edit') && v.rowNumber == scope.$index;
            }
        }
    }
</script>