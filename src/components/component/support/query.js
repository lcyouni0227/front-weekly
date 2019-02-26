export default {
    data(){
        return {
            labelX:this.label
        }
    },
    props: {
        prop: String,  /* 查询字段名称 */
        label: String,  /* 文本框前面的文字 */
    },
    methods:{
        _formQuery() {
            let parent = this.$parent;
            while (!parent.query || !parent.query.querySymbol) {
                parent = parent.$parent;
            }
            if(parent.query && parent.query.querySymbol){
                return parent;
            }else{
                return null;
            }

        },
        _formQueryItem() {
            let parent = this.$parent;
            while (parent.$options._componentTag !== 'x-query-item') {
                parent = parent.$parent;
            }
            if(parent.$options._componentTag === 'x-query-item'){
                return parent;
            }else{
                return null;
            }

        },
        _checkQuery(){
            if(!this.value){
                let v = this._formQuery();
                if(v){
                    let field;
                    if(this.prop){
                        field = this.prop;
                    }else{
                        let p = this._formQueryItem();
                        if(p){
                            if(p.$attrs.label){
                                this.labelX = p.$attrs.label;
                            }
                            if(p.$attrs.prop){
                                field = p.$attrs.prop;
                            }else{
                                console.error('查询区控件无字段名，请设置prop属性');
                            }
                        }
                    }
                    if(this.$attrs.opt){
                        v.setOpt(field,this.$attrs.opt);
                    }
                    return {v:v,field:field};
                }
            }
            return null;
        }
    }
}