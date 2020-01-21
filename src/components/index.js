
import XInput from './component/xinput';
import XFormItem from './component/xform-item'

export default {
    install: (Vue) => {
        Vue.component(XInput.name, XInput);
        Vue.component(XFormItem.name, XFormItem);
    }
}
