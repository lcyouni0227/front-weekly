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
                <el-input v-model="scope.row[prop]" :size="$style.size()" placeholder="请输入"></el-input>
            </slot>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'XTableTreeColumn',
        props: {
            prop: String,
            treeKey: {type: String, default: 'id'},
            parentKey: {type: String, default: '_pid'},
            levelKey: {type: String, default: '_level'},
            childKey: {type: String, default: 'children'}
        },
        created(){
          // console.log(this.treeKey) ;
          //   console.log(this.$parent);
        },
        methods: {
            toTree(data){
                data.forEach((item)=>{//删除所有children,以防止多次调用
                    delete item.children;
                });
                let map = {};// 将数据存储为以id为 KEY的 map索引数据列
                data.forEach((item)=> {
                    map[item[this.treeKey]] = item;
                });
                let val = [];
                data.forEach((item)=> {
                    let parent = map[item[this.parentKey]]; //以当前遍历项，的parentId,去map对象中找到索引的id
                    if(parent){//如果找到索引，说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                        (parent.children || ( parent.children = [] )).push(item);
                    }else{
                        val.push(item);//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                    }
                });
                return val;
            },
            isEdit(scope){
                return this.$parent.$parent.editRow && this.$parent.$parent.editRow.rowNumber == scope.$index;
            },
            childStyles(row) {
                return {
                    'padding-left': (row[this.levelKey] > 1 ? row[this.levelKey] * 7 : 0) + 'px'
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
                return (Array.isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false;
            },
            // 切换处理
            toggleHandle(index, row) {
                if(this.hasChild(row)) {
                    let data = this.$parent.store.states.data.slice(0);
                    data[index]._expanded = !data[index]._expanded;
                    if(data[index]._expanded) {
                        data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data);
                    } else {
                        data = this.removeChildNode(data, row[this.treeKey]);
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
                    if(parentIds.indexOf(data[i][this.parentKey]) !== -1 && parentIds.indexOf(data[i][this.treeKey]) === -1) {
                        ids.push(data.splice(i, 1)[0][this.treeKey]);
                        i--;
                    }
                }
                return this.removeChildNode(data, ids);
            }
        }
    }
</script>