const controlStyle = {
    state: {
        isCollapse: false,
        size:'small'
    },
    mutations: {
        toggleSiderBar(state) {
            state.isCollapse = !state.isCollapse;
        },
        setSize(state,data){
            state.size = data;
        }
    }
};

export default controlStyle
