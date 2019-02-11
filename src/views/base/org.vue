<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"
             highlight-current
             node-key="id"
             default-expand-all
             :expand-on-click-node="false"
    ></el-tree>
</template>

<script>
    export default {
        name:'dept',
        data() {
            return {
                data: [{
                    label: '一级 1',
                    id:'1',
                    children: [{
                        label: '二级 1-1',
                        id:'11',
                        children: [{
                            label: '三级 1-1-1',
                            id:'111',
                        }]
                    }]
                }, {
                    label: '一级 2',
                    id:'2',
                    children: [{
                        label: '二级 2-1',
                        id:'21',
                        children: [{
                            label: '三级 2-1-1',
                            id:'211',
                        }]
                    }, {
                        label: '二级 2-2',
                        id:'22',
                        children: [{
                            label: '三级 2-2-1',
                            id:'221',
                        }]
                    }]
                }, {
                    label: '一级 3',
                    id:'3',
                    children: [{
                        label: '二级 3-1',
                        id:'31',
                        children: [{
                            label: '三级 3-1-1',
                            id:'311'
                        }]
                    }, {
                        label: '二级 3-2',
                        id:'32',
                        children: [{
                            label: '三级 3-2-1',
                            id:'321'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            // append(store, data) {
            //     store.append({ id: id++, label: 'testtest', children: [] }, data);
            // },

            remove(store, data) {
                store.remove(data);
            },

            // renderContent(h, { node, data, store }) {
            //     return (
            //         <span>
            //         <span>
            //         <span>{node.label}</span>
            //         </span>
            //         <span style="float: right; margin-right: 20px">
            //         <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
            //     <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
            //     </span>
            //     </span>);
            // }
        }
    };
</script>

<style scoped>

</style>