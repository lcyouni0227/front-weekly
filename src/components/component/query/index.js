import XQuery from './src/xquery';
import XQueryItem from './src/xquery-item';

export default {
    install: (Vue) => {
        Vue.component(XQuery.name, XQuery);
        Vue.component(XQueryItem.name, XQueryItem);
    }
}

