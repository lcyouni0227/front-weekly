<template scope="scope">
    <el-button v-if="$tableRowOperation.showTableRowAddBtn(scope)" @click="$tableRowOperation.handelTableRowAdd(scope)" type="primary" icon="el-icon-circle-plus-outline" plain class="tableRowButton">新增</el-button>
    <el-button v-if="$tableRowOperation.showTableRowEditBtn(scope)" @click="$tableRowOperation.handelTableRowEdit(scope)" type="warning" icon="el-icon-edit" plain class="tableRowButton">修改</el-button>
    <el-button v-if="$tableRowOperation.showTableRowSaveBtn(scope)" @click="$tableRowOperation.handelTableRowSave(scope)" type="warning" icon="el-icon-success" plain class="tableRowButton">保存</el-button>
    <el-button v-if="$tableRowOperation.showTableRowCancelBtn(scope)" @click="$tableRowOperation.handelTableRowCancel(scope)" type="success" icon="el-icon-error" plain class="tableRowButton">取消</el-button>
    <el-button v-if="$tableRowOperation.showTableRowDeleteBtn(scope)" @click="$tableRowOperation.handelTableRowDelete(scope)" type="danger" icon="el-icon-circle-close-outline" plain class="tableRowButton">删除</el-button>
</template>