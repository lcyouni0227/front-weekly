<!-- 级联选择组件 -->
<template>
  <el-cascader :options="rows" v-model="selectedOptions" @change="handleChange"/>
</template>

<script>
    import dataSource from './support/data-source';
    import jsonUtil from '../../utils/jsonUtil';
    export default {
        name:'XSelectCascader',
        mixins:[dataSource],
        props: {
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            label:{type:String,default:''}, /* 选择框前的文本 */
            value: String,      /* 接收绑定参数 */
            placeholder: {type: String, required: false, default: '请选择'},   /* 输入框占位符 */
        },
        data() {
            return {
              dataField:{labelField:'id',valueField:'name'},
              rows:[],
              selectedOptions: []
            };
        },
        created(){
            //初始化下拉框的值
            this._getData();
        },
        methods: {
            _getData(){
                // this.svalue = this.value;
                if(this.dataSource.dic){

                }else{
                    if(this.dataSource.valueField){
                        this.dataField.valueField = this.dataSource.valueField;
                    }
                    if(this.dataSource.labelField){
                        this.dataField.labelField = this.dataSource.labelField;
                    }
                    let query = this.getQuery(this.dataSource);
                    // console.log(query);
                    this.$axios.postJson(this.dataSource.queryUrl || '/data/query', query).then(res => {
                        if (res.code == 1) {
                            this.rows = jsonUtil.mapToTree(res.data.rows,this.dataSource.parentLabelField,this.dataSource.parentValueField,this.dataSource.labelField,this.dataSource.valueField);
                        }
                    }).catch(() => {
                    });
                }
            },
            handleChange(value) {
              console.log(value);
            }
        }
    };
</script>