<template>
    <section>
        <slot name="query"></slot>
        <!--<el-form :inline="true" v-if="showQuery">-->
            <!--<slot name="queryArea"></slot>-->
            <!--<el-form-item>-->
                <!--<el-button @keyup.enter.native="handelQuery()" @click="handelQuery()" size="mini" type="primary" icon="el-icon-search">查询</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <el-form :inline="true" v-if="$slots.topButtonArea || showTopButton">
            <el-form-item v-if="showTopButton">
                <!--<el-button @click="handelQuery()" type="success" icon="el-icon-refresh" plain size="mini">刷新</el-button>-->
                <el-button v-if="buttons.hasOwnProperty('add') && !isEdit" @click="handelTableRowAdd(null)" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">新增</el-button>
                <el-button v-if="buttons.hasOwnProperty('edit') && !isEdit" :disabled="!isSelect" @click="handelTableRowEdit(null)" type="warning" icon="el-icon-edit" plain size="mini">修改</el-button>
                <el-button v-if="isEdit" @click="handelTableRowSave(null)" type="warning" icon="el-icon-success" plain size="mini">保存</el-button>
                <el-button v-if="isEdit" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain size="mini">取消</el-button>
                <el-button v-if="buttons.hasOwnProperty('del') && !isEdit" :disabled="!isSelect" @click="handelTableRowDelete(null)" type="danger" icon="el-icon-circle-close-outline" plain size="mini">删除</el-button>
            </el-form-item>
            <el-form-item v-if="$slots.topButtonArea">
                <slot name = "topButtonArea"></slot>
            </el-form-item>
        </el-form>
        <el-table ref="table" :row-key="rowKey" style="border-top:1px solid #ebeef5;" @row-click="handleClickRow" @selection-change="handleSelectionChange" :data="rows" :size="size" :width="width" :height="height" :maxHeight="maxHeight" :fit="fit" :stripe="stripe" :border="border" :rowKey="rowKey" :context="context" :showHeader="showHeader" :showSummary="showSummary" :sumText="sumText" :summaryMethod="summaryMethod" :rowClassName="rowClassName" :rowStyle="rowStyle" :cellClassName="cellClassName" :cellStyle="cellStyle" :headerRowClassName="headerRowClassName" :headerRowStyle="headerRowStyle" :headerCellClassName="headerCellClassName" :headerCellStyle="headerCellStyle" :highlightCurrentRow="highlightCurrentRow" :currentRowKey="currentRowKey" :emptyText="emptyText" :expandRowKeys="expandRowKeys" :defaultExpandAll="defaultExpandAll" :defaultSort="defaultSort" :tooltipEffect="tooltipEffect" :spanMethod="spanMethod" :selectOnIndeterminate="selectOnIndeterminate">
            <el-table-column v-if="multiSelect" type="selection" width="30"></el-table-column>
            <el-table-column v-else width="30"><template slot-scope="scope"><input type="radio" name="radio" v-model="editRow.rowNumber" :value="scope.$index"></template></el-table-column>
            <!--<el-table-column type="index" label="序" align="center" width="30"></el-table-column>-->
            <slot></slot>
            <el-table-column label="操作" v-if="$slots.rowButtonArea || showRowButton">
                <template slot-scope="scope" v-if="showRowButton">
                    <el-button v-if="buttons.hasOwnProperty('add') && !isEdit" @click="handelTableRowAdd(scope.$index)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                    <el-button v-if="buttons.hasOwnProperty('edit') && !isEdit" @click="handelTableRowEdit(scope.$index)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                    <el-button v-if="isEdit && scope.$index == editRow.rowNumber" @click="handelTableRowSave(scope.$index)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                    <el-button v-if="isEdit && scope.$index == editRow.rowNumber" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                    <el-button v-if="buttons.hasOwnProperty('del') && !isEdit" @click="handelTableRowDelete(scope.$index)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
                </template>
                <slot name = "rowButtonArea"></slot>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:center" v-if="showPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :layout="pagerLayout" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :pageCount="pageCount" :small="small" :popperClass="popperClass" :prevText="prevText" :nextText="nextText" :background="background" :disabled="disabled"></el-pagination>
    </section>
</template>

<script>
    import jsonUtil from '../../utils/jsonUtil';
    import comUtil from '../../utils/comUtil';
    import dic from './support/dic';
    import privilege from './support/privilege';
    import runStatus from './support/run-status';
    export default {
        name: 'XTableEdit',
        mixins:[dic,privilege,runStatus],
        props: {
            multiSelect:{type: Boolean, default: false},    /* 表格是否允许多选 */
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            showPagination: {type: Boolean, default: true}, /* 是否显示分页工具条 */
            showRowButton:{type: Boolean, default: false}, /* 是否在表格内每行最后1列显示操作按钮 */
            showTopButton:{type: Boolean, default: true}, /* 是否在表格顶部显示操作按钮 */
            initNewRowData:{type: Object, default(){return {}}},   /* 新行默认初始值 */
            attField:{type: String, default: null},

            size: String,
            width: [{type: String, default: '100%'}, Number],
            height: [{type: String, default: '100%'}, Number],
            maxHeight: [String, Number],
            fit: {type: Boolean, default: true},
            stripe: {type: Boolean, default: true},
            border: Boolean,
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
            highlightCurrentRow: {type: Boolean, default: true},
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
                isTree: null,   /* 缓存是否是树型结构，通过是否引入XTableTreeColumn树型列判断 */
                xTableTreeColumn: null, /* 缓存树型列对象 */
                fields:null,    /* 缓存查询字段,通过列绑定的字段计算并缓存起来 */

                editRow:{action:null,rowNumber:null,rowData:null},   /* 正在操作的行 */
                keyField:'',    /* 主键字段 */
                total:0,        /* 总行数 */
                rows:[],        /* 表格数据 */
                pageSizeX:this.pageSize,    /* 每页记录数 */
                currentPageX: this.currentPage, /* 当前页码 */
                multipleSelection: null,   /* 单选或多选的结果,注意多选时是json数组 */
                isRunStatus:false   /* 检查是否在执行状态,避免多次提交 */
            }
        },
        computed: {
            isEdit(){
                return this.editRow.action === 'add' || this.editRow.action === 'edit';
            },
            isSelect(){
                return this.editRow.rowNumber != null;
            }
        },
        methods: {
            rowKey(row){
                return row[this.keyField];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(val.length>0){
                    let v = val[val.length-1];
                    let data = (this.$refs.table.store.states.data || []);
                    let index = 0;
                    for(let i=0;i<data.length;i++){
                        if(data[i][this.keyField] == v[this.keyField]){
                            index = i;
                            break;
                        }
                    }
                    this.editRow.rowNumber = index;
                }
            },
            handleClickRow(row){
                if(!this.isEdit) {
                    if(this.multiSelect){
                        this.$refs.table.toggleRowSelection(row);
                    }else{
                        this.multipleSelection = row;
                    }
                    this.editRow.rowNumber = jsonUtil.findIndexFromArrayNoChildren(this.$refs.table.store.states.data,row,this.keyField);
                }
            },
            handelQuery(filter){
                if(this.isRun()){
                    return;
                }
                let query = comUtil.getDataSource(this.dataSource);
                query.page = this.currentPageX;
                query.size = this.pageSizeX;
                if(filter){
                    query.filter = filter;
                }
                if(this.dataSource.module){
                    if(this.fields == null){
                        let attfield = [];
                        if(this.$attrs.attField){
                            attfield = this.$attrs.attField.toLowerCase().split(",");
                        }
                        if(this.attField){
                            attfield = attfield.concat(this.attField.toLowerCase().split(","));
                        }
                        for(let v of this.$refs.table.columns) {
                            if (v.property) {
                                for(let i = 0;i<attfield.length;i++){
                                    if (attfield[i] == v.property.toLowerCase()){
                                        attfield.splice(i, 1);
                                        break;
                                    }
                                }
                                this.fields == null ? this.fields = v.property : this.fields += ',' + v.property;
                            }
                        }
                        for(let v of attfield){
                            this.fields == null ? this.fields = v : this.fields += ',' + v;
                        }
                    }
                    query.fields = this.fields;
                }
                // console.log(query);
                this.$axios.postJson(this.dataSource.queryUrl || '/data/query',query).then(res => {
                    if(res.code==1) {
                        this.total = res.data.total;
                        this.keyField = res.data.keyField;
                        this._clearSelect();
                        if(this.isTree == null){
                            for (let v of this.$options._renderChildren){
                                if (v.tag.indexOf("XTableTreeColumn")>0){
                                    this.isTree = true;
                                    this.xTableTreeColumn = v;
                                    this.rows = v.componentInstance.toTree(res.data.rows);
                                    this.endRun();
                                    return;
                                }
                            }
                            this.isTree = false;
                        }else if(this.isTree){
                            this.rows = this.xTableTreeColumn.componentInstance.toTree(res.data.rows);
                            this.endRun();
                            return;
                        }
                        this.rows = res.data.rows;
                    }
                    this.endRun();
                }).catch(() => {
                    this.endRun();
                });
            },
            handelTableRowAdd(index){
                if(this.isRun()){
                    return;
                }
                if(index == null){
                    if(this.editRow.rowNumber != null){
                        index = this.editRow.rowNumber;
                    }else{
                        index = -1;
                    }
                }
                index ++;
                this.$parent.beforeTableRowAdd && this.$parent.beforeTableRowAdd(this,index);
                let data = this.$refs.table.store.states.data;
                data.splice(index,0,JSON.parse(JSON.stringify(this.initNewRowData)));
                this.$refs.table.store.commit('setData', data);
                this.editRow = {action:'add', rowNumber:index};
                this.$parent.afterTableRowAdd && this.$parent.afterTableRowAdd(this,index);
                this.endRun();
            },
            handelTableRowEdit(index) {
                if(this.isRun()){
                    return;
                }
                this.$parent.beforeTableRowEdit && this.$parent.beforeTableRowEdit(this,index);
                if(index == null){
                    if(this.editRow.rowNumber != null){
                        index = this.editRow.rowNumber;
                    }else{
                        this.endRun();
                        return;
                    }
                }
                this.editRow.action = 'edit';
                this.editRow.rowData = JSON.stringify(this.$refs.table.store.states.data[index]);
                this.$parent.afterTableRowEdit && this.$parent.afterTableRowEdit(this,index);
                this.endRun();
            },
            handelTableRowCancel() {
                if(this.isRun()){
                    return;
                }
                this.$parent.beforeTableRowCancel && this.$parent.beforeTableRowCancel(this,this.editRow);

                if(this.editRow.action == 'add'){
                    let data = this.$refs.table.store.states.data;
                    data.splice(this.editRow.rowNumber, 1);
                    this.$refs.table.store.commit('setData', data);
                }else if(this.editRow.action == 'edit'){
                    let data = this.$refs.table.store.states.data;
                    data[this.editRow.rowNumber] = JSON.parse(this.editRow.rowData);
                    this.$refs.table.store.commit('setData', data);
                }
                this._clearSelect();
                this.$parent.afterTableRowCancel && this.$parent.afterTableRowCancel(this,this.editRow);
                this.endRun();
            },
            handelTableRowSave(index) {
                if(this.isRun()){
                    return;
                }
                if(index == null){
                    if(this.editRow.rowNumber != null){
                        index = this.editRow.rowNumber;
                    }else{
                        this.endRun();
                        return;
                    }
                }
                let diff=null,id=null;
                if(this.editRow.action=='add'){
                    diff = this.$refs.table.store.states.data[this.editRow.rowNumber];
                }else{
                    let oldRow = JSON.parse(this.editRow.rowData);
                    diff= jsonUtil.diff(oldRow,this.$refs.table.store.states.data[this.editRow.rowNumber]);
                    id = oldRow[this.keyField];
                }
                if(!jsonUtil.isEmpty(diff)) {
                    if(this.isTree && diff[this.xTableTreeColumn.child.parentField] && diff[this.xTableTreeColumn.child.parentField] == diff[this.xTableTreeColumn.child.valueField]){
                        this.$alert('不能保存,上级树不能选择自己,请修改后再保存。', '保存', {
                            confirmButtonText: '确定',
                            type:'warning'
                        });
                        this.endRun();
                        return;
                    }
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
                                if(this.isTree && this.editRow.action == 'edit' && diff[this.xTableTreeColumn.child.parentField]){
                                    this.endRun();
                                    this.handelQuery();
                                }
                                this._clearSelect();
                            }
                            this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                            this.endRun();
                        }).catch((res) => {
                            this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                            this.endRun();
                        });
                    }).catch(() => {
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
                        deleteData.rows.push({
                            "action": "del",
                            "id": this.$refs.table.store.states.data[index][this.keyField]
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
                            this._clearSelect();
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
                this.handelQuery();
            },
            handleCurrentChange(val) {
                this.currentPageX = val;
                this.handelQuery();
            },
            _clearSelect(){
                this.multipleSelection = null;
                this.editRow = {action:null,rowNumber:null,rowData:null};
                this.$refs.table.clearSelection();
            }
        },
        mounted() {
            this.handelQuery();
        }
    };
</script>