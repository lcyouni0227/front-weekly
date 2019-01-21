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
            :data="master_user.tableData"
            style="width: 100%;height:100%"
            class="tb-edit"
            stripe
            header-cell-style="text-align:center"
            @row-click="handleCurrentChange"
            >
          <el-table-column type="index" label="序" align="center"></el-table-column>
          <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
            <template scope="scope">
                <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.date" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.date}}</span>
               </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="120">
            <template scope="scope">
                 <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
            </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="province"
              label="省份"
              width="120">
            <template scope="scope">
                 <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.province" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.province}}</span>
            </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="city"
              label="市区"
              width="120">
            <template scope="scope">
                <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.city" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.city}}</span>
                </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
            <template scope="scope">
                <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.address" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.address}}</span>
             </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            <template scope="scope">
                <span v-if="scope.row.isSet">
              <el-input size="small" v-model="scope.row.zip" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.zip}}</span>
             </span>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="220">
            <template scope="scope">
                <span class="el-tag el-tag--info " style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">{{scope.row.isSet?'保存':"修改"}}</span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger " style="cursor: pointer;">删除</span>
              <span v-else class="el-tag" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">取消</span>
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
      // deleteRow(index, rows) {
      //   rows.splice(index, 1);
      // },

        handleCurrentChange(row, event, column) {
            console.log(row, event, column, event.currentTarget)
        },
        // handleEdit(index, row) {
        //     console.log(index, row);
        // },

        readMasterUser() {
            var generateId = {
                _count: 1,
                get(){return ((+new Date()) + "_" + (this._count++))}
            };
            //根据实际情况，自己改下啊
            this.master_user.data.map(i => {
                i.id = generateId.get();//模拟后台插入成功后有了id
                i.isSet=false;//给后台返回数据添加`isSet`标识
                return i;
            });
        },
        //添加账号
        // addMasterUser() {
        //     for (let i of this.master_user.data) {
        //         if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        //     }
        //     let j = { id: 0, "type": "", "addport": "", "user": "", "pwd": "", "info": "", "isSet": true, "_temporary": true };
        //     this.master_user.data.push(j);
        //     this.master_user.sel = JSON.parse(JSON.stringify(j));
        // },
        //修改
        pwdChange(row, index, cg) {
            //点击修改 判断是否已经保存所有操作
            for (let i of this.master_user.data) {
                if (i.isSet && i.id != row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            //是否是取消操作
            if (!cg) {
                if (!this.master_user.sel.id) this.master_user.data.splice(index, 1);
                return row.isSet = !row.isSet;
            }
            //提交数据
            if (row.isSet) {
                //项目是模拟请求操作  自己修改下
                (function () {
                    let data = JSON.parse(JSON.stringify(this.master_user.sel));
                    for (let k in data) row[k] = data[k];
                    this.$message({
                        type: 'success',
                        message: "保存成功!"
                    });
                    //然后这边重新读取表格数据
                    this.readMasterUser();
                    row.isSet = false;
                })();
            } else {
                this.master_user.sel = JSON.parse(JSON.stringify(row));
                row.isSet = true;
            }
        }
    },
    data() {
      return {
          master_user:{
              tableData: [{
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
              }],
              sel:null
          }
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
