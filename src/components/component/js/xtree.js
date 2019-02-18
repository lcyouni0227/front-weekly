import treeUtil from '../../../utils/treeUtil';
import comUtil from '../../../utils/comUtil';
export default {
    props: {
        dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
        width: String,      /* 输入框宽度 */
        Height: String,
        data: {type: Array,default(){return null}},     /* 选项数据 */

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
            options:this.data,  /* 选项数据 */
            treeWidth: 'auto',  /* 菜单宽度 */
            labelModel: '', /* 输入框显示值 */
            valueModel: '0',    /*实际请求传值*/
        };
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
                let data = comUtil.cloneSimpleJsonArray(this.data);
                this.options = this.cleanChildren(treeUtil.buildTree(data, this.dataField.parentField, this.dataField.valueField));
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
                    let data = comUtil.cloneSimpleJsonArray(v.data);
                    this.options = this.cleanChildren(treeUtil.buildTree(data, this.dataField.parentField, this.dataField.valueField));
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
                    let query = comUtil.getDataSource(this.dataSource);
                    query.fields = this.dataField.parentField + ',' + this.dataField.valueField + ',' + this.dataField.label;
                    // console.log(query);
                    this.$axios.syncPostJson(this.dataSource.queryUrl || '/data/query', query, (res) => {
                        if (res.code == 1) {
                            this.options = this.cleanChildren(treeUtil.buildTree(res.data.rows, this.dataField.parentField, this.dataField.valueField));
                        }
                    });
                }
            }
        },
        search(){
            this.$refs.tree.filter(this.labelModel);
        },
        // 单击节点
        onClickNode(data,node,tree) {
            this.labelModel = data[this.dataField.label];
            this.valueModel = data[this.dataField.valueField];
            this.$emit('input', this.valueModel);
            this.$emit('node-click', data,node,tree);
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
        checkChange(data, checked, indeterminate){
            this.$emit('check-change',data, checked, indeterminate);
        },
        currentChange(data,node){
            this.$emit('current-change',data,node);
        },
        nodeContextmenu(event, data, node, tree){
            this.$emit('node-contextmenu',event, data, node, tree);
        },
        nodeCollapse(data, node, tree){
            this.$emit('node-collapse',data, node, tree);
        },
        nodeExpand(data, node, tree){
            this.$emit('node-expand', data, node, tree);
        }
    }
};