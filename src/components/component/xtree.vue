<template>
    <section>
        <el-input v-model="labelModel" :size="$style.size()" @keyup.enter.native="search" clearable class="input-with-select" style="width:100%">
            <el-button slot="append" icon="el-icon-search" @click.native="search"></el-button>
        </el-input>
        <el-tree ref="tree" :data="rows" v-bind="$attrs" :props="dataField" :filter-node-method="filterNode" style="width:100%;height:100%"
                 :emptyText="emptyText" :renderAfterExpand="renderAfterExpand" :nodeKey="nodeKey" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll" :expandOnClickNode="expandOnClickNode" :checkOnClickNode="checkOnClickNode" :checkDescendants="checkDescendants" :autoExpandParent="autoExpandParent" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys" :currentNodeKey="currentNodeKey" :renderContent="renderContent" :showCheckbox="showCheckbox" :draggable="draggable" :allowDrag="allowDrag" :allowDrop="allowDrop" :lazy="lazy" :highlightCurrent="highlightCurrent" :load="load" :accordion="accordion" :indent="indent" :iconClass="iconClass"
                 @node-click="onClickNode" @node-contextmenu="nodeContextmenu" @check-change="checkChange" @check="check" @current-change="currentChange" @node-expand="nodeExpand" @node-collapse="nodeCollapse" @node-drag-start="nodeDragStart" @node-drag-enter="nodeDragEnter" @node-drag-leave="nodeDragLeave" @node-drag-over="nodeDragOver" @node-drag-end="nodeDragEnd" @node-drop="nodeDrop">
        </el-tree>
    </section>
</template>
<script>
    import xtree from './support/xtree';
    export default {
        name: 'XTree',
        mixins:[xtree]
    };
</script>