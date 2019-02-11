<template>
    <section>
        <el-form :inline="true" v-if="showQuery">
            <slot name="queryArea"></slot>
            <el-form-item>
                <el-button @keyup.enter.native="handelTableQuery()" @click="handelTableQuery()" size="mini" type="primary" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" v-if="showTopButtonArea || showTopButton">
            <el-form-item v-if="showTopButton">
                <!--<el-button @click="handelTableQuery()" type="success" icon="el-icon-refresh" plain size="mini">刷新</el-button>-->
                <el-button v-if="hasButton('add') && !$data.editRow" @click="handelTableRowAdd(null)" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">新增</el-button>
                <el-button v-if="hasButton('edit') && !this.editRow" :disabled="isEditDisabled" @click="handelTableRowEdit(null)" type="warning" icon="el-icon-edit" plain size="mini">修改</el-button>
                <el-button v-if="$data.editRow" @click="handelTableRowSave(null)" type="warning" icon="el-icon-success" plain size="mini">保存</el-button>
                <el-button v-if="$data.editRow" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain size="mini">取消</el-button>
                <el-button v-if="hasButton('del') && !$data.editRow" @click="handelTableRowDelete(null)" type="danger" icon="el-icon-circle-close-outline" plain size="mini">删除</el-button>
            </el-form-item>
            <el-form-item>
                <slot name = "buttonArea"></slot>
            </el-form-item>
        </el-form>
        <el-table ref="table" style="border-top:1px solid #ebeef5;" @row-click="handleClickRow" @selection-change="handleSelectionChange" :data="rows" :size="size" :width="width" :height="height" :maxHeight="maxHeight" :fit="fit" :stripe="stripe" :border="border" :rowKey="rowKey" :context="context" :showHeader="showHeader" :showSummary="showSummary" :sumText="sumText" :summaryMethod="summaryMethod" :rowClassName="rowClassName" :rowStyle="rowStyle" :cellClassName="cellClassName" :cellStyle="cellStyle" :headerRowClassName="headerRowClassName" :headerRowStyle="headerRowStyle" :headerCellClassName="headerCellClassName" :headerCellStyle="headerCellStyle" :highlightCurrentRow="highlightCurrentRow" :currentRowKey="currentRowKey" :emptyText="emptyText" :expandRowKeys="expandRowKeys" :defaultExpandAll="defaultExpandAll" :defaultSort="defaultSort" :tooltipEffect="tooltipEffect" :spanMethod="spanMethod" :selectOnIndeterminate="selectOnIndeterminate">
            <el-table-column v-if="multiSelect" type="selection" width="30"></el-table-column>
            <el-table-column v-else width="30"><template slot-scope="scope"><el-radio v-model="multipleSelection" :label="rows[scope.$index]">&nbsp;</el-radio></template></el-table-column>
            <!--<el-table-column type="index" label="序" align="center" width="30"></el-table-column>-->
            <slot></slot>
            <el-table-column label="操作" v-if="showRowButtonArea || showRowButton">
                <template slot-scope="scope" v-if="showRowButton">
                    <el-button v-if="hasButton('add') && !$data.editRow" @click="handelTableRowAdd(scope.$index)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                    <el-button v-if="hasButton('edit') && !$data.editRow" @click="handelTableRowEdit(scope.$index)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                    <el-button v-if="$data.editRow && scope.$index == $data.editRow.rowNumber" @click="handelTableRowSave(scope.$index)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                    <el-button v-if="$data.editRow && scope.$index == $data.editRow.rowNumber" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                    <el-button v-if="hasButton('del') && !$data.editRow" @click="handelTableRowDelete(scope.$index)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
                </template>
                <slot name = "buttonArea"></slot>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" v-if="showPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :layout="pagerLayout" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :pageCount="pageCount" :small="small" :popperClass="popperClass" :prevText="prevText" :nextText="nextText" :background="background" :disabled="disabled"></el-pagination>
    </section>
</template>

<script>
    import jsonUtil from '@/utils/jsonUtil';
    export default {
        name: 'XTableEdit',
        props: {
            multiSelect:{type: Boolean, default: false},    /* 表格是否允许多选 */
            showQuery:{type: Boolean, default: true},   /* 是否显示查询区域 */
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            showPagination: {type: Boolean, default: true}, /* 是否显示分页工具条 */
            showRowButtonArea:{type: Boolean, default: false},  /* 是否在表格内每行最后1列显示操作按钮列*/
            showRowButton:{type: Boolean, default: false}, /* 是否在表格内每行最后1列显示操作按钮 */
            showTopButtonArea:{type: Boolean, default: false},  /* 是否显示表格顶部按钮区域 */
            showTopButton:{type: Boolean, default: true}, /* 是否在表格顶部显示操作按钮 */
            initNewRowData:{type: Object, default(){return {}}},   /* 新行默认初始值 */
            dic:{type: Object, default(){return null}},  /* 字典配置 */

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
                query: {querySymbol: {}},
                buttons:null, /* 操作按钮 */
                selectRowIndex:null, /* 选中的行 */
                editRow:null,   /* 正在编辑的行 */
                keyField:'',    /* 主键字段 */
                total:0,        /* 总行数 */
                rows:[],        /* 表格数据 */
                pageSizeX:this.pageSize,
                currentPageX: this.currentPage,
                multipleSelection: null,   /* 单选或多选的结果,注意多选时是json数组 */
                isRunStatus:false   /* 检查是否在执行状态,避免多次提交 */
            }
        },
        created() {
            if(this.dic && !this.$global.dic[this.dic.name]){
                let query=this.$global.getDataSource(this.dic.datasource);
                query.fields = [this.dic.datasource.valueField,this.dic.datasource.labelField];
                this.$axios.syncPostJson(this.dic.datasource.url || '/data/query',query,(res)=>{
                    if(res.code==1) {
                        this.$global.dic[this.dic.name] = {valueField:this.dic.datasource.valueField,labelField:this.dic.datasource.labelField,data:res.data.rows};
                    }else{
                        this.$global.dic[this.dic.name] = [];
                    }
                });
            }

            if(this.showRowButton || this.showTopButton) {
                this.$axios.postJson('/privilege/getButtons', this.dataSource.module || this.$parent.$data.module).then(res => {
                    if (res.code == 1) {
                        this.buttons = res.data.buttons;
                    }
                }).catch(() => {

                });
            }
        },
        computed: {
            isEditDisabled(){
                return this.selectRowIndex==null || this.editRow != null;
            }
        },
        methods: {
            isRun(){
                if(this.isRunStatus){
                    return true;
                }
                this.isRunStatus = true;
                return false;
            },
            endRun(){
                this.isRunStatus = false;
            },
            hasButton(val){
                if(this.buttons){
                    for (let v of this.buttons) {
                        if(v.name && v.name == val){
                            return true;
                        }
                    }
                }
                return false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClickRow(row){
                if(!this.editRow || this.selectRowIndex == null) {
                    if(this.multiSelect){
                        this.$refs.table.toggleRowSelection(row);
                    }else{
                        this.multipleSelection = row;
                    }
                    this.selectRowIndex = [].indexOf.call(this.rows,row);
                }
            },
            handelTableQuery(){
                if(this.isRun()){
                    return;
                }

                let query = this.$global.getDataSource(this.dataSource);
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
                    if(res.code==1) {
                        this.total = res.data.total;
                        this.keyField = res.data.keyField;
                        this.rows = res.data.rows;
                        this.clearSelect();
                        // if (this.showRowButton && this.rows.length == 0  && this.hasButton('add')) {
                        //     this.rows.push(this.initNewRowData);
                        // }
                    }
                    this.endRun();
                }).catch(() => {
                    this.endRun();
                });

            },
            // checkTableRowStatus(){
            //     if(this.editRow){
            //         if(jsonUtil.isEmpty(this.rows[this.editRow.rowNumber])) {
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
                if(this.isRun()){
                    return;
                }
                if(index == null){
                    index = -1;
                }
                this.$parent.beforeTableRowAdd && this.$parent.beforeTableRowAdd(this,index);
                // if(this.checkTableRowStatus()){
                this.rows.splice(index+1,0,this.initNewRowData);
                this.editRow = {action:'add', rowNumber:index+1};
                this.selectRowIndex = index+1;
                if(!this.multiSelect){
                    this.multipleSelection = this.initNewRowData;
                }
                // }
                this.$parent.afterTableRowAdd && this.$parent.afterTableRowAdd(this,index);
                this.endRun();
            },
            handelTableRowEdit(index) {
                if(this.isRun()){
                    return;
                }
                this.$parent.beforeTableRowEdit && this.$parent.beforeTableRowEdit(this,index);
                if(index == null){
                    if(this.selectRowIndex != null){
                        index = this.selectRowIndex;
                    }else{
                        this.endRun();
                        return;
                    }
                }
                // if(this.checkTableRowStatus()){
                    this.editRow = {action:'edit',rowNumber: index, rowData: JSON.stringify(this.rows[index])};
                // }
                this.$parent.afterTableRowEdit && this.$parent.afterTableRowEdit(this,index);
                this.endRun();
            },
            handelTableRowSave(index) {
                if(this.isRun()){
                    return;
                }
                if(index == null){
                    if(this.selectRowIndex != null){
                        index = this.selectRowIndex;
                    }else{
                        this.endRun();
                        return;
                    }
                }
                // if(this.editRow.action=='edit' && !this.rows[index][this.keyField]){
                if(this.editRow.action=='edit' && Object.keys(this.rows[index]).length==0){
                    this.$message({
                        showClose: true,
                        message: '请数据输入完整后才能保存。',
                        type: 'error'
                    });
                    this.endRun();
                    return;
                }
                let diff,id=null;
                if(this.editRow.action=='add'){
                    diff = this.rows[this.editRow.rowNumber];
                }else{
                    let oldRow = JSON.parse(this.editRow.rowData);
                    diff= jsonUtil.diff(oldRow,this.rows[this.editRow.rowNumber]);
                    id = oldRow[this.keyField];
                }
                //, rowData:JSON.stringify(this.initNewRowData)
                if(!jsonUtil.isEmpty(diff)) {
                    this.$confirm('数据未保存,是否保存?', '保存确认', {
                        confirmButtonText: '保存',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let saveData={
                            module:this.dataSource.module || null,
                            source:this.dataSource.source || null,
                            pid:this.pid || null,
                            rows:[
                                {
                                    "action": this.editRow.action,
                                    "id": id,
                                    "row": diff
                                }
                            ]
                        };
                        // console.log(saveData);
                        this.$parent.beforeTableRowSave && this.$parent.beforeTableRowSave(this,index,saveData);
                        this.$axios.postJson(this.dataSource.saveUrl || '/data/save',saveData,true,true).then((res) => {
                            if(res.code==1) {
                                if (this.editRow.action == 'add') {
                                    this.total++;
                                }
                                this.clearSelect();
                            }
                            this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                            this.endRun();
                        }).catch((res) => {
                            this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                            this.endRun();
                            // this.rows[index] = JSON.parse(this.editRow.rowData);
                        });
                    }).catch(() => {
                        // handelTableRowDelete(scope);
                        this.endRun();
                    });
                }else{
                    this.$alert('不能保存,请录入数据后再保存。', '保存', {
                        confirmButtonText: '确定',
                        type:'warning'
                    });
                    this.endRun();
                }
            },
            handelTableRowCancel() {
                if(this.isRun()){
                    return;
                }
                this.$parent.beforeTableRowCancel && this.$parent.beforeTableRowCancel(this,this.editRow);
                if(this.editRow) {
                    if(this.editRow.action == 'add'){
                        this.rows.splice(this.editRow.rowNumber, 1);
                        // if(!this.showRowButton || this.rows.length != 1) {
                        //     this.rows.splice(this.editRow.rowNumber, 1);
                        // }else{
                        //     this.rows[this.editRow.rowNumber] = JSON.parse(this.editRow.rowData);
                        // }
                    }else if(this.editRow.action == 'edit'){
                        this.rows[this.editRow.rowNumber] = JSON.parse(this.editRow.rowData);
                    }
                    this.clearSelect();
                }
                this.$parent.afterTableRowCancel && this.$parent.afterTableRowCancel(this,this.editRow);
                this.endRun();
            },
            handelTableRowDelete(index) {
                if(this.isRun()){
                    return;
                }
                if(index == null){
                    if(this.multiSelect){
                        if((this.multipleSelection || []).length==0){
                            this.$message({
                                type: 'error',
                                message: '请选中要删除的行后才能删除。'
                            });
                            this.endRun();
                            return;
                        }
                    }else if(!this.multipleSelection){
                        this.$message({
                            type: 'error',
                            message: '请选中要删除的行后才能删除。'
                        });
                        this.endRun();
                        return;
                    }
                }
                let result = null;
                this.$confirm('此操作将永久删除该数据,真的要删除吗?', '删除确认', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteData = {
                        module: this.dataSource.module || null,
                        source: this.dataSource.source || null,
                        pid: this.pid || null,
                        rows: []
                    };
                    if (index != null) {
                        deleteData.data.push({
                            "action": "del",
                            "id": this.rows[index][this.keyField]
                        });
                    } else {
                        if (Array.isArray(this.multipleSelection)) {
                            for (let v of this.multipleSelection) {
                                deleteData.rows.push({
                                    "action": "del",
                                    "id": v[this.keyField]
                                });
                            }
                        } else {
                            deleteData.rows.push({
                                "action": "del",
                                "id": this.multipleSelection[this.keyField]
                            });
                        }
                    }
                    // console.log(deleteData);
                    this.$parent.beforeTableRowDelete && this.$parent.beforeTableRowDelete(this,deleteData);
                    this.$axios.postJson(this.dataSource.deleteUrl || '/data/save',deleteData,true,true).then((res) => {
                        if(res.code==1) {
                            if(index != null) {
                                this.rows.splice(index, 1);
                                this.total = this.total - 1;
                            }else{
                                if(Array.isArray(this.multipleSelection)){
                                    // this.$lodash.pullAllBy(this.rows,this.multipleSelection,this.keyField);
                                    // this.total = this.total - this.multipleSelection.length;
                                    for(let v of this.multipleSelection){
                                        index = [].indexOf.call(this.rows, v);
                                        this.rows.splice(index, 1);
                                        this.total = this.total - 1;
                                    }
                                }else{
                                    index = [].indexOf.call(this.rows,this.multipleSelection);
                                    this.rows.splice(index, 1);
                                    this.total = this.total - 1;
                                }
                            }
                            this.clearSelect();
                        }
                        result = res;
                        this.$parent.afterTableRowDelete && this.$parent.afterTableRowDelete(this,result);
                        this.endRun();
                    }).catch(() => {
                        this.$parent.afterTableRowDelete && this.$parent.afterTableRowDelete(this,result);
                        this.endRun();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.endRun();
                });

            },

            handleSizeChange(val) {
                this.pageSizeX = val;
                this.handelTableQuery();
            },
            handleCurrentChange(val) {
                this.currentPageX = val;
                this.handelTableQuery();
            },
            clearSelect(){
                this.multipleSelection = null;
                this.editRow = null;
                this.selectRowIndex = null;
                this.$refs.table.clearSelection();
            }
        },
        mounted() {
            this.handelTableQuery();
        }
    };
</script>