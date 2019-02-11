const controlStyle = {
    state: {
        isCollapse: false,
        menu:null,
        size:'small'
    },
    mutations: {
        toggleSiderBar(state) {
            state.isCollapse = !state.isCollapse;
        },
        setMenu(state,data){
            state.menu = data;
        },
        setSize(state,data){
            state.size = data;
        }
    }
};

export default controlStyle
