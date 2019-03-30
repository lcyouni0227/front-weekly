import XEchart from './src/xechart';

XEchart.install = function(Vue) {
    Vue.component(XEchart.name, XEchart);
};

export default XEchart;
