// import jsonUtil from '@/utils/jsonUtil';
//
// function checkTableRowStatus(scope){
//     let vue = scope._self;
//     if(vue.selected!=null){
//         if(jsonUtil.jsonIsEmpty(vue.rows[vue.selected.rowNumber])) {
//             vue.$alert('还有新行未录入数据,请录入数据后才能新增加行。', '存在操作未完成的行', {
//                 confirmButtonText: '确定',
//                 type:'warning'
//             });
//             return false;
//         }else{
//             handelTableRowSave(scope);
//         }
//     }
//     return true;
// }
//
// /**
//  * 添加行事件
//  * @param vue
//  * @param index
//  */
// function handelTableRowAdd(scope){
//     if(checkTableRowStatus(scope)){
//         scope._self.rows.splice(scope.$index+1,0,{});
//         scope._self.selected = {action:'add', rowNumber:scope.$index+1, rowData:"{}"};
//     }
// }
//
// /**
//  * 编辑按钮事件
//  * @param scope
//  */
// function handelTableRowEdit(scope) {
//     let vue = scope._self;
//     if(checkTableRowStatus(vue)){
//         vue.selected = {action:'edit',rowNumber: scope.$index, rowData: JSON.stringify(vue.rows[scope.$index])};
//     }
// }
//
// /**
//  * 保存按钮事件
//  * @param scope
//  */
// function handelTableRowSave(scope) {
//     let vue = scope._self;
//     let diff= jsonUtil.jsonDiff(JSON.parse(vue.selected.rowData),vue.rows[vue.selected.rowNumber]);
//     if(!jsonUtil.jsonIsEmpty(diff)) {
//         vue.$confirm('数据未保存,是否保存?', '提示', {
//             confirmButtonText: '保存',
//             cancelButtonText: '取消',
//             type: 'warning'
//         }).then(() => {
//             //ajax提交保存
//             let saveData={
//                 module:vue.module,
//                 source:vue.source,
//                 pid:vue.pid,
//                 data:[
//                     {
//                         "action": vue.selected.action,
//                         "id": vue.rows[scope.$index][vue.keyField],
//                         "row": diff
//                     }
//                 ]
//             };
//
//             console.log(saveData);
//             // vue.$post();
//
//
//             vue.selected = null;
//         }).catch(() => {
//             // handelTableRowDelete(scope);
//         });
//     }else{
//         vue.$alert('不能保存,请录入数据后再保存。', '保存', {
//             confirmButtonText: '确定',
//             type:'warning'
//         });
//     }
// }
//
// /**
//  * 取消按钮事件
//  * @param vue
//  */
// function handelTableRowCancel(scope) {
//     let vue  = scope._self;
//     if(vue.selected) {
//         if (vue.selected.rowData == "{}" || jsonUtil.jsonIsEmpty(vue.rows[vue.selected.rowNumber])) {
//             //空行删除
//             vue.rows.splice(vue.selected.rowNumber, 1);
//         } else {
//             vue.rows[vue.selected.rowNumber] = JSON.parse(vue.selected.rowData);
//         }
//         vue.selected = null;
//     }
// }
//
// /**
//  * 删除按钮事件
//  * @param vue
//  */
// function handelTableRowDelete(scope) {
//     let vue  = scope._self;
//     vue.$confirm('此操作将永久删除该数据,真的要删除吗?', '提示', {
//         confirmButtonText: '删除',
//         cancelButtonText: '取消',
//         type: 'warning'
//     }).then(() => {
//          let deleteData={
//             module:vue.module,
//             source:vue.source,
//             pid:vue.pid,
//             data:[
//                 {
//                     "action": "del",
//                     "id":vue.rows[scope.$index][vue.keyField]
//                 }
//             ]
//         };
//         console.log(deleteData);
//         //ajax提交删除
//
//
//         vue.rows.splice(scope.$index, 1);
//
//     }).catch(() => {
//         vue.$message({
//             type: 'info',
//             message: '已取消删除'
//         });
//     });
// }
//
//
// /**
//  * 判断是否编辑状态
//  * @param scope
//  * @returns {boolean}
//  */
// function hasEdit(scope) {
//
//     // console.log(scope);
//     // return false;
//     let vue = scope._self;
//     return vue.selected && vue.selected.rowNumber == scope.$index;
// }
//
// /**
//  * 判断是否显示新增加行按钮
//  * @param scope
//  * @returns {boolean}
//  */
// function hasAddButton(scope) {
//     return !scope._self.selected;
// }
//
// function hasEditButton(scope) {
//     return !scope._self.selected;
// }
//
// function hasSaveButton(scope) {
//     return scope._self.selected && scope.$index == scope._self.selected.rowNumber;
// }
//
// function hasCancelButton(scope) {
//     return scope._self.selected && scope.$index == scope._self.selected.rowNumber;
// }
//
// function hasDelButton(scope) {
//     return !scope._self.selected;
// }
//
// function query(vue){
//     console.log(vue);
// }
//
// export default {
//     handelTableRowAdd,
//     handelTableRowEdit,
//     handelTableRowSave,
//     handelTableRowCancel,
//     handelTableRowDelete,
//
//     hasEdit,
//
//     hasAddButton,
//     hasEditButton,
//     hasSaveButton,
//     hasCancelButton,
//     hasDelButton,
//
//     query
//     }