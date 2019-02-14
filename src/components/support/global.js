// 定义全局变量
// const querySymbol='querySymbol';
let dic={};

function getDataSource(dataSource) {
    if(dataSource.source){
        return {source:dataSource.source};
    }else{
        if(dataSource.module){
            return {module:dataSource.module};
        }
    }
}

export default {
    getDataSource,
    dic
    // querySymbol     //编辑表格查询标记
}