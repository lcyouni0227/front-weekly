<template>
    <el-select v-model="svalue" v-bind="$attrs" :name="name" :id="id" :autocomplete="autocomplete" :autoComplete="autoComplete" :automaticDropdown="automaticDropdown" :size="size" :disabled="disabled" :clearable="clearable" :filterable="filterable" :allowCreate="allowCreate" :loading="loading" :popperClass="popperClass" :remote="remote" :loadingText="loadingText" :noMatchText="noMatchText" :noDataText="noDataText" :remoteMethod="remoteMethod" :filterMethod="filterMethod" :multiple="multiple" :multipleLimit="multipleLimit" :placeholder="placeholder" :defaultFirstOption="defaultFirstOption" :reserveKeyword="reserveKeyword" valueKey="valueKey" :collapseTags="collapseTags" :popperAppendToBody="popperAppendToBody">
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
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */

            value: {type: String},  /* 接受外部v-model传入的值 */
            name: String,
            id: String,
            autocomplete: {type: String, default: 'off'},
            autoComplete: String,
            automaticDropdown: Boolean,
            size: {type: String, default(){this.$style.size}},
            disabled: Boolean,
            clearable: {type:Boolean,default:true},
            filterable: {type:Boolean,default:true},
            allowCreate: Boolean,
            loading: {type:Boolean,default:false},
            popperClass: String,
            remote: Boolean,
            loadingText: String,
            noMatchText: String,
            noDataText: String,
            remoteMethod: Function,
            filterMethod: Function,
            multiple: Boolean,
            multipleLimit: {type: Number, default: 0},
            placeholder: {type: String,default:'请输入搜索关键词'},
            defaultFirstOption: Boolean,
            reserveKeyword: Boolean,
            valueKey: {type: String, default: 'value'},
            collapseTags: Boolean,
            popperAppendToBody: {type: Boolean, default: true}
        },
        data(){
            return {
                dataField:{labelField:'id',valueField:'name'},
                rows: [],
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
                this.rows = v.data;
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
                        this.rows = res.data.rows;
                    }
                }).catch(() => {
                });
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
