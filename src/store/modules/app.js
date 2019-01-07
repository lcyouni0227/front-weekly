import Cookes from 'js-cookie';

const app = {
    state: {
        i18n: Cookes.get('i18n') || 'zh'
    },
    mutations: {
        SET_LANGUAGE: (state, i18n) => {
            state.i18n = i18n;
            Cookes.set('i18n', i18n);
        }
    },
    actions: {
        setLanguage({commit}, i18n) {
            commit('SET_LANGUAGE', i18n);
        }
    },
    getters: {
        i18n:state=>state.i18n
    }
};

export default app
