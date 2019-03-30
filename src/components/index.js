import XSplitter from './component/xsplitter';
import XTableColumn from './component/xtable-column';
import XTableTreeColumn from './component/xtable-tree-column';

import XTableEdit from './component/xtable-edit';
import XSelect from './component/xselect';
import XSelectTree from './component/xselect-tree';
import XSelectIcon from './component/xselect-icon';
import XSelectColor from './component/xselect-color';
import XSelectTable from './component/xselect-table'
import XTree from './component/xtree';
import XInput from './component/xinput';
import XCodeEditSql from './component/xcode-edit-sql';
import XPanel from './component/xpanel';
import XQuery from './component/xquery';
import XQueryItem from './component/xquery-item';
import XUEditor from './component/xueditor'
import XTreeMenu from './component/xtree-menu'
import XDialog from './component/xdialog';
import XDialogEdit from './component/xdialog-edit'
import XFormItem from './component/xform-item'
import XToolBar from './component/xtool-bar'
import XButton from './component/xbutton'

export default {
    install: (Vue) => {
        Vue.component(XSplitter.name, XSplitter);
        Vue.component(XTableColumn.name, XTableColumn);
        Vue.component(XTableTreeColumn.name, XTableTreeColumn);
        Vue.component(XTableEdit.name, XTableEdit);
        Vue.component(XSelect.name, XSelect);
        Vue.component(XSelectTree.name, XSelectTree);
        Vue.component(XSelectIcon.name, XSelectIcon);
        Vue.component(XSelectColor.name, XSelectColor);
        Vue.component(XSelectTable.name, XSelectTable);
        Vue.component(XTree.name, XTree);
        Vue.component(XInput.name, XInput);
        Vue.component(XCodeEditSql.name, XCodeEditSql);
        Vue.component(XPanel.name, XPanel);
        Vue.component(XQuery.name, XQuery);
        Vue.component(XQueryItem.name, XQueryItem);
        Vue.component(XUEditor.name, XUEditor);
        Vue.component(XTreeMenu.name, XTreeMenu);
        Vue.component(XDialog.name, XDialog);
        Vue.component(XDialogEdit.name, XDialogEdit);
        Vue.component(XFormItem.name, XFormItem);
        Vue.component(XToolBar.name, XToolBar);
        Vue.component(XButton.name, XButton);
    }
}
