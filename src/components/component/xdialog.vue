<template>
    <transition
        name="dialog-fade"
        @after-enter="afterEnter"
        @after-leave="afterLeave">
        <div class="el-dialog__wrapper" v-dialogDrag v-show="visible" @click.self="handleWrapperClick">
            <div
                role="dialog"
                aria-modal="true"
                :aria-label="title || 'dialog'"
                class="el-dialog custom-dialog"
                :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
                ref="dialog"
                :style="style">
                <div class="el-dialog__header">
                    <slot name="title">
                        <span class="el-dialog__title">{{ title }}</span>
                    </slot>
                    <button
                        type="button"
                        class="el-dialog__headerbtn"
                        aria-label="Close"
                        v-if="showClose"
                        @click="handleClose">
                        <i class="el-dialog__close el-icon el-icon-close"></i>
                    </button>
                </div>
                <div class="el-dialog__body custom" v-if="rendered"><slot></slot></div>
                <div class="el-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Dialog} from 'element-ui';
    export default {
        name: "XDialog",
        mixins:[Dialog],
        directives:{
            dialogDrag:{
                bind(el) {
                    const dialogHeaderEl = el.querySelector('.el-dialog__header');
                    const dragDom = el.querySelector('.el-dialog');
                    dialogHeaderEl.style.cursor = 'move';
                    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
                    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
                    dialogHeaderEl.onmousedown = (e) => {
                        // 鼠标按下，计算当前元素距离可视区的距离
                        const disX = e.clientX - dialogHeaderEl.offsetLeft;
                        const disY = e.clientY - dialogHeaderEl.offsetTop;

                        // 获取到的值带px 正则匹配替换
                        let styL, styT;
                        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                        if(sty.left.includes('%')) {
                            // styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                            // styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                            styL = +document.body.clientWidth * (+sty.left.replace('%', '') / 100);
                            styT = +document.body.clientHeight * (+sty.top.replace('%', '') / 100);
                        }else {
                            // styL = +sty.left.replace(/\px/g, '');
                            // styT = +sty.top.replace(/\px/g, '');
                            styL = +sty.left.replace('px', '');
                            styT = +sty.top.replace('px', '');
                        }
                        document.onmousemove = (e) => {
                            // 通过事件委托，计算移动的距离
                            const l = e.clientX - disX;
                            const t = e.clientY - disY;

                            // 移动当前元素
                            dragDom.style.left = `${l + styL}px`;
                            dragDom.style.top = `${t + styT}px`;

                            //将此时的位置传出去
                            //binding.value({x:e.pageX,y:e.pageY})
                        };

                        document.onmouseup = () => {
                            document.onmousemove = null;
                            document.onmouseup = null;
                        };
                    }
                }
            },
            // dialogDragWidth:{
            //     bind(el) {
            //         const dragDom = el.querySelector('.el-dialog');
            //         // const dragDom = binding.value.$el.querySelector('.el-dialog');
            //         el.onmousedown = (e) => {
            //             // 鼠标按下，计算当前元素距离可视区的距离
            //             const disX = e.clientX - el.offsetLeft;
            //             document.onmousemove = function (e) {
            //                 e.preventDefault(); // 移动时禁用默认事件
            //                 // 通过事件委托，计算移动的距离
            //                 const l = e.clientX - disX;
            //                 dragDom.style.width = `${l}px`;
            //             };
            //
            //             document.onmouseup = function (e) {
            //                 document.onmousemove = null;
            //                 document.onmouseup = null;
            //             };
            //         }
            //     }
            // }
        }
    }
</script>
<style scoped>
    .custom-dialog{
        position:absolute;
        top:50%;
        left:50%;
        margin: 0 !important;
        transform:translate(-50%, -50%);
        display:flex !important;
        flex-direction:column;
        overflow:auto;
        max-height:calc(100% - 30px);
        max-width:calc(100% - 30px);
    }
    .el-dialog .el-dialog__header{
        background-color:#f3f5f6;
    }
    .custom{
        overflow:auto
    }
</style>