import XCard from './src/xcard';

XCard.install = function(Vue) {
    Vue.component(XCard.name, XCard);
};

export default XCard;
