import XLayoutMenu from './src/xlayout-menu';
import XLayoutTopbar from './src/xlayout-topbar';
import XLayoutTags from './src/xlayout-tags';
import XLayoutMain from './src/xlayout-main';

export default {
    install: (Vue) => {
        Vue.component(XLayoutMenu.name, XLayoutMenu);
        Vue.component(XLayoutTopbar.name, XLayoutTopbar);
        Vue.component(XLayoutTags.name, XLayoutTags);
        Vue.component(XLayoutMain.name, XLayoutMain);
    }
}

