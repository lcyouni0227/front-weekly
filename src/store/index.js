import Vue from 'vue'
import Vuex from 'vuex'
import controlStyle from './modules/controlStyle'
import app from './modules/app'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        controlStyle,
        app
    },
});

