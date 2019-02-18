<template>
    <section>
        <el-input v-model="labelModel" :size="$style.size()" @keyup.enter.native="search" clearable class="input-with-select" style="width:100%">
            <el-button slot="append" icon="el-icon-search" @click.native="search"></el-button>
        </el-input>
        <el-tree ref="tree" style="width:100%;height:100%" :data="options" :props="dataField" :filter-node-method="filterNode"
                 :emptyText="emptyText" :renderAfterExpand="renderAfterExpand" :nodeKey="nodeKey" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll" :expandOnClickNode="expandOnClickNode" :checkOnClickNode="checkOnClickNode" :checkDescendants="checkDescendants" :autoExpandParent="autoExpandParent" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys" :currentNodeKey="currentNodeKey" :renderContent="renderContent" :showCheckbox="showCheckbox" :draggable="draggable" :allowDrag="allowDrag" :allowDrop="allowDrop" :lazy="lazy" :highlightCurrent="highlightCurrent" :load="load" :accordion="accordion" :indent="indent" :iconClass="iconClass"
                 @node-click="onClickNode" @check-change="checkChange" @current-change="currentChange"
                 @node-contextmenu="nodeContextmenu" @node-collapse="nodeCollapse" @node-expand="nodeExpand"
        >
        </el-tree>
    </section>
</template>
<script>
    import xtree from './js/xtree';
    export default {
        name: 'XTree',
        mixins:[xtree]
    };
</script>