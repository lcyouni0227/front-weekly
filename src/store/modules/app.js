import Cookes from 'js-cookie';

const app = {
    state: {
        language: Cookes.get('language') || 'zh'
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookes.set('language', language);
        }
    },
    actions: {
        setLanguage({commit}, language) {
            commit('SET_LANGUAGE', language);

        }
    },
    getters: {
        language:state=>state.language
    }
};

export default app
