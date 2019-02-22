import XSplitter from './component/xsplitter';
import XTableColumn from './component/xtable-column';
import XTableTreeColumn from './component/xtable-tree-column';

import XTableEdit from './component/xtable-edit';
import XSelect from './component/xselect';
import XSelectTree from './component/xselect-tree';
import XSelectIcon from './component/xselect-icon';
import XTree from './component/xtree';
import XInput from './component/xinput';
import XCodeEditSql from './component/xcode-edit-sql';
import XDialog from './component/xdialog';

export default {
    install: (Vue) => {
        Vue.component(XSplitter.name, XSplitter);
        Vue.component(XTableColumn.name, XTableColumn);
        Vue.component(XTableTreeColumn.name, XTableTreeColumn);

        Vue.component(XTableEdit.name, XTableEdit);
        Vue.component(XSelect.name, XSelect);
        Vue.component(XSelectTree.name, XSelectTree);
        Vue.component(XSelectIcon.name, XSelectIcon);
        Vue.component(XTree.name, XTree);
        Vue.component(XInput.name, XInput);
        Vue.component(XCodeEditSql.name, XCodeEditSql);
        Vue.component(XDialog.name, XDialog);

    }
}
