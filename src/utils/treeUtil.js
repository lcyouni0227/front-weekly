import jsonUtil from './jsonUtil';
/**
 * 将一维的扁平数组转换为多层级对象
 * @param listData
 * @param parentField:父字段名称
 * @param valueField:子字段名称
 * @param parentValue:父字段值,如果有值则代表只建立顶层为该值的树
 * @param excludeVal:不能选择的项数组,会在该项下加disabled字段并设置为true
 * @returns :返回建立的树对象
 */
function buildTree(listData, parentField = '_pid', valueField = 'id', parentValue) {
    const fa = (parentId) => {
        if(parentValue != null){
            const temp = [];
            for(let v of listData){
                if (v[parentField] === parentId) {
                    v.children = fa(v[valueField]);
                    temp.push(v);
                }
            }
            return temp;
        }else{
            let map = {};// 将数据存储为以id为 KEY的 map索引数据列
            for(let v of listData){
                map[v[valueField]] = v;
            }
            let val = [];
            for(let v of listData){
                let parent = map[v[parentField]];
                if(parent && parent[parentField]!=parent[valueField]){//如果找到索引，说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                    (parent.children || ( parent.children = [] )).push(v);
                }else{
                    val.push(v);//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                }
            }
            return val;
        }
    };
    return fa(parentValue);
}

/**
 * 在树中查找指定字段和指定值的节点和所在的当前上层树
 * @param tree
 * @param valueField
 * @param value
 * @returns {{node: 当前节点, tree: 当前节点所在的树, index: 当前节点在当前层的索引}}
 */
function findTree(tree, valueField = 'id', value = null){
    let ret = {node:null,index:null,tree:null};
    const deepSearch = (tree) => {
        if(tree && tree.length) {
            for (let i = 0; i < tree.length; i++) {
                let v = tree[i];
                if (value != null) {
                    //值比较
                    if (value === v[valueField]) {
                        ret.node = v;
                        ret.index = i;
                        ret.tree = tree;
                        break;
                    }
                } else {
                    //对象比较
                    if (jsonUtil.isEquals(valueField, v)) {
                        ret.node = v;
                        ret.index = i;
                        ret.tree = tree;
                        break;
                    }
                }
                if (v.children && v.children.length > 0) {
                    deepSearch(v.children);
                }
            }
        }
    };
    deepSearch(tree);
    return ret;
}

/**
 * 删除树节点
 * @param tree
 * @param valueField:可以是字段或者节点对象,否则第三个参数value必须有值
 * @param value:当valueField为节点对象时,为空否则必须录入该字段的值
 */
function deleteTreeNode(tree, valueField = 'id', value = null) {
    const deepSearch = (tree) => {
        let index = null;
        for(let i=0;i<tree.length;i++){
            let v = tree[i];
            if(value != null){
                //值比较
                if(value === v[valueField]) {
                    index = i;
                    break;
                }
            }else{
                //对象比较
                if(jsonUtil.isEquals(valueField,v)){
                    index = i;
                    break;
                }
            }
            if(v.children && v.children.length>0) {
                deepSearch(v.children);
            }
        }
        if(index != null){
            tree.splice(index, 1);
        }
    };
    deepSearch(tree);
}

/**
 *  替换树节点
 * @param tree
 * @param newNode
 * @param valueField
 * @param value
 */
function replaceTreeNode(tree, newNode, valueField = 'id', value = null) {
    const deepSearch = (tree) => {
        for(let i=0;i<tree.length;i++){
            let v = tree[i];
            if(value != null){
                //值比较
                if(value === v[valueField]) {
                    tree[i] = newNode;
                    break;
                }
            }else{
                //对象比较
                if(jsonUtil.isEquals(valueField,v)){
                    // v = newNode;
                    tree[i] = newNode;
                    break;
                }
            }
            if(v.children && v.children.length>0) {
                deepSearch(v.children);
            }
        }
    };
    deepSearch(tree);
}

export default {
    buildTree,
    findTree,
    deleteTreeNode,
    replaceTreeNode
}