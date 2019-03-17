<template>
        <div class="network-bg">
            <div class="network-content">
                <h1 style="font-size: 120px;">
                    404
                </h1>
                <p style="margin-top: 30px">抱歉，你访问的页面不存在</p>
                <el-button @click="backToIndex" size="mini" type="primary" style="margin-top: 30px">返回工作台</el-button>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Error",
        methods: {
            backToIndex() {
                this.$router.push("/");
            }
        }
    }
</script>
<style scoped>
    .network-bg {
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .network-content {
    }
</style>
