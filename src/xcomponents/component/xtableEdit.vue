<template>
    <section>
        <el-row v-if="showQuery" >
            <el-form :inline="true">
                <slot name="query"></slot>
                <el-form-item>
                    <el-button @keyup.enter="handelTableQuery()" @click="handelTableQuery()" size="mini" type="primary" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-table :data="rows" :size="size" :width="width" :height="height" :maxHeight="maxHeight" :fit="fit" :stripe="stripe" :border="border" :rowKey="rowKey" :context="context" :showHeader="showHeader" :showSummary="showSummary" :sumText="sumText" :summaryMethod="summaryMethod" :rowClassName="rowClassName" :rowStyle="rowStyle" :cellClassName="cellClassName" :cellStyle="cellStyle" :headerRowClassName="headerRowClassName" :headerRowStyle="headerRowStyle" :headerCellClassName="headerCellClassName" :headerCellStyle="headerCellStyle" :highlightCurrentRow="highlightCurrentRow" :currentRowKey="currentRowKey" :emptyText="emptyText" :expandRowKeys="expandRowKeys" :defaultExpandAll="defaultExpandAll" :defaultSort="defaultSort" :tooltipEffect="tooltipEffect" :spanMethod="spanMethod" :selectOnIndeterminate="selectOnIndeterminate">
                <el-table-column type="index" label="序" align="center"></el-table-column>
                <slot></slot>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="!$data.selected" @click="handelTableRowAdd(scope.$index)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                        <el-button v-if="!$data.selected" @click="handelTableRowEdit(scope.$index)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                        <el-button v-if="$data.selected && scope.$index == $data.selected.rowNumber" @click="handelTableRowSave(scope.$index)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                        <el-button v-if="$data.selected && scope.$index == $data.selected.rowNumber" @click="handelTableRowCancel(scope.$index)" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                        <el-button v-if="!$data.selected" @click="handelTableRowDelete(scope.$index)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="text-align:center" v-if="showPagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :layout="pagerLayout" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :pageCount="pageCount" :small="small" :popperClass="popperClass" :prevText="prevText" :nextText="nextText" :background="background" :disabled="disabled"></el-pagination>
        </el-row>
    </section>
</template>

<script>
    import jsonUtil from '@/utils/jsonUtil';
    export default {
        name: 'xtableEdit',
        props: {
            showQuery:{type: Boolean, default: false},
            dataSource:{type: Object, default: () => {}},
            showPagination: {type: Boolean, default: true},

            size: String,
            width: [String, Number],
            height: [String, Number],
            maxHeight: [String, Number],
            fit: {type: Boolean, default: true},
            stripe: Boolean,
            border: Boolean,
            rowKey: [String, Function],
            context: {},
            showHeader: {type: Boolean, default: true},
            showSummary: Boolean,
            sumText: String,
            summaryMethod: Function,
            rowClassName: [String, Function],
            rowStyle: [Object, Function],
            cellClassName: [String, Function],
            cellStyle: [Object, Function],
            headerRowClassName: [String, Function],
            headerRowStyle: [Object, Function],
            headerCellClassName: [String, Function],
            headerCellStyle: [Object, Function],
            highlightCurrentRow: Boolean,
            currentRowKey: [String, Number],
            emptyText: String,
            expandRowKeys: Array,
            defaultExpandAll: Boolean,
            defaultSort: Object,
            tooltipEffect: String,
            spanMethod: Function,
            selectOnIndeterminate: {type: Boolean, default: true},

            pagerLayout: {type: String, default: 'prev,pager,next,total,sizes,jumper'},
            pageSize: {type: Number, default: 10},
            pageSizes: {type: Array, default: () => [10, 25, 50, 100]},
            currentPage:{type: Number, default: 1},
            pageCount: Number,
            small: Boolean,
            popperClass: String,
            prevText: String,
            nextText: String,
            background: Boolean,
            disabled: Boolean
        },
        data(){
            return {
                selected:null,
                keyField:'',
                total:0,
                rows:[],
                pageSizeX:this.pageSize,
                currentPageX: this.currentPage
            }
        },
        methods: {
            handelTableQuery(){
                let query={};
                if(this.dataSource.source){
                    query.source = this.dataSource.source;
                }else{
                    if(this.dataSource.module){
                        query.module = this.dataSource.module;
                    }
                }
                query.page = this.currentPageX;
                query.size = this.pageSizeX;
                if(this.showQuery && this.$parent.query){
                    let rule=[];
                    for(let key in this.$parent.query){
                        if(key != "querySymbol" && this.$parent.query[key] !='') {
                            let item = {};
                            item.name = key;
                            item.val = this.$parent.query[key];
                            if (this.$parent.query.querySymbol['query.' + key]) {
                                item.opt = this.$parent.query.querySymbol['query.' + key];
                            } else {
                                item.opt = '=';
                            }
                            rule.push(item);
                        }
                    }
                    if(rule.length>0){
                        query.filter = {'out':'and','in':'and','rule':rule};
                    }
                }
                // console.log(query);
                this.$axios.postJson(this.dataSource.queryUrl || '/data/query',query).then(res => {
                    this.total = res.data.total;
                    this.keyField = res.data.keyField;
                    this.rows = res.data.rows;
                }).catch(() => {

                });
            },
            // checkTableRowStatus(){
            //     if(this.selected){
            //         if(jsonUtil.jsonIsEmpty(this.rows[this.selected.rowNumber])) {
            //             this.$alert('还有新行未录入数据,请录入数据后才能新增加行。', '存在操作未完成的行', {
            //                 confirmButtonText: '确定',
            //                 type:'warning'
            //             });
            //             return false;
            //         }else{
            //             this.handelTableRowSave();
            //         }
            //     }
            //     return true;
            // },
            handelTableRowAdd(index){
                // if(this.checkTableRowStatus()){
                    this.rows.splice(index+1,0,{});
                    this.selected = {action:'add', rowNumber:index+1, rowData:"{}"};
                // }
            },
            handelTableRowEdit(index) {
                // if(this.checkTableRowStatus()){
                    this.selected = {action:'edit',rowNumber: index, rowData: JSON.stringify(this.rows[index])};
                // }
            },
            handelTableRowSave(index) {
                if(this.selected.action=='edit' && !this.rows[index][this.keyField]){
                    this.$message({
                        showClose: true,
                        message: '请数据输入完整后才能保存。',
                        type: 'error'
                    });
                    return;
                }
                let oldRow = JSON.parse(this.selected.rowData);
                let diff= jsonUtil.jsonDiff(oldRow,this.rows[this.selected.rowNumber]);
                if(!jsonUtil.jsonIsEmpty(diff)) {
                    this.$confirm('数据未保存,是否保存?', '提示', {
                        confirmButtonText: '保存',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let saveData={
                            module:this.dataSource.module,
                            source:this.dataSource.source,
                            pid:this.pid,
                            data:[
                                {
                                    "action": this.selected.action,
                                    "id": oldRow[this.keyField],
                                    "row": diff
                                }
                            ]
                        };
                        this.$axios.postJson(this.dataSource.saveUrl || '/data/save',saveData,true,true).then(() => {
                            if(this.selected.action=='add'){
                                this.total ++;
                            }
                            this.selected = null;
                        }).catch(() => {
                            // this.rows[index] = JSON.parse(this.selected.rowData);
                        });
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
                    if (this.selected.rowData == "{}" || jsonUtil.jsonIsEmpty(this.rows[index])) {
                        //空行删除
                        this.rows.splice(index, 1);
                    } else {
                        this.rows[index] = JSON.parse(this.selected.rowData);
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
                        module:this.dataSource.module,
                        source:this.dataSource.source,
                        pid:this.pid,
                        data:[
                            {
                                "action": "del",
                                "id":this.rows[index][this.keyField]
                            }
                        ]
                    };
                    this.$axios.postJson(this.dataSource.deleteUrl || '/data/save',deleteData,true,true).then(() => {
                        this.rows.splice(index, 1);
                        this.total = this.total - 1;
                    }).catch(() => {

                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            handleSizeChange(val) {
                this.pageSizeX = val;
                this.handelTableQuery();
            },
            handleCurrentChange(val) {
                this.currentPageX = val;
                this.handelTableQuery();
            }
        },
        mounted() {
            this.handelTableQuery();
        }
    };
</script>