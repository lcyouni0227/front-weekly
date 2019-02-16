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
                    nameField: '一级 1',
                    id:'1',
                    children: [{
                        nameField: '二级 1-1',
                        id:'11',
                        children: [{
                            nameField: '三级 1-1-1',
                            id:'111',
                        }]
                    }]
                }, {
                    nameField: '一级 2',
                    id:'2',
                    children: [{
                        nameField: '二级 2-1',
                        id:'21',
                        children: [{
                            nameField: '三级 2-1-1',
                            id:'211',
                        }]
                    }, {
                        nameField: '二级 2-2',
                        id:'22',
                        children: [{
                            nameField: '三级 2-2-1',
                            id:'221',
                        }]
                    }]
                }, {
                    nameField: '一级 3',
                    id:'3',
                    children: [{
                        nameField: '二级 3-1',
                        id:'31',
                        children: [{
                            nameField: '三级 3-1-1',
                            id:'311'
                        }]
                    }, {
                        nameField: '二级 3-2',
                        id:'32',
                        children: [{
                            nameField: '三级 3-2-1',
                            id:'321'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    nameField: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            // append(store, data) {
            //     store.append({ id: id++, nameField: 'testtest', children: [] }, data);
            // },

            remove(store, data) {
                store.remove(data);
            },

            // renderContent(h, { node, data, store }) {
            //     return (
            //         <span>
            //         <span>
            //         <span>{node.nameField}</span>
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