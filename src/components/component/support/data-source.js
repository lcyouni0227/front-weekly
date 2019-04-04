/**
 * 获取数据源
 */
import jsonUtil from '../../../utils/jsonUtil';
export default {
    data(){
        return{
            pvButtons:{}, /* 有权限控制的所有操作按钮 */
            actionType:null, /* 当前操作类型:add,edit,see */
            isSelect:false,  /* 是否选中,只有选中才会有修改和删除按钮 */
            tempRealCurrEditValue:null
        };
    },
    created() {
        this._getPrivilegeButtons();
    },
    computed: {
        /* 是否有 新增 按钮 */
        hasAdd(){
            return this.pvButtons.hasOwnProperty('add') && !this.isAddOrEdit;
        },
        /* 是否有 编辑 按钮 */
        hasEdit(){
            return this.pvButtons.hasOwnProperty('edit') && !this.isAddOrEdit;
        },
        /* 是否有 删除 按钮 */
        hasDel(){
            return this.pvButtons.hasOwnProperty('del') && !this.isAddOrEdit;
        },
        /* 是否有 查看 按钮 */
        hasSee(){
            return this.pvButtons.hasOwnProperty('see') && !this.isAddOrEdit;
        },
        hasSave(){
            return this.isAddOrEdit;
        },
        hasCancel(){
            return this.isAddOrEdit;
        },

        /* 当前操作状态: 编辑或新增 状态 */
        isAddOrEdit(){
            return this.actionType === 'add' || this.actionType === 'edit';
        },
        /* 当前操作状态: 新增 状态 */
        isAdd(){
            return this.actionType === 'add';
        },
        /* 当前操作状态: 编辑 状态 */
        isEdit(){
            return this.actionType === 'edit';
        },
        /* 当前操作状态: 查看 状态 */
        isSee(){
            return this.actionType === 'see';
        }
    },
    methods: {
        handelSelect(){
            this.actionType = null;
            this.isSelect = true;
        },
        handelFormAdd(formInstance,initData,beforeCallback,afterCallback){
            beforeCallback && beforeCallback();
            this.actionType = 'add';
            let model = formInstance.model;
            for(let v in model){
                if(initData[v]){
                    model[v] = initData[v];
                }else{
                    model[v] = null;
                }
            }
            this.isSelect = false;
            afterCallback && afterCallback();
        },
        handelFormEdit(formInstance,row,beforeCallback,afterCallback){
            beforeCallback && beforeCallback();
            this.tempRealCurrEditValue = JSON.parse(JSON.stringify(row));
            this.actionType = 'edit';
            afterCallback && afterCallback(row);
        },
        handelFormSave(DataSource,keyField,row,beforeCallback,afterCallback){
            beforeCallback && beforeCallback();
            let diff = null;
            if(this.actionType === 'add'){
                diff = row;
            }else{
                diff = jsonUtil.diff(this.tempRealCurrEditValue,row);
            }
            if(!jsonUtil.isEmpty(diff)) {
                let saveData = this.getSaveData(DataSource,this.actionType,diff,row[keyField]);
                // console.log(saveData);
                this.$axios.postJson(DataSource.saveUrl || '/data/save',saveData,true,true).then((res) => {
                    if(res.code==1) {
                        this.tempRealCurrEditValue = null;
                        this.actionType = null;
                        this.isSelect = false;
                    }
                    afterCallback && afterCallback(res);
                }).catch((res) => {
                    afterCallback && afterCallback(res);
                });
            }else{
                this.tempRealCurrEditValue = null;
                this.actionType = null;
                this.isSelect = false;
            }

        },
        handelFormDel(DataSource,keyField,rows,beforeCallback,afterCallback){
            this.$confirm('此操作将永久删除该数据,真的要删除吗?', '删除确认', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let delData = this.getDelData(DataSource,rows,keyField);
                beforeCallback && beforeCallback(delData);
                // console.log(delData);
                this.$axios.postJson(DataSource.delUrl || '/data/save',delData,true,true).then((res) => {
                    if(res.code==1) {
                        this.actionType = null;
                        this.isSelect = false;
                    }
                    afterCallback && afterCallback(res);
                }).catch((res) => {
                    afterCallback && afterCallback(res);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handelFormCancel(row,beforeCallback,afterCallback){
            beforeCallback && beforeCallback();
            if(this.tempRealCurrEditValue && this.actionType === 'edit'){
                for(let v in row){
                    if (this.tempRealCurrEditValue.hasOwnProperty(v)){
                        if(row[v] != this.tempRealCurrEditValue[v]){
                            row[v] = this.tempRealCurrEditValue[v]
                        }
                    }
                }
            }
            this.actionType = null;
            afterCallback && afterCallback();
        },

        /**
         * 获得按钮权限数据
         * @private
         */
        _getPrivilegeButtons(){
            if(this.checkPvButtons || (this.$attrs.hasOwnProperty('checkPvButtons') && this.$attrs.checkPvButtons.toLocaleString() === 'true')) {
                let v = (this.dataSource && this.dataSource.module) || this.module || this.source || this.$parent.$data.module;
                if (v) {
                    this.$axios.postJson('/privilege/getButtons', v,false,false).then(res => {
                        if (res.code == 1) {
                            // console.log(res)
                            if(this.button){
                                this.pvButtons = Object.assign({},res.data.buttons,this.button)
                            }else{
                                this.pvButtons = res.data.buttons;
                            }
                        }
                    }).catch(() => {

                    });
                }
            }
        },

        /**
         * 获得字典数据
         * @param dic
         */
        getDicData(dic){
            if(!dic){
                if(this.dic){
                    dic = this.dic;
                }else{
                    console.error('无字典信息。');
                    return;
                }
            }
            for (let v of dic) {
                if(!this.$dic.dicData[v.name]){
                    let query = this.getQuerySource(v.dataSource);
                    this.$axios.syncPostJson(v.dataSource.queryUrl || '/data/query', query, (res) => {
                        if (res.code == 1) {
                            this.$dic.dicData[v.name] = {
                                valueField: v.dataSource.valueField,
                                labelField: v.dataSource.labelField,
                                data: res.data.rows
                            };
                            if (v.dataSource.parentField) {
                                this.$dic.dicData[v.name].parentField = v.dataSource.parentField;
                            }
                        } else {
                            this.$dic.dicData[v.name] = [];
                        }
                    });
                }
            }
        },

        getSaveData(DataSource,action,row,keyFieldValue){
            let saveData = this.getSource(DataSource);
            saveData.rows=[{
                action: action || this.actionType,
                id: keyFieldValue,
                row: row
            }];
            return saveData;
        },

        getDelData(DataSource,rows,keyField){
            let delData = this.getSource(DataSource);
            delData.rows = [];
            if(rows instanceof Array){
                for(let v of rows){
                    delData.rows.push({
                        action:'del',
                        id:v[keyField]
                    })
                }
            }else{
                delData.rows.push({
                    action:'del',
                    id:rows[keyField]
                })
            }
            return delData;
        },

        getSource(DataSource){
            let query = {
                source:DataSource.source || this.dataSource.source || '',
                module:DataSource.module || this.dataSource.module || ''
            };
            return query;
        },
        /**
         * 获得查询对象,排除分页和查询界面区域的条件,用于查询字典和编辑一条数据
         * @param DataSource
         * @param addRule:附加过滤条件
         * @returns {{module: (*|string), source: (*|string), fields: (*|string)}}
         */
        getQuerySource(DataSource,addRule){
            if(!DataSource && this.dataSource){
                DataSource = this.dataSource;
            }
            let query = this.getSource(DataSource);
            query.fields = this.getFields(DataSource);
            if(DataSource.title){
                query.title = true;
            }
            if(DataSource.orderBy){
                query.orderBy = DataSource.orderBy;
            }
            if(DataSource.rule){
                query = this.addRuleJson(query,DataSource.rule);
            }
            if(addRule){
                query = this.addRuleJson(query,addRule)
            }
            return query;
        },

        /**
         * 获得查询对象
         * @param isOne:是否查询一条数据,用于编辑和查看详细信息
         * @returns {{module: string, source: *, fields: (*|string)}}
         */
        getQuery(DataSource,addRule){
            if(!DataSource && this.dataSource){
                DataSource = this.dataSource;
            }
            let query = this.getQuerySource(DataSource,addRule);
            let v = this.getRule();
            if(v){
                query = this.addRuleJson(query,v);
            }
            if(this.hasOwnProperty('currentPageX')){
                query.page = this.currentPageX;
            }
            if(this.hasOwnProperty('pageSizeX')){
                query.size = this.pageSizeX;
            }
            return query;
        },

        /**
         * 获得查询字段,如果是所有字段则为空字符串
         * @returns {string}
         */
        getFields(DataSource){
            let allFields = [];
            const add = (field) =>{
                if(typeof field=='string'){
                    add(field.toLowerCase().split(","));
                }else if(field instanceof Array){
                    for(let v of field){
                        if(allFields.indexOf(v) != -1){
                            allFields.push(v);
                        }
                    }
                }
            };
            if(DataSource.addField !== '*'){
                add(DataSource.addField);
                DataSource.parentField && add(DataSource.parentField);
                DataSource.valueField && add(DataSource.valueField);
                DataSource.labelField && add(DataSource.labelField);
            }
            return allFields.join(",");
        },

        /**
         * 添加查询字段
         * @param allFields:所有字段对象,为字符串或者数组
         * @param itemFields:要添加的字段,为字符串或者数组
         * @returns allFields,类型为allFields的原始类型
         */
        addFields(allFields,itemFields){
            const add = (field) =>{
                if(typeof field=='string'){
                    add(field.toLowerCase().split(","));
                }else if(field instanceof Array){
                    for(let v of field){
                        if(allFields.indexOf(v) != -1){
                            allFields.push(v);
                        }
                    }
                }
            };
            if(allFields instanceof Array){
                if(typeof itemFields=='string'){
                    add(itemFields.toLowerCase().split(","));
                }else if(itemFields instanceof Array){
                    for(let v of itemFields){
                        if(allFields.indexOf(v) != -1){
                            allFields.push(v);
                        }
                    }
                }
            } else {
                allFields = allFields.toLowerCase().split(",");
                add(itemFields);
                return allFields.join(",");
            }
            return allFields;
        },
        /* 获得查询参数 */
        getRule(){
            if(this.$slots.query){
                //TODO 现为2级，可优化为多级
                if(this.$slots.query[0] && this.$slots.query[0].componentInstance && this.$slots.query[0].componentInstance.getRuleFormat){
                    return this.$slots.query[0].componentInstance.getRuleFormat();
                }else{
                    if(this.$slots.query[0] && this.$slots.query[0].children  && this.$slots.query[0].children[0].componentInstance && this.$slots.query[0].children[0].componentInstance.getRuleFormat){
                        return this.$slots.query[0].children[0].componentInstance.getRuleFormat();
                    }
                }
            }else{
                return null;
            }
        },

        addFilter(query,filter){
            if(filter){
                return query;
            }
            if(query){
                if(filter.rule){
                    query = this.addRule(query,filter.rule)
                }
            }else{
                query = {filter:filter};
            }
            return query;
        },

        /**
         * 添加json格式查询条件
         * @param query:已有查询
         * @param rule:新增加的查询条件,为json或json数组
         * @returns {*}
         */
        addRuleJson(query,rule) {
            if(!rule){
                return query;
            }
            if(!(rule instanceof Array)){
                rule = [rule];
            }
            if(query){
                if(query.filter){
                    if(query.filter.rule){
                        for(let v of rule){
                            query.filter.rule.push(v)
                        }
                    }else{
                        query.filter.rule = rule;
                    }
                }else{
                    query.filter = {out:'and',in:'and',rule:rule};
                }
            }else{
                query = {filter:{out:'and',in:'and',rule:rule}};
            }
            return query;
        },

        /**
         * 添加查询条件
         * @param query:已有查询
         * @param name:查询字段
         * @param opt:查询操作符
         * @param val:查询值
         * @returns {*}
         */
        addRule(query,name,opt,val){
            return this.addRuleJson(query,[{name:name,opt:opt,val:val}]);
        },

        /**
         * 从已有结果中过滤出新的结果集
         * @param rows:Json数组
         * @param rule
         */
        getFilterResult(rows,rule){
            if(!rule){
                return rows;
            }
            return rows.filter((item) => {
                for (let m of rule) {
                    switch (m.opt || '=') {
                        case '=':
                            if (item[m.name] != m.val) {
                                return false;
                            }
                            break;
                        case '>':
                            if (!(item[m.name] > m.val)) {
                                return false;
                            }
                            break;
                        case '>=':
                            if (!(item[m.name] >= m.val)) {
                                return false;
                            }
                            break;
                        case '<':
                            if (!(item[m.name] < m.val)) {
                                return false;
                            }
                            break;
                        case '<=':
                            if (!(item[m.name] <= m.val)) {
                                return false;
                            }
                            break;
                        case '!=':
                            if (!(item[m.name] != m.val)) {
                                return false;
                            }
                            break;
                        default:
                            if (item[m.name] != m.val) {
                                return false;
                            }
                            break;
                    }
                }
                return true;
            });
        },

        /**
         *
         * @param callback:回调函数
         * @param DataSource:数据源
         * @param url:查询地址
         */
        /**
         * 从数据库获得多条数据
         * @param DataSource:可选,数据源
         * @param url:可选,提交地址
         * @param rule:可选,查询条件
         * @param beforeCallback:可选,查询前回调
         * @param afterCallback:查询后回调
         */
        getQueryMuliData(DataSource,url,rule,beforeCallback,afterCallback){
            let query = this.getQuery(DataSource);
            if(rule){
                query = this.addRuleJson(query,rule);
            }
            beforeCallback && beforeCallback(query);
            this.$axios.postJson(url || (DataSource && DataSource.queryUrl) || '/data/query',query,false,false).then((res) => {
                afterCallback && afterCallback(res);
            }).catch(() => {

            });
        },

        /**
         * 从数据库获得单条记录,常用于编辑/查看
         * @param DataSource:可选,数据源
         * @param url:可选,提交地址
         * @param rule:可选,查询条件
         * @param beforeCallback:可选,查询前回调
         * @param afterCallback:查询后回调
         */
        getQuerySingleData(DataSource,url,rule,beforeCallback,afterCallback){
            let query = this.getQuerySource(DataSource);
            if(rule){
                query = this.addRuleJson(query,rule);
            }
            beforeCallback && beforeCallback(query);
            // console.log(query);
            this.$axios.postJson(url || (DataSource && DataSource.queryUrl) || '/data/query',query,false,false).then((res) => {
                afterCallback && afterCallback(res);
            }).catch(() => {

            });
        }
    }
}