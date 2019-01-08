import Vue from 'vue'
import Vuex from 'vuex'
import controlStyle from './modules/controlStyle'
import app from './modules/app'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        controlStyle,
        user,
        app
    },
    getters
});

