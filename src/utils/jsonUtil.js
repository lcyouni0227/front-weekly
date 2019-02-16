/**
 * 判断两个json的差异,但不包括children项
 */
function diff(oldJson, newJson){
  let diff={};
  for(let key in newJson){
    if(key !== 'children') {
      if (oldJson[key] != newJson[key]) {
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
export default {diff,isEmpty,isEquals,findIndexFromArrayNoChildren}
