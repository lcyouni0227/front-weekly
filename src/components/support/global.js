// 定义全局变量
let dicData={};
function getDic(value,name) {
    if(dicData[name] && dicData[name].data) {
        for (let v of dicData[name].data) {
            if (v[dicData[name].valueField] == value) {
                return v[dicData[name].labelField];
            }
        }
    }
}
export default {
    dicData,
    getDic
}