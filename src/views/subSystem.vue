<template>
    <el-container>
        <el-header style="height: auto">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="query.date3" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="query.date2" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--<el-button @click="$tableRowOperation.query(this)" type="primary">查询</el-button>-->
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <xtable-edit ref="singleTable" border highlight-current-row stripe :data="data" style="width:100%;height:100%">
                <el-table-column prop="date" label="日期" width="150">
                    <template scope="scope">
                        <span v-if="$tableRowNoEdit(scope)">{{scope.row.date}}</span>
                        <el-input v-else size="small" v-model="scope.row.date" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                    <template scope="scope">
                        <span v-if="$tableRowNoEdit(scope)">{{scope.row.name}}</span>
                        <el-input v-else size="small" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
            </xtable-edit>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'subsystem',
        data() {
            return {
                query:{},
                data: {
                    keyField: "date",
                    module: 'xx',
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
        }
    };
</script>