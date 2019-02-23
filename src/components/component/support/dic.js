/**
 * 获取字典数据
 */

import comUtil from '../../../utils/comUtil';
export default {
    props: {
        dic: {type: Array, default() {return null}},  /* 字典配置 */
    },
    created() {
        this._getDicData();
    },
    methods: {
        _getDicData(){
            if(this.dic){
                for (let v of this.dic) {
                    if(!this.$global.dic[v.name]){
                        let query=comUtil.getDataSource(v.datasource);
                        if(query) {
                            query.fields = v.datasource.valueField + ',' + v.datasource.labelField;
                            if (v.datasource.parentField) {
                                query.fields += ',' + v.datasource.parentField;
                            }
                            // console.log(query);
                            this.$axios.syncPostJson(v.datasource.url || '/data/query', query, (res) => {
                                if (res.code == 1) {
                                    this.$global.dic[v.name] = {
                                        valueField: v.datasource.valueField,
                                        labelField: v.datasource.labelField,
                                        data: res.data.rows
                                    };
                                    if (v.datasource.parentField) {
                                        this.$global.dic[v.name].parentField = v.datasource.parentField;
                                    }
                                } else {
                                    this.$global.dic[v.name] = [];
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}