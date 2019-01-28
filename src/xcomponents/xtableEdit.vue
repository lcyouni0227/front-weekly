<template>
    <el-table :data="rows">
        <el-table-column type="index" label="序" align="center"></el-table-column>
        <slot></slot>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button v-if="!$data.selected" @click="handelTableRowAdd(scope.$index)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                <el-button v-if="!$data.selected" @click="handelTableRowEdit(scope.$index)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                <el-button v-if="$data.selected && scope.$index == $data.selected.rowNumber" @click="handelTableRowSave(scope.$index)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                <el-button v-if="$data.selected && scope.$index == $data.selected.rowNumber" @click="handelTableRowCancel(scope.$index)" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                <el-button v-if="!$data.selected" @click="handelTableRowDelete(scope.$index)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    import jsonUtil from '@/utils/jsonUtil';
    export default {
        name: 'xtableEdit',
        props:['data'],
        data () {
            return {
                query:{},
                selected:null,
                rows: this.data.rows
            }
        },
        methods: {
            checkTableRowStatus(){
                if(this.selected){
                    if(jsonUtil.jsonIsEmpty(this.rows[this.selected.rowNumber])) {
                        this.$alert('还有新行未录入数据,请录入数据后才能新增加行。', '存在操作未完成的行', {
                            confirmButtonText: '确定',
                            type:'warning'
                        });
                        return false;
                    }else{
                        this.handelTableRowSave();
                    }
                }
                return true;
            },
            handelTableRowAdd(index){
                if(this.checkTableRowStatus()){
                    this.rows.splice(index+1,0,{});
                    this.selected = {action:'add', rowNumber:index+1, rowData:"{}"};
                }
            },
            handelTableRowEdit(index) {
                this.selected = {action:'edit',rowNumber: index, rowData: JSON.stringify(this.rows[index])};
                // if(this.checkTableRowStatus()){
                //     this.selected = {action:'edit',rowNumber: index, rowData: JSON.stringify(this.rows[index])};
                // }
            },
            handelTableRowSave(index) {
                let diff= jsonUtil.jsonDiff(JSON.parse(this.selected.rowData),this.rows[this.selected.rowNumber]);
                if(!jsonUtil.jsonIsEmpty(diff)) {
                    this.$confirm('数据未保存,是否保存?', '提示', {
                        confirmButtonText: '保存',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //ajax提交保存
                        let saveData={
                            module:this.data.module,
                            source:this.data.source,
                            pid:this.data.pid,
                            data:[
                                {
                                    "action": this.selected.action,
                                    "id": this.rows[index][this.data.keyField],
                                    "row": diff
                                }
                            ]
                        };

                        console.log(saveData);
                        // vue.$post();


                        this.selected = null;
                    }).catch(() => {
                        // handelTableRowDelete(scope);
                    });
                }else{
                    this.$alert('不能保存,请录入数据后再保存。', '保存', {
                        confirmButtonText: '确定',
                        type:'warning'
                    });
                }
            },
            handelTableRowCancel(index) {
                if(this.selected) {
                    if (this.selected.rowData == "{}" || jsonUtil.jsonIsEmpty(this.rows[this.selected.rowNumber])) {
                        //空行删除
                        this.rows.splice(this.selected.rowNumber, 1);
                    } else {
                        this.rows[this.selected.rowNumber] = JSON.parse(this.selected.rowData);
                    }
                    this.selected = null;
                }
            },
            handelTableRowDelete(index) {
                this.$confirm('此操作将永久删除该数据,真的要删除吗?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteData={
                        module:this.data.module,
                        source:this.data.source,
                        pid:this.pid,
                        data:[
                            {
                                "action": "del",
                                "id":this.rows[index][this.data.keyField]
                            }
                        ]
                    };
                    console.log(deleteData);
                    //ajax提交删除


                    this.rows.splice(index, 1);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        // mounted () {
        //     console.log(this.data);
        //     this.rows = this.data.rows;
        // }
    };
</script>

<style scoped>

</style>