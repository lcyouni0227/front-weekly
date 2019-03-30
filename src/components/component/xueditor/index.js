import XUeditor from './src/xueditor';

XUeditor.install = function(Vue) {
    Vue.component(XUeditor.name, XUeditor);
};

export default XUeditor;
