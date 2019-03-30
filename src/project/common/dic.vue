<!-- 菜单模板管理 -->
<template>
    <x-splitter>
        <template slot="1">
            <x-tree @node-click="onClickNode" :props="{parentField:'_pid',valueField:'_id',labelField:'name'}" :data="rows" style="margin-right:10px"/>
        </template>
        <template slot="2">
            <el-form ref="from" :model="row" label-position="right" label-width="100px" inline>
                <x-form-item>
                    <el-button v-if="hasAdd" @click="handelFormAdd($refs.from,initRow)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                    <el-button v-if="hasEdit" :disabled="!isSelect" @click="handelFormEdit($refs.from,row)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                    <el-button v-if="hasSave" @click="handelFormSave(dataSource,keyField,row,null,refresh)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                    <el-button v-if="hasCancel" @click="handelFormCancel(row)" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                    <el-button v-if="hasSee" :disabled="!isSelect" @click="handelFormDel(dataSource,keyField,row,null,refresh)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
                </x-form-item>
                <x-form-item label="分类" prop="type">
                    <x-select v-model="row.type" allow-create :disabled="!hasSave" :dataSource="{module:'dic',valueField:'type',labelField:'name',rule:[{name:'_pid',opt:'=',val:'0'}]}"/>
                </x-form-item>
                <x-form-item label="上级" prop="_pid">
                    <x-select-tree v-model="row._pid" :disabled="!hasSave" :excludeVal="[isAdd?'':row._id]" :dataSource="{addData:[{_pid:'0',id:'0',name:'无'}],parentField:'_pid',valueField:'_id',labelField:'name',rule:{name:'type',opt:'=',val:row.type},module:'dic'}"/>
                </x-form-item>
                <x-form-item label="编号" prop="code">
                    <x-input v-model="row.code" :disabled="!hasSave"/>
                </x-form-item>
                <x-form-item label="名称" prop="name">
                    <x-input v-model="row.name" :disabled="!hasSave"/>
                </x-form-item>
            </el-form>
        </template>
    </x-splitter>
</template>

<script>
    import dataSource from '../../components/component/support/data-source'
    export default {
        name:'dic',
        mixins:[dataSource],
        data(){
            return {
                checkPvButtons:true,    /* 需要对按钮权限进行检测 */
                dataSource:{addField:'*',module:'dic'},
                rows:[],  /* 所有数据 */
                initRow:{_pid:0}, /* 新增时的初化值 */
                row:{}, /* 当前选中行值,改变该值不影响真实值 */
                keyField:'',    /* 主键字段 */
            }
        },
        created(){
            this.getDicMuliData();
        },
        methods: {
            onClickNode(data) {
                delete data.children;
                this.row = JSON.parse(JSON.stringify(data));
                this.handelSelect();
            },
            getDicMuliData(){
                this.getQueryMuliData(this.dataSource,null,null,null,(res)=>{
                    if(res.code == 1){
                        this.keyField = res.data.keyField;
                        this.rows = res.data.rows;
                    }
                });
            },
            refresh(res){
                if(res.code == 1) {
                    this.getDicMuliData();
                }
            }
        }
    };
</script>
<style>
    .toolbar{
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>