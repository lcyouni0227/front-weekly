<!-- 表格选择器 -->
<template>
    <div class="el-input-group">
        <label class="x-input-label" v-if="label">{{label}}</label>
        <el-popover ref="popover" :disabled="disabled" placement="bottom-start">
            <x-table-edit :data-source="dataSource" :dic="dic" :showTopButton="false" @row-click="choice" :max-height="dialogHeight" :style="`width:${dialogWidth}px;overflow:auto`">
                <span slot="query">
                    <slot name="query"/>
                </span>
                <slot/>
            </x-table-edit>
            <el-input ref="input" slot="reference" v-model="labelModel" :disabled="disabled" clearable :style="`width: ${width}px`" suffix-icon="el-icon-arrow-down" :placeholder="placeholder"/>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: 'XSelectTable',
        props: {
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            dic: {type: Array, default() {return null}},  /* 字典配置 */
            disabled:Boolean,   /* 禁用 */

            label:{type:String,default:''}, /* 选择框前的文本 */
            value: String, /* 接收绑定参数 */
            width: String, /* 输入框宽度 */
            dialogWidth:[String,Number], /*  弹出框宽度 */
            dialogHeight:{String,default:'500px'}, /* 弹出框高度 */
            placeholder: {type: String,default: '请选择'}
        },
        data() {
            return {
                labelModel:null
            };
        },
        methods: {
            choice(row){
                this.labelModel = row[this.$attrs.labelField];
                this.$refs.popover.showPopper = false;
                this.$emit('input',row[this.$attrs.valueField]);
                this.$parent.$parent && this.$parent.$parent.setQueryFieldValue && this.$parent.$parent.setQueryFieldValue(this.$attrs.prop,this.valueModel);
            }
        }
    };
</script>