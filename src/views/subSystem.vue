<template>
    <el-container>
        <el-header style="height: auto">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <el-table ref="singleTable" border highlight-current-row stripe :data="rows" style="width:100%;height:100%">
                <el-table-column type="index" label="序" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" width="150">
                    <template scope="scope">
                        <span v-if="handleEdit(scope.$index)">{{scope.row.date}}</span>
                        <el-input v-else size="small" v-model="scope.row.date" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                    <template scope="scope">
                        <span v-if="!$tableRowOperation.getTableRowIsEdit(scope)">{{scope.row.name}}</span>
                        <el-input v-else size="small" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button v-if="$tableRowOperation.showTableRowAddBtn(scope)" @click="$tableRowOperation.handelTableRowAdd(scope)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
                        <el-button v-if="$tableRowOperation.showTableRowEditBtn(scope)" @click="$tableRowOperation.handelTableRowEdit(scope)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
                        <el-button v-if="$tableRowOperation.showTableRowSaveBtn(scope)" @click="$tableRowOperation.handelTableRowSave(scope)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
                        <el-button v-if="$tableRowOperation.showTableRowCancelBtn(scope)" @click="$tableRowOperation.handelTableRowCancel(scope)" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
                        <el-button v-if="$tableRowOperation.showTableRowDeleteBtn(scope)" @click="$tableRowOperation.handelTableRowDelete(scope)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>

                        <el-button @click="$tableRowOperation.test(scope)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">test</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'subsystem',
        methods: {
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
            },
            handleEdit(index){
                return this._select == null || this._select.rowNumber != index;
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        data() {
            return {
                keyField:"date",
                module:'xx',
                rows: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        }
    };
</script>