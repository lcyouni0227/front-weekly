
function getDataSource(dataSource) {
    if(dataSource.source){
        return {source:dataSource.source};
    }else{
        if(dataSource.module){
            return {module:dataSource.module};
        }
    }
}

function getObjType(obj){
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}
/**
 * 对象深拷贝
 */
function deepClone(data){
    let type = getObjType(data);
    let obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
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

export default {
    getDataSource,
    getObjType,
    deepClone,
    cloneSimpleJsonArray
}