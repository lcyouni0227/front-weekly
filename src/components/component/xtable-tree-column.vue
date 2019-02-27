<template>
    <el-table-column :prop="prop" v-bind="$attrs">
        <template slot-scope="scope">
            <span v-if="!isEdit(scope)" @click.prevent="toggleHandle(scope.$index, scope.row)" :style="childStyles(scope.row)">
                <i :class="iconClasses(scope.row)" :style="iconStyles(scope.row)"></i>
                <slot name="show" :row="scope.row" :$index="scope.$index">
                    {{ scope.row[prop] }}
                </slot>
            </span>
            <slot v-else name="edit" :row="scope.row" :$index="scope.$index">
                <el-input v-model="scope.row[prop]" :size="$style.size()" clearable placeholder="请输入"></el-input>
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'XTableTreeColumn',
        props: {
            edit: {type: Boolean, default: true},   /* 是否编辑 */
            prop: String,   /* 字段名称 */
            parentField: {type: String, default: '_pid'},
            valueField: {type: String, default: 'id'},
            childField: {type: String, default: 'children'}
        },
        methods: {
            toTree(data){
                let map = {};// 将数据存储为以id为 KEY的 map索引数据列
                for(let v of data){
                    map[v[this.valueField]] = v;
                }
                let val = [];
                for(let v of data){
                    let parent = map[v[this.parentField]];
                    if(parent && parent[this.parentField]!=parent[this.valueField]){//如果找到索引，说明此项不在顶级当中,那么需要把此项添加到他对应的父级中
                        let lv = 2;
                        let p = parent;
                        while(map[p[this.parentField]]){
                            p=map[p[this.parentField]];
                            lv++;
                        }
                        v._level = lv;
                        (parent.children || ( parent.children = [] )).push(v);
                    }else{
                        v._level = 1;
                        val.push(v);//如果没有在map中找到对应的索引ID,那么直接把当前的item添加到val结果集中，作为顶级
                    }
                }
                // console.log(val)
                return val;
            },
            isEdit(scope){
                let v = this.$parent.$parent.editRow;
                return this.edit && (v.action === 'add' || v.action === 'edit') && v.rowNumber == scope.$index;
            },
            childStyles(row) {
                return {
                    'padding-left': (row._level > 1 ? row._level * 7 : 0) + 'px'
                }
            },
            iconClasses(row) {
                return [!row._expanded ? 'el-icon-caret-right' : 'el-icon-caret-bottom'];
            },
            iconStyles(row) {
                return {
                    'visibility': this.hasChild(row) ? 'visible' : 'hidden'
                }
            },
            hasChild(row) {
                return (Array.isArray(row[this.childField]) && row[this.childField].length >= 1) || false;
            },
            // 切换处理
            toggleHandle(index, row) {
                if(this.hasChild(row)) {
                    let data = this.$parent.store.states.data.slice(0);
                    data[index]._expanded = !data[index]._expanded;
                    if(data[index]._expanded) {
                        data = data.splice(0, index + 1).concat(row[this.childField]).concat(data);
                    } else {
                        data = this.removeChildNode(data, row[this.valueField]);
                    }
                    this.$parent.store.commit('setData', data);
                    this.$nextTick(() => {
                        this.$parent.doLayout();
                    })
                }
            },
            // 移除子节点
            removeChildNode(data, parentId) {
                let parentIds = Array.isArray(parentId) ? parentId : [parentId];
                if(parentId.length <= 0) {
                    return data;
                }
                let ids = [];
                for(let i = 0; i < data.length; i++) {
                    if(parentIds.indexOf(data[i][this.parentField]) !== -1 && parentIds.indexOf(data[i][this.valueField]) === -1) {
                        ids.push(data.splice(i, 1)[0][this.valueField]);
                        i--;
                    }
                }
                return this.removeChildNode(data, ids);
            }
        }
    }
</script>