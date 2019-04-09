const dic = {
    state: {
        change:null,
        dicData:{}
    },
    mutations: {
        setDicData(state,data){
            state.dicData[data.name] = data.data;
            state.change = data.name;
        },
        clearDicData(state,name){
            delete state.dicData[name];
            state.change = !state.change;
        },
    }
};

export default dic