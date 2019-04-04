<template>
    <x-splitter layout="vertical">
        <textarea slot="1" ref="code" v-bind="$attrs" class="code" v-model="code"></textarea>
        <div slot="2" style="height: 100%">
            <el-button @click="run()" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">运行</el-button>
            <el-button @click="submit()" type="warning" icon="el-icon-success" plain size="mini">确定</el-button>
            <x-panel title="执行结果" width="100%" :closeBtn="false">
                <x-table-edit ref="xtable" class="resultTab" border :load-data="false" :data="rows" :showTopButton="false" :singleSelect="false">
                    <el-table-column :prop="key" :label="key" v-for ="(val, key) in rows[0]" :key="key"></el-table-column>
                </x-table-edit>
            </x-panel>
        </div>
    </x-splitter>
</template>

<script>
    import runStatus from '../../support/run-status';
    import xcodeEdit from './xcode-edit';
    require("codemirror/addon/hint/sql-hint");
    require("codemirror/mode/sql/sql");
    export default {
        name: "XCodeEditSql",
        mixins:[xcodeEdit,runStatus],
        data(){
            return {
                mime:'text/x-mariadb',
                hintOptions:this._getDBTableField(),
                rows:[]
            }
        },
        methods: {
            _getDBTableField(){
                let hintOptions={};
                this.$axios.syncPostJson('/cache/getAllTableFieldName',{},(res) => {
                    if(res.code==1) {
                        hintOptions = res.data;
                    }});
                return hintOptions;
            },
            run(){
                let query = this.$refs.xtable.getQuery();
                // let query = {};
                // query.sql = this.getCode();
                // let data = this.$refs.xtable.getQueryData();
                // query.page = data.page;
                // query.size = data.size;
                this.$axios.postJson('/data/querySQL',query).then(res => {
                    if(res.code==1) {
                        this.rows = JSON.parse(res.data.rows);
                        this.$refs.xtable.total = res.data.total;
                        // this.$refs.xtable.setData(res.data);
                    }
                    this.endRun();
                }).catch(() => {
                    this.endRun();
                });
            },
            submit(){

            }
        }
    }
</script>
<style scoped>
    .code {
        height: 100%;
        width: 100%;
        font-size: 11pt;
        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    }
</style>
<style >
    .CodeMirror-hints{
        z-index: 100000!important;
    }
    .code + .cm-s-default{
        height: 100%!important;
    }
    .resultTab>.el-table th>.cell, .resultTab>.el-table td>.cell{
        white-space: nowrap;
    }
</style>