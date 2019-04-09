<template>
    <el-form inline ref="queryForm">
        <slot></slot>
        <el-form-item>
            <el-button @keyup.enter.native="handelQuery()" @click="handelQuery()" size="mini" type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name:'XQuery',
        props: {
            targetRef:String,  /* 依附的查询对象 */
            queryFunction:Function
        },
        data(){
            return {
                query: {querySymbol: {}},
            }
        },
        methods: {
            getRule(){
                return this.query;
            },
            getRuleFormat(){
                let rule=[];
                for(let key in this.query){
                    if(key != "querySymbol" && this.query[key] !=='' && this.query[key] !==undefined) {
                        let item = {};
                        item.name = key;
                        item.val = this.query[key];
                        if (this.query.querySymbol['query.' + key]) {
                            item.opt = this.query.querySymbol['query.' + key];
                        } else {
                            item.opt = '=';
                        }
                        rule.push(item);
                    }
                }
                if(rule.length>0){
                    return rule;
                }
                return null;
            },
            changValue(key,val){
                this.query[key] = val;
            },
            setOpt(key,val){
                this.query.querySymbol['query.' + key] = val;
            },
            handelQuery(){
                if(this.$options._parentListeners && this.$options._parentListeners.click){
                    this.$emit("click",this.getRuleFormat());
                }else {
                    if (this.queryFunction) {
                        this.queryFunction(this.query, this.getRuleFormat());
                    } else {
                        if(this.targetRef){
                            let p = this.targetRef.split(".");
                            let com = this.$parent;
                            for(let v of p){
                                com = com[v];
                            }
                            com && com.handelQuery && com.handelQuery(this.getRuleFormat());
                        }else {
                            let parent = this.$parent;
                            while (!parent.handelQuery) {
                                parent = parent.$parent;
                            }
                            parent.handelQuery && parent.handelQuery(this.getRuleFormat());
                        }
                    }
                }
            }
        }
    };
</script>