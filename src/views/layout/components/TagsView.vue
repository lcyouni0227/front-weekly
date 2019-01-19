<template>
    <div class="tags-view">
        <div ref="tagsView"
             class="tags-outer"

             @mousewheel="handlescroll"
             @DOMMouseScroll="handlescroll"
        >
            <div class="tags-handle">
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary" class="el-dropdown-link">下拉菜单<i
                            class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="tags-labels"
                 ref="tagsScroll"
                 :style="{ left: tagsScrollLeft + 'px' }">
                <el-tag
                        ref="tag"
                        v-for="(item) in visitedViews"
                        size="large"
                        closable
                        :key="item.path"
                        :class="item.name==viewName? 'el-tag-active' : ''"
                        @click.native="goto(item)"
                        @close="closeTag(item)"
                >
                    {{item.name}}
                </el-tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tagsView",
        data() {
            return {
                viewName: '',
                tagsScrollLeft: 0
            }
        },
        mounted() {
            this.addViewTag()

        },
        computed: {
            visitedViews() {
                return this.$store.getters.visitedViews
            }
        },
        watch: {
            $route() {
                this.addViewTag();
            }
        },
        methods: {
            handleCommand(command) {
                const router = this.$route;
                switch (command) {
                    case "closeAll":
                        this.$store.dispatch('removeAllTag');
                        this.$router.push('/');
                        this.viewName = 'index';
                        break;
                    case 'closeOther':
                        if (this.visitedViews.length === 1) break;
                        this.$store.dispatch('removeOtherTag', router);
                        break;
                }
            },
            closeTag(tag) {
                if (this.visitedViews.length === 1) {
                    this.$router.push('index');
                }
                this.$store.dispatch('removeVisitedTag', tag);
            },
            goto(tag) {
                this.$router.push(tag.path);
                this.viewName = tag.name;

            },
            addViewTag() {
                const route = this.$route;
                if (!route.name) {
                    return false;
                }
                this.viewName = route.name;
                this.$store.dispatch('addVisitedTag', route)

            },
            handlescroll(event) {
                console.log( this.$refs.tagsView.offsetWidth)
                let type = event.type;
                let delta = 0;
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0) * 40
                }
                let left = 0;
                if (delta > 0) {
                    left = Math.min(0, this.tagsScrollLeft + delta)
                } else {
                    console.log('sdfsdf', this.$refs.tagsView.offsetWidth)
                    if (this.$refs.tagsView.offsetWidth - 100 < this.$refs.tagsScroll.offsetWidth) {
                        if (this.tagsScrollLeft <-(this.$refs.tagsScroll.offsetWidth - this.$refs.tagsView.offsetWidth + 100)) {
                            left = this.tagsScrollLeft
                        } else {
                            left = Math.max(
                                this.tagsScrollLeft + delta,
                                this.$refs.tagsView.offsetWidth -
                                this.$refs.tagsScroll.offsetWidth -
                                100
                            )
                        }
                    } else {
                        this.tagsScrollLeft = 0
                    }
                }
                this.tagsScrollLeft = left
            }
        }
    }
</script>

<style lang="less" scoped>
    .tags-view {
        width: 100%;
        height: 40px;
        position: relative;
        top: 0;
        left: 0;
        z-index: 3;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        border-top: 1px solid #e6e6e6;
        overflow: hidden;
        box-sizing: border-box;

        .tags-outer {
            width: 100%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            padding-right: 120px;

            .tags-handle {
                overflow: hidden;
                width: 108px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                box-sizing: border-box;
                text-align: center;
                background-color: white;
                box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
                z-index: 20;

                .el-button {
                    border-radius: 0;
                    padding: 12px 16px;
                }
            }

            .tags-labels {
                height: 100%;
                box-sizing: border-box;
                padding: 2px 10px;
                position: absolute;

                .el-tag {
                    transition: all .3s;
                    border-radius: 2px;
                    cursor: pointer;
                    margin: 1px 4px 0px 0px;
                    user-select: none;
                }

                .el-tag-active {
                    background-color: rgba(64, 158, 255, 0.3) !important;
                }

            }

        }
    }
</style>
