import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zh from './zh.js';
import en from './en.js';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Cookier from 'js-cookie'
Vue.use(VueI18n);
const lang = {
    en: {
        ...enLocale,
        ...en
    },
    zh: {
        ...zhLocale,
        ...zh
    }
};
const i18n = new VueI18n({
    locale: Cookier.get('language')||'zh',
    messages:lang
});

export default i18n
