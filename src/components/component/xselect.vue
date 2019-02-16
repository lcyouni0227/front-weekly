<template>
    <el-select :size="$style.size()" placeholder="请输入关键词选择"
               v-model="svalue"
               filterable
               remote
               reserve-keyword
               :remote-method="remoteMethod"
               :loading="loading">
        <el-option
            v-for="(item,index) in rows"
            :key="index"
            :label="item[dataField.labelField]"
            :value="item[dataField.valueField]">
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
                dataField:{labelField:'id',valueField:'name'},
                rows: [],
                list: [],
                loading: false,
                svalue:''
            };
        },
        created(){
            //初始化下拉框的值
            this.svalue=this.value;
            if(this.dataSource.dic){
                let v = this.$global.dic[this.dataSource.dic];
                this.dataField.valueField = v.valueField;
                this.dataField.labelField = v.labelField;
                this.rows = this.list = v.data;
            }else{
                if(this.dataSource.valueField){
                    this.dataField.valueField = this.dataSource.valueField;
                }
                if(this.dataSource.labelField){
                    this.dataField.labelField = this.dataSource.labelField;
                }
                let query = this.$global.getDataSource(this.dataSource);
                query.fields = this.dataField.valueField + ',' + this.dataField.labelField;
                // console.log(query);
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
                            return item[this.dataField.labelField].indexOf(query) > -1;
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
