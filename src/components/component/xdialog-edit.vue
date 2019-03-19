<template>
    <x-dialog v-bind="$attrs" :visible.sync="dialogOpen" :showClose="false">
        <slot/>
        <div slot="footer">
            <slot name="footer"/>
            <el-button type="primary" @click="save" size="mini">保 存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </div>
    </x-dialog>
</template>

<script>
    export default {
        name: 'XDialogEdit',
        data(){
            return {
                dialogOpen:false,  /* 打开新增、修改、查看对话框 */
                action:null
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
                this.$parent.handelTableRowSave && this.$parent.handelTableRowSave(null,this.action,false);
                this.dialogOpen = false;
            },
            close(){
                this.dialogOpen = false;
            }
        }
    }
</script>