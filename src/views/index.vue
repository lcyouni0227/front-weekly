<template>
    <el-container style="height: 100%">
        <el-header height="70px">
            <div class="platform-index-title">
                <img src="../assets/logo.png" class="platform-index-title-img"/>
                <span class="platform-index-title-text-big">自定义管理平台</span>

            </div>
        </el-header>
        <el-container>
            <el-aside style="width: 200px;background-color:#545c64">
                <el-menu
                        default-active="1-4-1"
                        class="side_menu"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="isCollapse"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-item i,
    .el-submenu__title i {
        color: #fff;
        vertical-align: sub;
    }


    .item-message sup {
        top: 25px !important;
    }

    a {
        text-decoration: none;
    }

    .platform-index-title {
        line-height: 70px;
    }

    .platform-index-title-img {
        vertical-align: middle;
        width: 40px;
        height: 40px;
    }

    .platform-index-title-text-big {
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
    }

    .platform-index-title-text-narmal {
        font-size: 20px;
    }

    .platform-index-nav-title {
        height: 56px;
        color: #fff;
        background-color: #005b8c;
        line-height: 56px;
        padding: 0 20px;
    }

    .el-dialog__body {
        max-height: 400px;
        overflow: auto !important;
    }

    .nav-icon {
        width: 18px;
        height: 18px;
        font-size: 18px;
        margin-right: 5px;
        display: inline-block;
    }

    .el-submenu .el-menu-item {
        min-width: 190px;
    }
</style>
