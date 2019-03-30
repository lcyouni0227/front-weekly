/**
 * 判断两个json的差异,但不包括children项
 */
function diff(oldJson, newJson){
    let diff={};
    for(let key in newJson){
        if(key !== 'children') {
            if(oldJson){
                if (oldJson[key] != newJson[key]) {
                    diff[key] = newJson[key];
                }
            }else{
                diff[key] = newJson[key];
            }
        }
    }
    return diff;
}

/**
 * 获得数组中包括json对象的key值在数组中的索引位置
 */
function findIndexFromArrayNoChildren(array,json,key){
    for(let i=0;i<array.length;i++){
        if(array[i][key] == json[key]){
            return i;
        }
    }
}

/**
 * 判断json是否为空值
 */
function isEmpty(json){
    if(!json){
        return false;
    }
    for(let key in json){
        return false;
    }
    return true;
}

/**
 * 判断两个json是否相等,但不包括children
 */
function isEquals(oldJson, newJson) {
    for(let key in newJson){
        if(key !== 'children') {
            if (oldJson[key] != newJson[key]) {
                return false;
            }
        }
    }
    for(let key in oldJson){
        if(key !== 'children') {
            if (oldJson[key] != newJson[key]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 将json数组转化为树型结构,父子为2条记录
 * @param data:list数组
 * @param parentField:父字段名称
 * @param valueField:值字段名称
 * @returns {Array}
 */
function toTree(data,parentField='_pid',valueField='id'){
    let map = {};// 将数据存储为以id为 KEY的 map索引数据列
    for(let v of data){
        map[v[valueField]] = v;
    }
    let val = [];
    for(let v of data){
        let parent = map[v[parentField]];
        if(parent && parent[parentField]!=parent[valueField]){//如果找到索引，说明此项不在顶级当中,那么需要把此项添加到他对应的父级中
            let lv = 2;
            let p = parent;
            while(map[p[parentField]]){
                p=map[p[parentField]];
                lv++;
            }
            v._level = lv;
            (parent.children || ( parent.children = [] )).push(v);
        }else{
            v._level = 1;
            val.push(v);//如果没有在map中找到对应的索引ID,那么直接把当前的item添加到val结果集中，作为顶级
        }
    }
    // console.log(val)
    return val;
}

/**
 * 简单json数组拷贝,注意json对象中还有对象的情况不适宜
 */
function cloneSimpleJsonArray(array){
    let data = [];
    for (let item of array) {
        let temp = {};
        for (let key in item) {
            temp[key] = item[key];
        }
        data.push(temp);
    }
    return data;
}

/**
 * 将json数组转化为树型结构,父子为同1条记录
 * @param data:list数组
 * @param parentField:父字段名称
 * @param parentValueField:父值字段名称
 * @param childField:子字段名称
 * @param chieldValeField:子值字段名称
 * @returns {Array}
 */
// function mapToTree(data,parentLabelField,parentValueField,childLabelField,childValueField){
//   let val = [];
//   for(let v of data){
//       let h = val.filter((it)=>{return it.value == v[parentValueField]});
//       if(h && h.length > 0){
//           h[0].children.push({value:v[childValueField],label:v[childLabelField]});
//       }else{
//           val.push({value:v[parentValueField],label:v[parentLabelField],children:[{
//                   value:v[childValueField],label:v[childLabelField]
//               }]});
//       }
//   }
//   return val;
// }
// parentLabelField,parentValueField,childLabelField,childValueField
function mapToTree(data,parm=[{labelField:'_pid'},{valueField:'id'}]){
    let val = [];
    let map = [];
    let cols = parm.length - 1;
    for(let v of data){
        for(let i=0;i<=cols;i++){
            let tmpItem = {};
            if(i == cols) {
                tmpItem = v;
            }else{
                tmpItem.labelField = v[parm[i].valueField];
                tmpItem.labelField = v[parm[i].labelField];
                delete v[parm[i].valueField];
                delete v[parm[i].labelField];
            }
            let parent = map[i][parm[i].valueField];
            if(parent){
                (parent.children || ( parent.children = [] )).push(tmpItem);
            }else{
                map[i][parm[i].valueField] = tmpItem;
                val.push(tmpItem);
            }
        }
    }
    return val;
}

export default {diff,isEmpty,isEquals,findIndexFromArrayNoChildren,toTree,cloneSimpleJsonArray,mapToTree}
