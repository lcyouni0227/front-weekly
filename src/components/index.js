import XSplitter from './component/xsplitter';

import XTableEdit from './component/xtable-edit';
import XSelect from './component/xselect';

export default {
    install: (Vue) => {
        Vue.component(XSplitter.name, XSplitter);

        Vue.component(XTableEdit.name, XTableEdit);
        Vue.component(XSelect.name, XSelect);

    }
}
