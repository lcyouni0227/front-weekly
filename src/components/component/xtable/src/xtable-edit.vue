<template>
    <section>
        <div class="title" v-if="title">{{title}}</div>
        <slot name="query"/>
        <el-form :inline="true" v-if="$slots.topButtonArea || showTopButton">
            <el-form-item v-if="showTopButton">
                <!--<el-button @click="handelQuery()" type="success" icon="el-icon-refresh" plain size="mini">刷新</el-button>-->
                <el-button v-if="hasAdd" @click="handelTableRowAdd(null)" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">新增</el-button>
                <el-button v-if="hasEdit" :disabled="!isSelect" @click="handelTableRowEdit(null)" type="warning" icon="el-icon-edit" plain size="mini">修改</el-button>
                <el-button v-if="hasSave" @click="handelTableRowSave(null)" type="warning" icon="el-icon-success" plain size="mini">保存</el-button>
                <el-button v-if="hasCancel" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain size="mini">取消</el-button>
                <el-button v-if="hasDel" :disabled="!isSelect" @click="handelTableRowDelete(null)" type="danger" icon="el-icon-circle-close-outline" plain size="mini">删除</el-button>
                <el-button v-if="dialogEdit && hasSee" :disabled="!isSelect" @click="handelTableRowEdit(null,true)" type="success" icon="el-icon-circle-close-outline" plain size="mini">查看</el-button>
            </el-form-item>
            <el-form-item v-if="$slots.topButtonArea">
                <slot name = "topButtonArea"/>
            </el-form-item>
        </el-form>
        <el-table ref="table" style="border-top:1px solid #ebeef5;" @row-click="handleClickRow" @selection-change="handleSelectionChange" :data="nativeRowsValue" :size="size" :width="width" :height="height" :maxHeight="maxHeight" :fit="fit" :stripe="stripe" :border="border" :context="context" :showHeader="showHeader" :showSummary="showSummary" :sumText="sumText" :summaryMethod="summaryMethod" :rowClassName="rowClassName" :rowStyle="rowStyle" :cellClassName="cellClassName" :cellStyle="cellStyle" :headerRowClassName="headerRowClassName" :headerRowStyle="headerRowStyle" :headerCellClassName="headerCellClassName" :headerCellStyle="headerCellStyle" :highlightCurrentRow="highlightCurrentRow" :rowKey="rowKey" :currentRowKey="currentRowKey" :emptyText="emptyText" :expandRowKeys="expandRowKeys" :defaultExpandAll="defaultExpandAll" :defaultSort="defaultSort" :tooltipEffect="tooltipEffect" :spanMethod="spanMethod" :selectOnIndeterminate="selectOnIndeterminate"
                  @select="select" @select-all="selectAll" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @header-click="headerClick" @header-contextmenu="headerContextmenu" @sort-change="sortChange" @filter-change="filterChange" @current-change="currentChange" @header-dragend="headerDragend" @expand-change="expandChange">
            <el-table-column v-if="multiSelect" type="selection" width="30" fixed/>
            <el-table-column v-if="singleSelect" width="30" fixed>
                <template slot-scope="scope">
                    <el-radio v-model="editRow.rowNumber" :label="scope.$index"/>
                </template>
            </el-table-column>
            <!--<el-table-column type="index" label="序" align="center" width="30"></el-table-column>-->
            <slot/>
            <x-table-column label="操作" fixed="right" v-if="$scopedSlots.rowButtonArea || showRowButton" :edit="false">
                <template slot-scope="scope">
                    <el-button v-if="showRowButton && pvButtons.hasOwnProperty('add') && !isAddOrEdit" @click="handelTableRowAdd(scope.$index)" type="primary" icon="el-icon-circle-plus-outline" plain size="mini">新增</el-button>
                    <el-button v-if="showRowButton && pvButtons.hasOwnProperty('edit') && !isAddOrEdit" @click="handelTableRowEdit(scope.$index)" type="warning" icon="el-icon-edit" plain size="mini">修改</el-button>
                    <el-button v-if="showRowButton && hasSave && scope.$index == editRow.rowNumber" @click="handelTableRowSave(scope.$index)" type="warning" icon="el-icon-success" plain size="mini">保存</el-button>
                    <el-button v-if="showRowButton && hasCancel && scope.$index == editRow.rowNumber" @click="handelTableRowCancel()" type="success" icon="el-icon-error" plain size="mini">取消</el-button>
                    <el-button v-if="showRowButton && pvButtons.hasOwnProperty('del') && !isAddOrEdit" @click="handelTableRowDelete(scope.$index)" type="danger" icon="el-icon-circle-close-outline" plain size="mini">删除</el-button>
                    <span style="display:flex;"><slot name = "rowButtonArea" :row="scope.row" :index="scope.$index"></slot></span>
                </template>
            </x-table-column>
        </el-table>
        <el-pagination style="text-align:center" v-if="showPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :layout="pagerLayout" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total" :pageCount="pageCount" :small="small" :popperClass="popperClass" :prevText="prevText" :nextText="nextText" :background="background" :disabled="disabled"/>
        <slot name="dialog" :row="currRowData" :action="isSee"/>
    </section>
</template>

<script>
    import jsonUtil from '../../../../utils/jsonUtil';
    import runStatus from '../../support/run-status';
    import dataSource from '../../support/data-source';
    export default {
        name: 'XTableEdit',
        mixins:[runStatus,dataSource],
        props: {
            checkPvButtons:{type: Boolean, default: true},    /* 需要对按钮权限进行检测 */
            button:{type: Object, default(){return {}}},    /* 外部传入按钮 */
            multiSelect:{type: Boolean, default: false},    /* 表格是否允许多选,显示复选框 */
            singleSelect:{type: Boolean, default: true},    /* 表格是否允许单选,显示单选框 */
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            showPagination: {type: Boolean, default: true}, /* 是否显示分页工具条 */
            showRowButton:{type: Boolean, default: false}, /* 是否在表格内每行最后1列显示操作按钮 */
            showTopButton:{type: Boolean, default: true}, /* 是否在表格顶部显示操作按钮 */
            initNewRowData:{type: Object, default(){return {}}},   /* 新行默认初始值 */
            loadData:{type: Boolean, default: true},  /* 是否加载后就立即查询 */
            dic: {type: Array, default() {return null}},  /* 字典配置 */
            data:{type: Array, default(){return []}},   /* 外部传入的已有数据,省略查询 */
            title:String,   /* 表格顶部标题 */

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
            rowKey: [String, Function],
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
                initloadData:this.loadData,
                checkPrivilege :true,   /* 需要权限检测 */
                isTree: null,   /* 缓存是否是树型结构，通过是否引入XTableTreeColumn树型列判断 */
                xTableTreeColumn: null, /* 缓存树型列对象 */
                fields:'',    /* 缓存查询字段,通过列绑定的字段计算并缓存起来 */

                editRow:{rowNumber:null,rowData:null},   /* 正在操作的行 */
                keyField:'',    /* 主键字段 */
                total:0,        /* 总行数 */
                rows:this.data,        /* 表格数据 */
                pageSizeX:this.pageSize,    /* 每页记录数 */
                currentPageX: this.currentPage, /* 当前页码 */
                multipleSelection: null,   /* 单选或多选的结果,注意多选时是json数组 */
                isRunStatus:false,   /* 检查是否在执行状态,避免多次提交 */

                request:false,  /* 是否重新从数据库中拿一条记录,用于编辑功能 */
                dialogEdit:null,    /* 弹出的编辑对话框实例 */
                currRowData:{},  /* 正在新增或编辑的行数据 */
                currRow:{},  /* 当前选中行 */
                noSaveField:[], /* 不保存的字段 */
            }
        },
        computed: {
            nativeRowsValue() {
                return this.rows === null || this.rows === undefined ? [] : this.rows;
            }
        },
        watch:{
            data(val){
                this.setData(val)
            },
            dataSource:{
                handler(newValue,oldValue) {
                    if(this.initloadData === false && !oldValue){
                        return;
                    }
                    if(newValue && JSON.stringify(newValue) != JSON.stringify(oldValue)){
                        this.handelQuery();
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            getCurrRow(){
                return this.currRow;
            },
            getSelectRow(){
                return this.multipleSelection;
            },
            /* 外部获得值传入控件内 */
            setData(data){
                this.total = data.total;
                this.keyField = data.keyField;
                this._clearSelect();
                if(this.isTree == null){
                    for (let v of this.$options._renderChildren){
                        if (v.tag.indexOf("XTableTreeColumn")>0){
                            this.isTree = true;
                            this.xTableTreeColumn = v;
                            this.rows = v.componentInstance.toTree(data.rows);
                            this.endRun();
                            return;
                        }
                    }
                    this.isTree = false;
                }else if(this.isTree){
                    this.rows = this.xTableTreeColumn.componentInstance.toTree(data.rows);
                    this.endRun();
                    return;
                }
                if(Object.prototype.toString.call(data.rows) === "[object String]"){
                    this.rows = JSON.parse(data.rows);
                }else {
                    this.rows = data.rows;
                }
                // this.$emit('updata:rows',this.rows);
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
                this.$emit('selection-change',val);
            },
            handleClickRow(row, column, event){
                this.currRow = row;
                if(!this.isAddOrEdit) {
                    if(this.multiSelect){
                        this.$refs.table.toggleRowSelection(row);
                    }else{
                        this.multipleSelection = row;
                    }
                    this.editRow.rowNumber = jsonUtil.findIndexFromArrayNoChildren(this.$refs.table.store.states.data,row,this.keyField);
                    this.isSelect = true;
                    this.$emit('row-click',row, column, event);
                }
            },
            handelQuery(rule,beforeCallback,afterCallback){
                if(this.isRun()){
                    return;
                }
                let query = this.getQuery(this.dataSource,rule);
                beforeCallback && beforeCallback(query);
                // console.log(query);
                if(query) {
                    this.$axios.postJson((this.dataSource && this.dataSource.queryUrl) || '/data/query', query, false, false).then(res => {
                        if (res.code == 1) {
                            this.setData(res.data);
                            afterCallback && afterCallback(res);
                            this.$emit('afterQuery', res);
                        }
                        this.endRun();
                    }).catch(() => {
                        this.endRun();
                    });
                }else{
                    this.endRun();
                }
            },
            handelTableRowAdd(index){
                if (this.isRun()) {
                    return;
                }
                if(this.dialogEdit){
                    this.currRowData = {};
                    this.dialogEdit.open('add');
                    this.$emit('beginAdd',this);
                    this.endRun();
                    return;
                }
                if(this.$options._parentListeners && this.$options._parentListeners.addAction){
                    this.$emit('addAction',this);
                }else {
                    if (index == null) {
                        if (this.editRow.rowNumber != null) {
                            index = this.editRow.rowNumber;
                        } else {
                            index = -1;
                        }
                    }
                    index++;
                    this.$parent.beforeTableRowAdd && this.$parent.beforeTableRowAdd(this, index);
                    let data = this.$refs.table.store.states.data;
                    data.splice(index, 0, JSON.parse(JSON.stringify(this.initNewRowData)));
                    this.$refs.table.store.commit('setData', data);
                    this.actionType = 'add';
                    this.editRow = {rowNumber: index};
                    this.$emit('beginAdd',this);
                    // this.$parent.afterTableRowAdd && this.$parent.afterTableRowAdd(this, index);
                }
                this.endRun();
            },
            handelTableRowEdit(index,isSee) {
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
                let rowData = this.$refs.table.store.states.data[index];
                this.editRow.rowData = JSON.stringify(rowData);
                if(this.dialogEdit){
                    if(this.request){
                        //重新请求拿编辑数据
                        let query = this.getQuerySource(this.dataSource,[{name: this.keyField,opt:'=',val:rowData[this.keyField]}]);
                        if(query) {
                            this.$axios.postJson((this.dataSource && this.dataSource.queryUrl) || '/data/query', query, true, false).then(res => {
                                if (res.code == 1 && res.data && res.data.rows && res.data.rows.length > 0) {
                                    this.currRowData = res.data.rows[0];
                                    this.editRow.rowData = JSON.stringify(this.currRowData);
                                } else {
                                    this.dialogEdit.close();
                                    this.$message({
                                        type: 'error',
                                        message: '网络错误,请稍后再试。'
                                    });
                                }
                            }).catch(() => {
                                this.dialogEdit.close();
                                this.$message({
                                    type: 'error',
                                    message: '网络错误,请稍后再试。'
                                });
                            });
                        }
                    }else{
                        this.currRowData = rowData;
                    }
                    if(isSee){
                        this.actionType = 'see';
                        this.dialogEdit.open('see');
                    }else {
                        this.actionType = '';
                        this.dialogEdit.open('edit');
                    }
                    this.$emit('beginEdit',this.actionType,this.editRow.rowData);
                    this.endRun();
                    return;
                }
                this.actionType = 'edit';
                this.$emit('beginEdit',this.actionType,this.editRow.rowData);
                // this.$parent.afterTableRowEdit && this.$parent.afterTableRowEdit(this,index);
                this.endRun();
            },
            /* 弹出对话框取消修改 */
            handelDialogEditCancel(){
                let data = this.$refs.table.store.states.data;
                data[this.editRow.rowNumber] = JSON.parse(this.editRow.rowData);
                this.$refs.table.store.commit('setData', data);
                this.$emit('afterCancel','edit',data[this.editRow.rowNumber],data);
            },
            handelTableRowCancel() {
                if(this.isRun()){
                    return;
                }
                this.$parent.beforeTableRowCancel && this.$parent.beforeTableRowCancel(this,this.editRow);
                let data;
                if(this.actionType == 'add'){
                    data = this.$refs.table.store.states.data;
                    let tmp = data.splice(this.editRow.rowNumber, 1);
                    this.$refs.table.store.commit('setData', data);
                    this.$emit('afterCancel',this.actionType,tmp,data);
                }else if(this.actionType == 'edit'){
                    data = this.$refs.table.store.states.data;
                    data[this.editRow.rowNumber] = JSON.parse(this.editRow.rowData);
                    this.$refs.table.store.commit('setData', data);
                    this.$emit('afterCancel',this.actionType,data[this.editRow.rowNumber],data);
                }
                this._clearSelect();
                // this.$parent.afterTableRowCancel && this.$parent.afterTableRowCancel(this,this.editRow);
                this.endRun();
            },
            handelTableRowSave(index,action,isConfirm) {
                if(this.isRun()){
                    return;
                }
                if(index == null && !action){
                    if(this.editRow.rowNumber != null){
                        index = this.editRow.rowNumber;
                    }else{
                        this.endRun();
                        return;
                    }
                }
                let diff=null,id=null;
                if(this.actionType=='add' || action == 'add'){
                    if(action == 'add'){
                        diff = this.currRowData;
                    }else {
                        diff = this.$refs.table.store.states.data[this.editRow.rowNumber];
                    }
                }else {
                    let oldRow = JSON.parse(this.editRow.rowData);
                    if(this.request){
                        diff= jsonUtil.diff(oldRow,this.currRowData);
                    }else{
                        diff= jsonUtil.diff(oldRow,this.$refs.table.store.states.data[this.editRow.rowNumber]);
                    }
                    id = oldRow[this.keyField];
                }
                for(let i of this.noSaveField){
                    delete diff[i];
                }
                if(!jsonUtil.isEmpty(diff)) {
                    if(this.isTree && diff[this.xTableTreeColumn.child.parentField] && diff[this.xTableTreeColumn.child.parentField] == diff[this.xTableTreeColumn.child.valueField]){
                        this.$alert('不能保存,上级树不能选择自己,请修改后再保存。', '保存', {
                            confirmButtonText: '确定',
                            type:'warning'
                        });
                        this.endRun();
                        return false;
                    }
                    if(isConfirm){
                        this.$confirm('数据未保存,是否保存?', '保存确认', {
                            confirmButtonText: '保存',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                        }).catch(() => {
                            this.endRun();
                            return false;
                        });
                    }
                    let saveData={
                        module:this.dataSource.module || null,
                        source:this.dataSource.source || null,
                        pid:this.pid || null,
                        rows:[
                            {
                                "action": action || this.actionType,
                                "id": id,
                                "row": diff
                            }
                        ]
                    };
                    // console.log(saveData);
                    this.$parent.beforeTableRowSave && this.$parent.beforeTableRowSave(saveData,this,index);
                    this.$axios.postJson((this.dataSource && this.dataSource.saveUrl) || '/data/save',saveData,true,true).then((res) => {
                        if(res.code==1) {
                            this.$emit('afterSave',this.actionType,saveData,this.rows,index,diff);
                            if(action === 'add' || (action === 'edit' && this.request) || (this.isTree && this.actionType == 'edit' && diff[this.xTableTreeColumn.child.parentField])){
                                this.endRun();
                                this.handelQuery();
                            }else{
                                if (this.actionType === 'add') {
                                    this.total++;
                                }
                            }
                            this._clearSelect();
                            this.endRun();
                            return true;
                        }
                        // this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                        this.endRun();
                    }).catch(() => {
                        // this.$parent.afterTableRowSave && this.$parent.afterTableRowSave(this,index,res);
                        this.endRun();
                    });
                }else{
                    this.$message({
                        type: 'warning',
                        message: '数据未改变。'
                    });
                    this.endRun();
                }
                return false;
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
                    this.$parent.beforeTableRowDelete && this.$parent.beforeTableRowDelete(deleteData,this.rows);
                    this.$axios.postJson((this.dataSource && this.dataSource.delUrl) || '/data/save',deleteData,true,true).then((res) => {
                        if(res.code==1) {
                            if(index != null) {
                                this.rows.splice(index, 1);
                                this.total = this.total - 1;
                            }else{
                                if(Array.isArray(this.multipleSelection)){
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
                            this.$emit('afterDel',deleteData,this.rows);
                            this._clearSelect();
                        }
                        result = res;
                        // this.$parent.afterTableRowDelete && this.$parent.afterTableRowDelete(this,result);
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
                this.editRow = {rowNumber:null,rowData:null};
                this.actionType = null;
                this.isSelect = false;
                this.$refs.table.clearSelection();
            },

            select(selection, row){
                this.$emit('select',selection, row);
            },
            selectAll(selection){
                this.$emit('select-all',selection);
            },
            cellMouseEnter(row, column, cell, event){
                this.$emit('cell-mouse-enter',row, column, cell, event);
            },
            cellClick(row, column, cell, event){
                this.$emit('cell-click',row, column, cell, event);
            },
            cellMouseLeave(row, column, cell, event){
                this.$emit('cell-mouse-leave',row, column, cell, event);
            },
            cellDblclick(row, column, cell, event){
                this.$emit('cell-dblclick',row, column, cell, event);
            },
            rowContextmenu(row, column, event){
                this.$emit('row-contextmenu',row, column, event);
            },
            rowDblclick(row, column, event){
                this.$emit('row-dblclick',row, column, event);
            },
            headerClick(column, event){
                this.$emit('header-click',column, event);
            },
            headerContextmenu(column, event){
                this.$emit('header-contextmenu',column, event);
            },
            sortChange(data){
                this.$emit('sort-change',data);
            },
            filterChange(filters){
                this.$emit('filter-change',filters);
            },
            currentChange(currentRow, oldCurrentRow){
                this.$emit('current-change',currentRow, oldCurrentRow);
            },
            headerDragend(newWidth, oldWidth, column, event){
                this.$emit('header-dragend',newWidth, oldWidth, column, event);
            },
            expandChange(row, expandedRows){
                this.$emit('expand-change',row, expandedRows);
            }
        },
        mounted() {
            this.getDicData();
            if(this.loadData){
                this.handelQuery();
            }
            this.initloadData = true;
            for(let v of this.$children){
                if( v.$options._componentTag === 'x-dialog-edit'){
                    this.dialogEdit = v;
                    if(v.$attrs.hasOwnProperty('request')){
                        if(this.dataSource.addField.trim() !== '*' && (v.$attrs.request == '' || Boolean(v.$attrs.request))){
                            this.request = true;
                        }
                    }
                    break;
                }
            }
            for(let v of this.$refs.table.$children){
                if(v.save===false){
                    this.noSaveField.push(v.prop)
                }
            }
        }
    };
</script>
<style scoped>
    .title{
        color: #565758;
        font-size: 20px;
        padding-bottom: 10px;
    }
</style>