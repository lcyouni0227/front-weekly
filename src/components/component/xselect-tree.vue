<!-- 树状选择器 -->
<template>
    <el-popover
        ref="popover"
        placement="bottom-start"
        trigger="click"
        @show="onShowPopover"
        @hide="onHidePopover">
        <el-tree
            ref="tree"
            class="select-tree"
            highlight-current
            :style="`min-width:${treeWidth};min-height:${dialogHeight}`"
            :data="options"
            :props="dataField"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :default-expand-all="false"
            @node-click="onClickNode">
        </el-tree>
        <el-input
            slot="reference"
            ref="input"
            v-model="labelModel"
            clearable
            :style="`width: ${width}px`"
            :class="{'rotate':showStatus}"
            suffix-icon="el-icon-arrow-down"
            :placeholder="placeholder">
        </el-input>
    </el-popover>
</template>

<script>
    import treeUtil from '../../utils/treeUtil';
    import comUtil from '../../utils/comUtil';
    export default {
        name: 'XSelectTree',
        props: {
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            value: String,      /* 接收绑定参数 */
            width: String,      /* 输入框宽度 */
            data: {type: Array,default(){return null}},     /* 选项数据 */
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
                dataField:{parentField: '_pid',valueField: 'id',label: 'name',children: 'children'},
                options:this.data,  /* 选项数据 */
                showStatus: false,  /* 树状菜单显示状态 */
                treeWidth: 'auto',  /* 菜单宽度 */
                labelModel: '', /* 输入框显示值 */
                valueModel: '0',    /*实际请求传值*/
            };
        },
        created() {
            if(!this.dataSource.children){
                this.dataField.children = 'children';
            }
            if(this.dataSource.dic){
                let v = this.$global.dic[this.dataSource.dic];
                if(v.parentField){
                    this.dataField.parentField = v.parentField;
                }
                if(v.valueField){
                    this.dataField.valueField = v.valueField;
                }
                if(v.labelField){
                    this.dataField.label = v.labelField;
                }
                let data = [];
                for(let item of v.data){
                    let temp = {};
                    for(let key in item){
                        temp[key] = item[key];
                    }
                    data.push(temp);
                }
                this.options = this.cleanChildren(treeUtil.buildTree(data, this.dataField.parentField, this.dataField.valueField));
            }else{
                if(this.dataSource.parentField){
                    this.dataField.parentField = this.dataSource.parentField;
                }
                if(this.dataSource.valueField){
                    this.dataField.valueField = this.dataSource.valueField;
                }
                if(this.dataSource.labelField){
                    this.dataField.label = this.dataSource.labelField;
                }
                let query = comUtil.getDataSource(this.dataSource);
                query.fields = this.dataField.parentField + ',' + this.dataField.valueField + ',' + this.dataField.label;
                // console.log(query);
                this.$axios.syncPostJson(this.dataSource.queryUrl || '/data/query',query,(res) => {
                    if (res.code == 1) {
                        this.options = this.cleanChildren(treeUtil.buildTree(res.data.rows, this.dataField.parentField,this.dataField.valueField));
                        // console.log(this.options)
                    }
                });
            }

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
                this.showStatus = true;
                this.$refs.tree.filter(false);
            },
            // 隐藏时触发
            onHidePopover() {
                this.showStatus = false;
                this.$emit('selected', this.valueModel);
            },
            // 树节点过滤方法
            filterNode(query, data) {
                if (!query) return true;
                return data[this.dataField.label].indexOf(query) !== -1;
            },
            // 搜索树状数据中的 ID
            queryTree(tree, id) {
                let ret = treeUtil.findTree(tree,this.dataField.valueField,id);
                return (ret.node)?ret.node[this.dataField.label]:'';
            },
            // 清除空 children项
            cleanChildren(data) {
                const fa = (list) => {
                    list.map((e) => {
                        if (e.children) {
                            fa(e.children);
                        } else {
                            delete e.children;
                        }
                        return e;
                    });
                    return list;
                };
                return fa(data);
            },
        },
    };
</script>