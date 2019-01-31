import xtableEdit from './xtableEdit';
// import query from './support/query';

export default {
    install: (Vue) => {
        Vue.component(xtableEdit.name, xtableEdit);
        // Vue.component('query',{
        //     created: function () {
        //         if(!this.query){
        //             this.query={};
        //         }
        //         // console.log('混合对象的钩子被调用')
        //     }
        // });
    }
}
