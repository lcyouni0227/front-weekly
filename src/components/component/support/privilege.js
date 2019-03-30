/**
 * 获取权限操作按钮
 */

export default {
    props:{
        checkPrivilege:{type: Boolean, default: true},
        // dataSource:{type: Object, default(){return {}}},   /* 数据源配置 */
    },
    data(){
        return{
            buttons:{}, /* 有权限控制的所有操作按钮 */
            actionType:null
        };
    },
    created() {
        this._getPrivilegeButtons();
    },
    computed: {
        isAdd(){
            return this.actionType === 'add';
        },
        isEdit(){
            return this.actionType === 'edit';
        },
        isAddOrEdit(){
            return this.actionType === 'add' || this.actionType === 'edit';
        },
        isSee(){
            return this.actionType === 'see';
        }
    },
    methods: {
        _getPrivilegeButtons(){
            if(this.checkPrivilege) {
                if (this.dataSource.module || this.$parent.$data.module) {
                    this.$axios.postJson('/privilege/getButtons', this.dataSource.module || this.$parent.$data.module).then(res => {
                        if (res.code == 1) {
                            // console.log(res)
                            if(this.button){
                                this.buttons = Object.assign({},res.data.buttons,this.button)
                            }else{
                                this.buttons = res.data.buttons;
                            }
                        }
                    }).catch(() => {

                    });
                }
            }
        },
        handelRest(){
            this.actionType = null;
        },
        handelFormAdd(formInstance){
            this.actionType = 'add';
            console.log(formInstance)
            formInstance.resetFields();
        },
        handelFormEdit(formInstance){
            this.actionType = 'edit';
        },
        handelFormSave(formInstance){
            this.actionType = null;
        },
        handelFormDel(formInstance){
            this.actionType = null;
        },
        handelFormCancel(formInstance){
            this.actionType = null;
        }
    }
}