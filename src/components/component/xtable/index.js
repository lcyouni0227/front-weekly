import XTableEdit from './src/xtable-edit';
import XTableColumn from './src/xtable-column';
import XTableTreeColumn from './src/xtable-tree-column';

export default {
    install: (Vue) => {
        Vue.component(XTableEdit.name, XTableEdit);
        Vue.component(XTableColumn.name, XTableColumn);
        Vue.component(XTableTreeColumn.name, XTableTreeColumn);
    }
}

