<template>
    <el-form-item>
        <slot>
            <x-input v-model="queryField" v-bind="$attrs"></x-input>
        </slot>
    </el-form-item>
</template>
<script>
    export default {
        name:'XQueryItem',
        data(){
            return {
                queryField:''
            }
        },
        watch:{
            queryField(newValue){
                this.setQueryFieldValue(this.$attrs.prop,newValue);
            }
        },
        mounted() {
            if(this.$attrs.opt){
                this.$parent && this.$parent.$parent.setOpt && this.$parent.$parent.setOpt(this.$attrs.prop,this.$attrs.opt);
            }
        },
        methods:{
            setQueryFieldValue(prop,val){
                prop = prop || this.$attrs.prop;
                if(prop){
                    this.$parent && this.$parent.$parent.changValue && this.$parent.$parent.changValue(prop,val);
                }
            }
        }
    };
</script>