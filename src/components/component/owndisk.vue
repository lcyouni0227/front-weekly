<!-- 个人资料柜 -->
<template>
    <x-table-edit ref="xtableEdit" highlight-current-row stripe style="width:100%;height:100%"
                  :button="{edit:{},del:{}}"
                  :multiSelect="true" :singleSelect="false"
                  :data-source="{queryUrl:'/owndisk/query',saveUrl:'/owndisk/edit',delUrl:'/owndisk/delete',module:'owndisk'}"
    >
        <x-query slot="query">
            <x-query-item prop="name" opt="like" label="文件名"/>
        </x-query>
        <template slot="topButtonArea">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="handelMakeDir" icon="el-icon-mobile-phone" plain size="mini">新建目录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="handelDown" icon="el-icon-download" plain size="mini">下载</el-button>
                </el-form-item>
                <el-form-item>
                    <el-upload action="/owndisk/upload" :on-success="uploadSuccess" :show-file-list="false" :data="{path:this.path.join('/')}">
                        <el-button type="primary" icon="el-icon-upload2" plain size="mini">上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    当前路径:&nbsp;<span v-for="(val,index) of path" >&nbsp;/&nbsp;<a class='a' @click="comeIndex(index)" :key="index">{{val==='/'?'根目录':val}}</a></span>
                </el-form-item>
            </el-form>
        </template>
        <x-table-column prop="isFile" label="类型" :sortable="true" :edit="false" width="100">
            <template slot-scope="scope" slot="show">
                {{scope.row.isFile==='true'?'文件':'目录'}}
            </template>
        </x-table-column>
        <x-table-column prop="name" label="名称" :sortable="true" width="400">
            <template slot-scope="scope" slot="show">
                <a class="a" @click="comePath(scope.row.path)" v-if="scope.row.isFile!=='true'">{{scope.row.name}}</a>
                <span v-else>{{scope.row.name}}</span>
            </template>
        </x-table-column>
        <x-table-column prop="ext" label="扩展名" :sortable="true" :edit="false" width="100"/>
        <x-table-column prop="size" label="大小" :sortable="true" :edit="false" width="100"/>
        <x-table-column prop="createTime" label="创建时间" :sortable="true" :edit="false" width="200"/>
        <x-table-column prop="path" label="路径" :sortable="true" :edit="false"/>
    </x-table-edit>
</template>

<script>
    import {Message} from "element-ui";
    export default {
        name:'owndisk',
        data(){
            return {
                path:['/']
            }
        },
        methods: {
            comePath(path){
                this.$refs.xtableEdit.handelQuery(null,(query)=>{
                    query.path = path;
                },()=>{
                    this.path.push(path.substring(path.lastIndexOf('/')+1));
                });
            },
            comeIndex(index){
                if(index <= 0){
                    this.$refs.xtableEdit.handelQuery();
                    this.path=['/'];
                }else{
                    this.path.splice(index+1);
                    let path = this.path.join('/');
                    this.$refs.xtableEdit.handelQuery(null,(query)=>{
                        query.path = path;
                    });
                }
            },
            refresh(){
                this.$refs.xtableEdit.handelQuery(null,(query)=>{
                    query.path = this.path.join('/');
                });
            },
            handelMakeDir(){
                this.$prompt('请输入新目录名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    let path = this.path.join("/");
                    let mkdir={path:path,name:value};
                    this.$axios.postJson("/owndisk/makedir",mkdir).then((res)=>{
                        if(res.code==1){
                            Message({
                                showClose: true,
                                message: '目录创建成功。',
                                type: 'success'
                            });
                            this.refresh();
                        }
                    });
                }).catch(() => {});
            },
            afterTableRowSave(it,index){
                let path  = it.rows[index].path;
                path = path.substring(0,path.lastIndexOf("/"));
                it.rows[index].path = path+"/"+it.rows[index].name;
            },
            uploadSuccess(){
                Message({
                    showClose: true,
                    message: '上传成功。',
                    type: 'success'
                });
                this.refresh();
                // let index = -1;
                // for(let row of res.data.rows){
                //     index = this.$refs.xtableEdit.addRowData(row,index);
                // }
            },
            handelDown(){
                let rows = this.$refs.xtableEdit.getSelectRow();
                if(!rows){
                    return;
                }
                let down={};
                down.rows=[];
                if (rows instanceof Array){
                    if(rows.length>0) {
                        for (let v of rows) {
                            down.rows.push({action: 'down', id: v.path});
                        }
                        this.$axios.fileDown("/owndisk/down",down);
                    }
                }else{
                    down.rows.push({action:'down',id:rows.path});
                    this.$axios.fileDown("/owndisk/down",down);
                }
            }
        }
    };
</script>
<style scoped>
    .a{color: #42a3fb;text-decoration:underline;cursor:pointer;}
</style>