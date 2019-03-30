/**
 * 获取字典数据
 */

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
                        let query = this.getQuerySource(v.dataSource);
                        this.$axios.syncPostJson(v.dataSource.queryUrl || '/data/query', query, (res) => {
                            if (res.code == 1) {
                                this.$global.dic[v.name] = {
                                    valueField: v.dataSource.valueField,
                                    labelField: v.dataSource.labelField,
                                    data: res.data.rows
                                };
                                if (v.dataSource.parentField) {
                                    this.$global.dic[v.name].parentField = v.dataSource.parentField;
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