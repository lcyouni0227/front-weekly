<template>
    <x-dialog v-bind="$attrs" :visible.sync="dialogOpen" :showClose="showClose">
        <slot/>
        <div slot="footer">
            <slot name="footer"/>
            <el-button v-if="action==='add' || action==='edit'" type="primary" @click="save" size="mini">保 存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </x-dialog>
</template>

<script>
    export default {
        name: 'XDialogEdit',
        props:{
            visible:{type:Boolean,default:false},
            showClose:{type:Boolean,default:false}
        },
        data(){
            return {
                dialogOpen: this.visible,  /* 打开新增、修改、查看对话框 */
                action:null
            }
        },
        // computed:{
        //     dialogOpen: function () {
        //         return visible;
        //     }
        // },
        watch:{
            visible(newVal){
                console.log(newVal);
                this.dialogOpen = newVal;
            }
        },
        methods: {
            open(action){
                this.dialogOpen = true;
                this.action = action;
            },
            cancel(){
                if(this.action === 'edit'){
                    this.$parent.handelDialogEditCancel && this.$parent.handelDialogEditCancel();
                }
                this.dialogOpen = false;
            },
            save(){
                if(this.$options._parentListeners && this.$options._parentListeners.save){
                    this.$emit("save");
                    this.dialogOpen = false;
                }else{
                    if(this.$parent.handelTableRowSave && this.$parent.handelTableRowSave(null,this.action,false)){
                        this.dialogOpen = false;
                    }
                }
            },
            close(){
                this.dialogOpen = false;
            }
        }
    }
</script>