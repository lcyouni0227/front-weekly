<template>
    <el-select :size="$style.size()" placeholder="请输入关键词选择"
               v-model="svalue"
               filterable
               remote
               reserve-keyword
               :remote-method="remoteMethod"
               :loading="loading">
        <el-option
            v-for="item in rows"
            :key="item[dataSource.searchField]"
            :label="item[dataSource.labelField]"
            :value="item[dataSource.valueField]">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'XSelect',
        props: {
            value: {type: String},  /* 接受外部v-model传入的值 */
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
        },
        data(){
            return {
                rows: [],
                list: [],
                loading: false,
                svalue:''
            };
        },
        mounted() {
            //初始话下拉框的值
            this.svalue=this.value;
            if(this.dataSource.dic){
                this.rows = this.list = this.$global.dic[this.dataSource.dic].data;
            }else {
                let query = this.$global.getDataSource(this.dataSource);
                query.fileds = this.dataSource.valueField + ',' + this.dataSource.labelField;
                this.$axios.postJson(this.dataSource.url || '/data/query', query).then(res => {
                    if (res.code == 1) {
                        this.rows = this.list = res.data.rows;
                    }
                }).catch(() => {
                });
            }
        },

        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.rows = this.list.filter(item => {
                            return item[this.dataSource.searchField].indexOf(query) > -1;
                        });
                    }, 300);
                } else {
                    this.rows = [];
                }
            }
        },
        watch:{
            //判断下拉框的值是否有改变
            svalue(val, oldVal) {
                if(val!=oldVal){
                    this.$emit('input', this.svalue);
                }
            },
        },
    };
</script>
