import treeUtil from '../../../utils/treeUtil';
import dataSource from './data-source';
export default {
    mixins:[dataSource],
    props: {
        width: String,      /* 输入框宽度 */
        Height: String,
        casWatch:String,    /* 设置当这个值改变时需重新加载数据 */
        data: {type: Array,default(){return null}},     /* 外部传入数据 */
        dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
        value: String,      /* 接收绑定参数 */
        initValue:[String,Number],  /* 初始化值 */
        excludeVal:Array,   /* 要排除(不能选)的选项值 */

        emptyText:String,
        renderAfterExpand: {type: Boolean, default: true},
        nodeKey: String,
        checkStrictly: Boolean,
        defaultExpandAll: {type: Boolean, default: false},
        expandOnClickNode: {type: Boolean, default: false},
        checkOnClickNode: Boolean,
        checkDescendants: {type: Boolean, default: false},
        autoExpandParent: {type: Boolean, default: true},
        defaultCheckedKeys: Array,
        defaultExpandedKeys: Array,
        currentNodeKey: [String, Number],
        renderContent: Function,
        showCheckbox: {type: Boolean, default: false},
        draggable: {type: Boolean, default: false},
        allowDrag: Function,
        allowDrop: Function,
        props: {default() {return null;}},
        lazy: {type: Boolean, default: false},
        highlightCurrent: {type: Boolean, default: true},
        load: Function,
        // filterNodeMethod:Function,
        accordion: Boolean,
        indent: {type: Number, default: 18},
        iconClass: String
    },
    data() {
        return {
            dataField:{parentField: '_pid',valueField: 'id',label: 'name',children: 'children',disabled: 'disabled'},
            rows:this.data,  /* 选项数据 */
            treeWidth: 'auto',  /* 菜单宽度 */
            labelModel: '', /* 输入框显示值 */
            valueModel: this.initValue || '0',    /*实际请求传值*/
        };
    },
    watch:{
        //判断下拉框的值是否有改变
        data(newVal,oldVal) {
            if(!this.$lodash.isEqual(newVal,oldVal)) {
                this._initTreeData();
            }
        },
        casWatch(newVal, oldVal){
            if(newVal != oldVal) {
                this._initTreeData();
            }
        },
        dataSource(newVal,oldVal){
            if(!this.$lodash.isEqual(newVal,oldVal)){
                this._initTreeData();
            }
        }
    },
    created() {
        this._initTreeData();
    },
    methods: {
        _initTreeData(){
            if(this.data){
                if(this.props){
                    for(let key in this.props){
                        this.dataField[key] = this.props[key];
                    }
                }
                let data = JSON.parse(JSON.stringify(this.data));
                if(this.dataSource.addData){
                    data = data.concat(this.dataSource.addData);
                }
                this.rows = this.cleanChildren(treeUtil.buildTree(data, this.dataField.parentField, this.dataField.valueField));
            }else {
                if (!this.dataSource.children) {
                    this.dataField.children = 'children';
                }
                if (this.dataSource.dic) {
                    let v = this.$global.dic[this.dataSource.dic];
                    if (v.parentField) {
                        this.dataField.parentField = v.parentField;
                    }
                    if (v.valueField) {
                        this.dataField.valueField = v.valueField;
                    }
                    if (v.labelField) {
                        this.dataField.label = v.labelField;
                    }
                    let data = JSON.parse(JSON.stringify(v.data));
                    if(this.dataSource.addData){
                        data = data.concat(this.dataSource.addData);
                    }
                    this.rows = this.cleanChildren(treeUtil.buildTree(data, this.dataField.parentField, this.dataField.valueField));
                } else {
                    if (this.dataSource.parentField) {
                        this.dataField.parentField = this.dataSource.parentField;
                    }
                    if (this.dataSource.valueField) {
                        this.dataField.valueField = this.dataSource.valueField;
                    }
                    if (this.dataSource.labelField) {
                        this.dataField.label = this.dataSource.labelField;
                    }
                    let query = this.getQuery(this.dataSource);
                    // console.log(query);
                    this.$axios.syncPostJson(this.dataSource.queryUrl || '/data/query', query, (res) => {
                        if (res.code == 1) {
                            if(this.dataSource.addData){
                                if(this.dataSource.addData instanceof Array) {
                                    for (let v of this.dataSource.addData) {
                                        res.data.rows.push(v);
                                    }
                                }else{
                                    res.data.rows.push(this.dataSource.addData);
                                }
                            }
                            this.rows = this.cleanChildren(treeUtil.buildTree(res.data.rows, this.dataField.parentField, this.dataField.valueField));
                        }
                    },false);
                }
            }
        },
        search(){
            this.$refs.tree.filter(this.labelModel);
        },
        // 单击节点
        onClickNode(data,node,tree) {
            if(this.excludeVal){
                if(this.excludeVal.indexOf(node[this.dataField.valueField]) != -1){
                    this.$message({
                        type: 'error',
                        message: '不能选择改选项。'
                    });
                    return;
                }
            }
            this.labelModel = data[this.dataField.label];
            this.valueModel = data[this.dataField.valueField];
            this.$emit('input', this.valueModel);
            this.$emit('node-click', data,node,tree);
        },
        // 树节点过滤方法
        filterNode(value, data) {
            if (!value) return true;
            return data[this.dataField.label] && data[this.dataField.label].indexOf(value) !== -1;
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

        checkChange(data, checked, indeterminate){
            this.$emit('check-change',data, checked, indeterminate);
        },
        check(v1,v2){
            this.$emit('check',v1,v2);
        },
        currentChange(data,node){
            this.$emit('current-change',data,node);
        },
        nodeExpand(data, node, tree){
            this.$emit('node-expand', data, node, tree);
        },
        nodeContextmenu(event, data, node, tree){
            this.$emit('node-contextmenu',event, data, node, tree);
        },
        nodeCollapse(data, node, tree){
            this.$emit('node-collapse',data, node, tree);
        },
        nodeDragStart(node,event){
            this.$emit('node-drag-start',node,event);
        },
        nodeDragEnter(node,node1,event){
            this.$emit('node-drag-enter',node,node1,event);
        },
        nodeDragLeave(node,node1,event){
            this.$emit('node-drag-leave',node,node1,event);
        },
        nodeDragOver(node,node1,event){
            this.$emit('node-drag-over',node,node1,event);
        },
        nodeDragEnd(node,node1,postion,event){
            this.$emit('node-drag-end',node,node1,postion,event);
        },
        nodeDrop(node,node1,postion,event){
            this.$emit('node-drop',node,node1,postion,event);
        }
    }
};