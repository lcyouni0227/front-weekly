<template>
    <div class="el-input-group">
        <label class="x-input-label" v-if="label">{{label}}</label>
        <el-select ref="select" v-model="svalue" v-bind="$attrs" :name="name" :id="id" :autoComplete="autoComplete" :automaticDropdown="automaticDropdown" :size="size" :disabled="disabled" :clearable="clearable" :filterable="filterable" :allowCreate="allowCreate" :loading="loading" :popperClass="popperClass" :remote="remote" :loadingText="loadingText" :noMatchText="noMatchText" :noDataText="noDataText" :remoteMethod="remoteMethod" :filterMethod="filterMethod" :multiple="multiple" :multipleLimit="multipleLimit" :placeholder="placeholder" :defaultFirstOption="defaultFirstOption" :reserveKeyword="reserveKeyword" :valueKey="valueKey" :collapseTags="collapseTags" :popperAppendToBody="popperAppendToBody"
                    @change="change" @visible-change="visibleChange" @remove-tag="removeTag" @clear="clear" @blur="blur" @focus="focus">
            <el-option v-for="(item) in rows" :label="item[dataField.labelField]" :value="item[dataField.valueField]"></el-option>
            <slot/>
        </el-select>
    </div>
</template>

<script>
    import dataSource from './support/data-source';
    export default {
        name: 'XSelect',
        mixins:[dataSource],
        props: {
            data: {type: Array,default(){return []}},   /* 外部传入选项数据 */
            dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
            casWatch:String,    /* 设置当这个值改变时需重新加载数据 */
            label:{type:String,default:''}, /* 选择框前的文本 */
            value: [String,Number],  /* 接受外部v-model传入的值 */
            loadData:{type: Boolean, default: true},  /* 是否加载后就立即查询 */

            name: String,
            id: String,
            // autocomplete: {type: String, default: 'off'},
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
            placeholder: {type: String,default:'请选择'},
            defaultFirstOption: Boolean,
            reserveKeyword: Boolean,
            valueKey: {type: String, default: 'value'},
            collapseTags: Boolean,
            popperAppendToBody: {type: Boolean, default: true}
        },
        data(){
            return {
                casVal:null,  /* 级联选择前条件的初始值 */
                dataField:{valueField:'id',labelField:'name'},
                rows: this.data,
                svalue:''
            };
        },
        created(){
            //初始化下拉框的值
            if(this.loadData){
                this._getData();
            }
        },
        computed: {
            getDic() {
                return this.$store.state.dic.change;
            }
        },
        methods:{
            _getData(){
                this.svalue = this.value;
                if(this.data.length <= 0) {
                    if(this.dataSource.dic) {
                        this._getVal();
                    }else{
                        if(this.dataSource.valueField){
                            this.dataField.valueField = this.dataSource.valueField;
                        }
                        if(this.dataSource.labelField){
                            this.dataField.labelField = this.dataSource.labelField;
                        }
                        let query = this.getQuery(this.dataSource);
                        // console.log(query);
                        this.$axios.postJson(this.dataSource.queryUrl || '/data/query', query,false,false).then(res => {
                            if (res.code == 1) {
                                this.rows = res.data.rows;
                            }
                        }).catch(() => {
                        });
                    }
                }
            },
            _getVal(){
                let v = this.$store.state.dic.dicData[this.dataSource.dic];
                if (v) {
                    this.dataField.valueField = v.valueField;
                    this.dataField.labelField = v.labelField;
                    if(this.dataSource.rule) {
                        this.rows = this.getFilterResult(v.data,this.dataSource.rule);
                    }else{
                        this.rows = v.data;
                    }
                }
            },
            change(val){
                this.$emit('change', val);
            },
            visibleChange(bool){
                this.$emit('visible-change', bool);
            },
            removeTag(tag){
                this.$emit('remove-tag', tag);
            },
            clear(){
                this.$emit('clear');
            },
            blur(event){
                this.$emit('blur',event);
            },
            focus(event){
                this.$emit('focus',event);
            }
        },
        watch:{
            //判断下拉框的值是否有改变
            svalue(newVal, oldVal) {
                if(newVal != oldVal){
                    this.$emit('input', this.svalue);
                    this.$parent.$parent && this.$parent.$parent.setQueryFieldValue && this.$parent.$parent.setQueryFieldValue(this.$attrs.prop,newVal);
                    this.$nextTick(()=>{this.$emit('label',this.$refs.select.$refs.reference.value)});
                }
            },
            value(newVal, oldVal){
                if(newVal != oldVal && !this.$listeners.label) {
                    this.svalue = this.value;
                }
            },
            casWatch(newVal, oldVal){
                if(this.loadData === false && !oldValue){
                    return;
                }
                if(newVal != oldVal) {
                    this._getData();
                }
            },
            getDic(newVal){
                if(this.dataSource.dic && newVal === this.dataSource.dic){
                    this._getVal();
                }
            }
        },
    };
</script>
<style scoped>
    .x-input-label{
        display:table-cell;
        vertical-align: middle;
        color: #909399;
        position: relative;
        white-space: nowrap;
    }
</style>
