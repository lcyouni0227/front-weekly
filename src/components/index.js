import XSplitter from './component/xsplitter';
import XTableColumn from './component/xtable-column';
import XTableTreeColumn from './component/xtable-tree-column';

import XTableEdit from './component/xtable-edit';
import XSelect from './component/xselect';

export default {
    install: (Vue) => {
        Vue.component(XSplitter.name, XSplitter);
        Vue.component(XTableColumn.name, XTableColumn);
        Vue.component(XTableTreeColumn.name, XTableTreeColumn);

        Vue.component(XTableEdit.name, XTableEdit);
        Vue.component(XSelect.name, XSelect);

    }
}
