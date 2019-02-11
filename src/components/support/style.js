import store from '@/store';

/** 控件大小 */
function size() {
    return store.state.controlStyle.size;
}

export default {
    size
}