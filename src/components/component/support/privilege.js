/**
 * 获取权限操作按钮
 */

export default {
    data(){
        return{
            buttons:{} /* 有权限控制的所有操作按钮 */
        };
    },
    created() {
        this._getPrivilegeButtons();
    },
    methods: {
        _getPrivilegeButtons(){
            if(this.showRowButton || this.showTopButton) {
                if (this.dataSource.module || this.$parent.$data.module) {
                    this.$axios.postJson('/privilege/getButtons', this.dataSource.module || this.$parent.$data.module).then(res => {
                        if (res.code == 1) {
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
    }
}