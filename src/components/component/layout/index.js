import XLayoutMenu from './xlayout-menu';
import XLayoutTopbar from './xlayout-topbar';
import XLayoutTags from './xlayout-tags';
import XLayoutMain from './xlayout-main';

export default {
    install: (Vue) => {
        Vue.component(XLayoutMenu.name, XLayoutMenu);
        Vue.component(XLayoutTopbar.name, XLayoutTopbar);
        Vue.component(XLayoutTags.name, XLayoutTags);
        Vue.component(XLayoutMain.name, XLayoutMain);
    }
}

