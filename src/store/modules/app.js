import Cookes from 'js-cookie';

const app = {
    state: {
        i18n: Cookes.get('i18n') || 'zh',
        visitedViews: [{name: "工作台", path: '/'}, {name: "工作台ddd", path: '/ddd'}]
    },
    mutations: {
        SET_LANGUAGE: (state, i18n) => {
            state.i18n = i18n;
            Cookes.set('i18n', i18n);
        },
        ADD_VISITED_TAG: (state, view) => {
            if (state.visitedViews.some(item => view.name === item.name)) {
                state.visitedViews.push({
                    name: view.name,
                    path: view.path
                })
            }
        },
        REMOVE_VISITED_TAG: (state, view) => {
            for (let [index, item] of state.visitedViews.entries()) {
                console.log(index)
                if (item.path === view.path) {
                    state.visitedViews.splice(index, 1);
                    break;
                }
            }
        },
        CLOSE_OTHER_TAG: (state, view) => {
            const newView = new Array({
                name: view.name,
                path: view.path
            });
            state.visitedViews = newView;
        },
        CLOSE_ALL_TAG: state => {
            state.visitedViews = [];

        }

    },
    actions: {
        setLanguage({commit}, i18n) {
            commit('SET_LANGUAGE', i18n);
        },
        addVisitedTag({commit}, view) {
            commit('ADD_VISITED_TAG', view);
        },
        removeVisitedTag({commit}, view) {
            // return new Promise(resolve => {
            commit('REMOVE_VISITED_TAG', view);
            //     resolve(state.visitedViews);
            // })
        },
        removeOtherTag({commit}, view) {
            commit('CLOSE_OTHER_TAG', view);
        },
        removeAllTag({commit}) {
            commit('CLOSE_ALL_TAG');
        }
    },
    getters: {
        i18n: state => state.i18n,
        visitedViews: state => state.visitedViews
    }
};

export default app
