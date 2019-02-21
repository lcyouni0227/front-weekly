<!-- 左右分栏可拖动改变大小 -->
<template>
    <div class="splitterContent" v-bind="$attrs">
        <!-- 左边内容部分 -->
        <transition name='left'>
            <div class='layout-splitter-left' :style="leftstyle" >
                <slot name="left"></slot>
            </div>
        </transition>
        <!-- 分割线部分 -->
        <div class='layout-area'>
            <!--<div @click="slide"></div>-->
        </div>
        <!-- 拖动代理div -->
        <div class='layout-splitter-proxy' @mousedown.prevent='dragStart'></div>
        <!-- 右边内容部分 -->
        <div class='layout-splitter-right' :style="rightstyle">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'XSplitter',
        props: {
            styles: String,
            leftstyle:String,
            rightstyle:String
        },
        methods:{
            /*左侧伸缩隐藏*/
            // slide(){
            //     this.leftshow = !this.leftshow;
            //     let proxyDom = document.querySelector('.layout-splitter-proxy');
            //     let leftDom = document.querySelector('.layout-splitter-left');
            //     let rightDom = document.querySelector('.layout-splitter-right');
            //     if(!this.leftshow){ //隐藏左侧div
            //         proxyDom.style.left = '0px';
            //         leftDom.style.width = '0px';
            //         rightDom.style.width = 'calc(100% - 5px)';
            //     }else{
            //         // let that = this;
            //         setTimeout(()=>{
            //             proxyDom.style.left = '30%';
            //             leftDom.style.width = proxyDom.style.left;
            //             rightDom.style.width = 'calc(70% - 5px)';
            //         },30)
            //
            //     }
            // },
            /*拖拽*/
            dragStart(e){
                let leftDom = document.querySelector('.layout-splitter-left');
                let rightDom = document.querySelector('.layout-splitter-right');
                e.target.onmousedown = function(ev){
                    let disX = ev.clientX - e.target.offsetLeft;
                    document.onmousemove = function(ev){
                        e.target.style.left = (ev.clientX - disX) + 'px';
                    };
                    document.onmouseup = function(){
                        if(e.target.offsetLeft <= 0){
                            e.target.style.left = '0px';
                        }else if(e.target.offsetLeft >= document.querySelector('.splitterContent').offsetWidth-5){
                            e.target.style.left = (document.querySelector('.splitterContent').offsetWidth-5) + 'px';
                        }
                        // console.log(e.target.offsetLeft);
                        // console.log((parseInt(e.target.style.left)-13)+'px');
                        leftDom.style.width = (e.target.offsetLeft-11)+'px';
                        rightDom.style.width = 'calc(100% - 5px - ' + leftDom.style.width + ')';
                        document.onmousemove=null;
                        document.onmouseup=null;
                    };
                };
            },
        },
    }
</script>

<style scoped>
    .splitterContent {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 0px;
        height: 100%;
        width: 100%;
        position:relative;
    }
    /* 左侧伸缩样式 */
    .layout-splitter-left{
        width:30%;
        height:100%;
        float:left;
        transition:1.5s;
        margin-right: 10px;
    }
    /* 伸缩按钮部分 */
    .layout-area{
        width:2px;
        height:100%;
        float:left;
        position:relative;
        background-color: #efefef;
    }
    /* 伸缩按钮居中 */
    .layout-area>div{
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        background-color:#999;
        margin: auto 0px;
        height: 30px;
        padding-top:15px;
        cursor:pointer;
        z-index:999;
    }
    /* 拖拽div */
    .layout-splitter-proxy{
        position:absolute;
        cursor:col-resize;
        opacity:0.8;
        left:calc(30% + 10px);
        width:2px;
        height:100%;
        background-color: #efefef;
    }
    /* 右边部分样式 */
    .layout-splitter-right{
        float:right;
        width:calc(70% - 5px);
        height:100%;
        transition:1.5s;
        margin-left: 10px;
    }
</style>
