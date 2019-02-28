<!-- 图标选择器 -->
<template>
    <el-popover ref="popover" placement="bottom-start">
        <el-table :data="data" border :show-header=false :fit=true style="width:100%;overflow: auto" :max-height="dialogHeight" @cell-click="cell">
            <template v-for="(v,index) in cols">
                <el-table-column :prop="'cc'+index" :key="index" align="center" >
                    <template slot-scope="scope" >
                        <i :class="scope.row[index]"></i>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-input ref="input" slot="reference" readonly clearable v-model="labelModel" :style="`width: ${width}px`" suffix-icon="el-icon-arrow-down" :placeholder="placeholder">
            <i slot="prefix" :class="labelModel + ' el-input__icon'"></i>
        </el-input>
    </el-popover>
</template>

<script>
    export default {
        name: 'XSelectIcon',
        props: {
            value: String, /* 接收绑定参数 */
            width: String, /* 输入框宽度 */
            dialogWidth:String, /*  弹出框宽度 */
            dialogHeight:{String,default:'300px'}, /* 弹出框高度 */
            placeholder: {type: String,default: '请选择图标'}
        },
        mounted() {
            let c = this.width;
            if(this.dialogWidth){
                c = parseInt(this.dialogWidth);
            }else{
                if(!c){
                    c = this.$refs.input.$el.clientWidth;
                }
            }
            c = Math.floor(c/80);
            c = c <= 0?1:c;
            this.cols = new Array(c);
            let it=[],i=0;
            for(let v of this.icons){
                if(i<c){
                    i++;
                    it.push(v);
                }else{
                    this.data.push(it);
                    it=[];
                    i=0;
                }
            }
            if(i>0){
                this.data.push(it);
            }
        },

        data() {
            return {
                labelModel: this.value,
                cols: [],
                data: [],
                icons: ['el-icon-info', 'el-icon-error', 'el-icon-success', 'el-icon-warning', 'el-icon-question', 'el-icon-back', 'el-icon-arrow-left', 'el-icon-arrow-down', 'el-icon-arrow-right', 'el-icon-arrow-up', 'el-icon-caret-left', 'el-icon-caret-bottom', 'el-icon-caret-top', 'el-icon-caret-right', 'el-icon-d-arrow-left', 'el-icon-d-arrow-right', 'el-icon-minus', 'el-icon-plus', 'el-icon-remove', 'el-icon-circle-plus', 'el-icon-remove-outline', 'el-icon-circle-plus-outline', 'el-icon-close', 'el-icon-check', 'el-icon-d-caret', 'el-icon-sort', 'el-icon-sort-down', 'el-icon-sort-up', 'el-icon-tickets', 'el-icon-document', 'el-icon-goods', 'el-icon-sold-out', 'el-icon-news', 'el-icon-message', 'el-icon-date', 'el-icon-printer', 'el-icon-time', 'el-icon-bell', 'el-icon-mobile-phone', 'el-icon-service', 'el-icon-view', 'el-icon-menu', 'el-icon-more', 'el-icon-more-outline', 'el-icon-star-on', 'el-icon-star-off', 'el-icon-location', 'el-icon-location-outline', 'el-icon-phone', 'el-icon-phone-outline', 'el-icon-picture', 'el-icon-picture-outline', 'el-icon-delete', 'el-icon-search', 'el-icon-edit', 'el-icon-edit-outline', 'el-icon-rank', 'el-icon-refresh', 'el-icon-share', 'el-icon-setting', 'el-icon-upload', 'el-icon-upload2', 'el-icon-download', 'el-icon-loading']
            };
        },
        methods: {
            cell(row, column){
                let index = parseInt(column.property.substr(2));
                this.labelModel =row[index];
                this.$refs.popover.showPopper = false;
                this.$emit('input',this.labelModel);
            }
        },
    };
</script>

<style scoped>
    .cell > i:before, .el-input__prefix > i:before {
        font-size: 20px;
    }
</style>
