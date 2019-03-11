<template>
    <x-splitter>
        <template slot="left">
            <x-tree @node-click="onClickNode" :dataSource="{parentField:'_pid',valueField:'muid',labelField:'name',module:'menu_base'}"></x-tree>
        </template>
        <template slot="right">
            <el-form>
                <el-form-item>
                    <!--<el-button @click="handelQuery()" type="success" icon="el-icon-refresh" plain size="mini">刷新</el-button>-->
                    <el-button  type="primary" icon="el-icon-circle-plus-outline" plain size="mini">新增</el-button>
                    <el-button  type="warning" icon="el-icon-edit" plain size="mini">修改</el-button>
                    <el-button  type="warning" icon="el-icon-success" plain size="mini">保存</el-button>
                    <el-button  type="success" icon="el-icon-error" plain size="mini">取消</el-button>
                    <el-button  type="danger" icon="el-icon-circle-close-outline" plain size="mini">删除</el-button>
                </el-form-item>
            </el-form>
            <!--<el-form :inline="true" :labelPosition="right" label-width="100px" style="flex-wrap:wrap; justify-content:center; display: flex; margin-top: 40px;" >-->

            <!--</el-form>-->
        </template>
    </x-splitter>
</template>

<script>

    export default {
        name:'dept',
        data(){
            return {
                form:{},
                dept:{

                }
            }
        },
        methods: {
            onClickNode(data,node,tree) {
                console.log(data,node,tree)
            },

        }
    };
</script>
