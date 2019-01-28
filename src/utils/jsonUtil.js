function jsonDiff(oldJson,newJson){
  let diff={};
  for(let key in newJson){
    if(oldJson[key]!=newJson[key]){
      diff[key]=newJson[key];
    }
  }
  return diff;
}
function jsonIsEmpty(json){
  for(let key in json){
    return false;
  }
  return true;
}

export default {jsonDiff,jsonIsEmpty}
