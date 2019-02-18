<template>
    <!-- 行模式 -->
    <el-form inline>
        <!--<el-form-item nameField="inline 默认：">-->
            <!--<x-select-tree :options="options" v-model="selected" />-->
        <!--</el-form-item>-->
        <el-form-item >
            <x-select-icon width="500" max-height="200" v-model="xxp"/>
            <el-input  v-model="cc" suffix-icon="el-icon-arrow-down">
            </el-input>
        </el-form-item>

    </el-form>
    <!-- 块模式 -->
    <!--<el-form inline>-->
        <!--<el-form-item nameField="自适应：">-->
            <!--<x-select-tree width="200" v-model="selected" :options="treeData" :props="defaultProps"/>-->
        <!--</el-form-item>-->
    <!--</el-form>-->
</template>
<script>

    export default {
        name: 'about',
        data(){
            return {
                xxp:'a',
                cc:'sss'
            }
        }
    };
</script>