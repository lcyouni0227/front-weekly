function diff(oldJson, newJson){
  let diff={};
  for(let key in newJson){
    if(oldJson[key]!=newJson[key]){
      diff[key]=newJson[key];
    }
  }
  return diff;
}
function isEmpty(json){
  for(let key in json){
    return false;
  }
  return true;
}

export default {diff,isEmpty}
