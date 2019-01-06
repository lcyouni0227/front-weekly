const controlStyle = {
    state: {
        isCollapse: false,
    },
    mutations: {
        toggleSiderBar(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}

export default controlStyle
