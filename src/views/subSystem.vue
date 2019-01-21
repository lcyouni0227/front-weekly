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
      <!--<el-row>-->
        <!--<el-button type="success" plain>成功按钮</el-button>-->
        <!--<el-button type="info" plain>信息按钮</el-button>-->
        <!--<el-button type="warning" plain>警告按钮</el-button>-->
        <!--<el-button type="danger" plain>危险按钮</el-button>-->
      <!--</el-row>-->
    </el-header>
    <el-main>
        <el-table ref="singleTable" border highlight-current-row stripe :data="rows" style="width:100%;height:100%">
          <el-table-column type="index" label="序" align="center"></el-table-column>
          <el-table-column prop="date" label="日期" width="150">
            <template scope="scope">
              <span v-if="handelRowStatus(scope.$index)">{{scope.row.date}}</span>
              <el-input v-else size="small" v-model="scope.row.date" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
            <template scope="scope">
              <span v-if="handelRowStatus(scope.$index)">{{scope.row.name}}</span>
              <el-input v-else size="small" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template scope="scope">
              <el-button @click="handleRowEditSave(scope.$index,scope.row)" type="success" icon="el-icon-edit" plain size="mini">{{!handelRowStatus(scope.$index)?'保存':"修改"}}</el-button>
              <el-button v-if="handelRowStatus(scope.$index)" @click="handleRowDelete(scope.$index)" type="danger" icon="el-icon-delete" plain size="mini">删除</el-button>
              <el-button v-else @click="handleRowCacelEdit(scope.$index)" type="warning" icon="el-icon-info" plain size="mini">取消</el-button>

              <!--<span class="el-tag el-tag&#45;&#45;info " style="cursor: pointer;" icon="el-icon-edit" @click="handleRowEditSave(scope.$index,scope.row)">{{!handelRowStatus(scope.$index)?'保存':"修改"}}</span>-->
              <!--<span v-if="handelRowStatus(scope.$index)" class="el-tag el-tag&#45;&#45;danger " style="cursor: pointer;" @click="handleRowDelete(scope.$index,scope.row)">删除</span>-->
              <!--<span v-else class="el-tag" style="cursor: pointer;" @click="handleRowCacelEdit(scope.$index,scope.row)">取消</span>-->
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
        handelRowStatus(index){
          return this.sel == null || this.sel.rowNumber != index;
        },
        handleRowDelete(index) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.rows.splice(index, 1);
          })
        },

        //修改或保存
        handleRowEditSave(index,row) {
            if(this.sel){//this.sel.rowNumber!=index
              let diff= this.$jsonUtil.jsonDiff(JSON.parse(this.sel.rowData),this.rows[this.sel.rowNumber]);
              if(!this.$jsonUtil.jsonIsEmpty(diff)) {
                this.$confirm('数据未保存, 是否保存?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  //保存
                  this.sel = null;
                }).catch(() => {
                  this.handleRowCacelEdit(this.sel.rowNumber)
                });
              }else{
                this.sel = null;
              }
              return;
            }
            //编辑
            this.sel = {rowNumber: index, rowData: JSON.stringify(row)};
        },
        handleRowCacelEdit(index){
            this.rows[index]=JSON.parse(this.sel.rowData);
            this.sel = null;
        }
    },
    data() {
      return {
        sel: null,
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

<style >
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>
