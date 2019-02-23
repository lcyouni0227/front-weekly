<template>
    <section>
        <el-form :inline="true">
            <el-form-item>
                <el-button @click="test" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">测试</el-button>
                <el-button @click="submit()" type="warning" icon="el-icon-success" plain size="mini">确定</el-button>
                <el-button @click="cancel()" type="success" icon="el-icon-error" plain size="mini">取消</el-button>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item>
                <textarea ref="code" class="code" v-model="code"></textarea>
            </el-form-item>
        </el-form>
        <el-form>
            <el-form-item>
                <el-tabs >
                    <el-tab-pane label="执行结果">

                    </el-tab-pane>
                </el-tabs>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import xcodeEdit from './support/xcode-edit';
    require("codemirror/addon/hint/sql-hint");
    require("codemirror/mode/sql/sql");
    export default {
        name: "XCodeEditSql",
        mixins:[xcodeEdit],
        data(){
            return {
                mime:'text/x-mariadb',
                hintOptions:this._getDBTableField()
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
            test(){

            },
            submit(){

            },
            cancel(){

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
</style>