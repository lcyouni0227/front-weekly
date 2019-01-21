<template>
  <el-container>
    <el-header style="height: auto">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>
    </el-header>
    <el-main>
        <el-table
            ref="singleTable"
            border
            highlight-current-row
            :data="tableData4"
            style="width: 100%;height:100%"
            max-height="250">
          <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="province"
              label="省份"
              width="120">
          </el-table-column>
          <el-table-column
              prop="city"
              label="市区"
              width="120">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="zip"
              label="邮编"
              width="120">
          </el-table-column>
          <el-table-column
              label="操作"
              width="120">
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData4)"
                  type="text"
                  size="small">
                移除
              </el-button>
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData4: [{
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
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
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

<style scoped>

</style>