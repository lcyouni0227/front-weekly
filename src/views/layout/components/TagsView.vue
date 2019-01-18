<template>
    <div class="tags-view">
        <div class="tags-outer">
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
            <div class="tags-labels">
                <el-tag
                        v-for="(item,i) in visitedViews"
                        size="large"
                        closable
                        :key="item.path"

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
            }
        },
        computed: {
            visitedViews() {
                return this.$store.getters.visitedViews
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
                    case 'close':
                        if (this.visitedViews.length === 1) break;
                        this.$store.dispatch('removeOtherTag', router);
                        break;
                }
            },
            closeTag(tag) {
                debugger
                if (this.visitedViews.length === 1) {
                    this.$router.push('index');
                }
                this.$store.dispatch('removeVisitedTag', tag);
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
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 2px 10px;

                .el-tag {
                    transition: all .3s;
                    border-radius: 2px;
                    cursor: pointer;
                    color: #000;
                    margin: 1px 4px 0px 0px
                }

            }

        }
    }
</style>
