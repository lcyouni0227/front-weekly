<!-- 树状选择器 -->
<template>
    <div class="el-input-group">
        <label class="x-input-label" >{{label}}</label>
        <el-popover
            ref="popover"
            placement="bottom-start"
            trigger="click"
            @show="onShowPopover"
            @hide="onHidePopover">
            <el-tree ref="tree" :style="`min-width:${treeWidth};min-height:${dialogHeight}`" :data="options" :props="dataField" :filter-node-method="filterNode" @node-click="onClickNode"
                :emptyText="emptyText" :renderAfterExpand="renderAfterExpand" :nodeKey="nodeKey" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll" :expandOnClickNode="expandOnClickNode" :checkOnClickNode="checkOnClickNode" :checkDescendants="checkDescendants" :autoExpandParent="autoExpandParent" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys" :currentNodeKey="currentNodeKey" :renderContent="renderContent" :showCheckbox="showCheckbox" :draggable="draggable" :allowDrag="allowDrag" :allowDrop="allowDrop" :lazy="lazy" :highlightCurrent="highlightCurrent" :load="load" :accordion="accordion" :indent="indent" :iconClass="iconClass">
            </el-tree>
            <el-input
                slot="reference"
                ref="input"
                v-model="labelModel"
                clearable
                :style="`width: ${width}px`"
                suffix-icon="el-icon-arrow-down"
                :placeholder="placeholder">
            </el-input>
        </el-popover>
    </div>
</template>

<script>
    import xtree from './support/xtree';
    export default {
        name: 'XSelectTree',
        mixins:[xtree],
        props: {
            label:{type:String,default:''},
            value: String,      /* 接收绑定参数 */
            placeholder: {type: String, required: false, default: '请选择'},   /* 输入框占位符 */
            dialogWidth:String, /*  弹出框宽度 */
            dialogHeight:{String,default:'auto'}, /* 弹出框高度 */
        },
        // 设置绑定参数
        model: {
            prop: 'value',
            event: 'selected',
        },
        watch: {
            labelModel(val) {
                if (!val) {
                    this.valueModel = '';
                }else{
                    this.$refs.tree.filter(val);
                }
            },
            value(val) {
                this.labelModel = this.queryTree(this.options, val);
            },
        },
        data() {
            return {
                valueModel: '0',    /*实际请求传值*/
            };
        },
        created() {
            // 检测输入框原有值并显示对应 label
            if (this.value) {
                this.labelModel = this.queryTree(this.options, this.value);
            }
            // 获取输入框宽度同步至树状菜单宽度
            this.$nextTick(() => {
                if(this.dialogWidth){
                    this.treeWidth = this.dialogWidth;
                }else{
                    this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`;
                }
            });
        },
        methods: {
            // 单击节点
            onClickNode(node) {
                this.labelModel = node[this.dataField.label];
                this.valueModel = node[this.dataField.valueField];
                this.onCloseTree();
            },
            // 隐藏树状菜单
            onCloseTree() {
                this.$refs.popover.showPopper = false;
            },
            // 显示时触发
            onShowPopover() {
                this.$refs.tree.filter(false);
            },
            // 隐藏时触发
            onHidePopover() {
                this.$emit('selected', this.valueModel);
                this.$parent.$parent && this.$parent.$parent.setQueryFieldValue && this.$parent.$parent.setQueryFieldValue(this.$attrs.prop,this.valueModel);
            }
        },
    };
</script>
<style scoped>
    .x-input-label{
        display:table-cell;
        vertical-align: middle;
        color: #909399;
        position: relative;
        white-space: nowrap;
    }
</style>