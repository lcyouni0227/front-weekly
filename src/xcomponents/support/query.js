let query = {
    // name:'query',
    created: function () {
        if(!this.query){
            this.query={};
        }
        console.log('混合对象的钩子被调用')
    }
};

export default {
    query
}