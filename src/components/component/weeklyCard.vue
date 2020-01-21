<template>
    <el-card class="box-card" :style="`width: ${width}px`">
        <div slot="header" class="header">
            <div>
                <span>{{cardName}}</span>
                <span class="date">{{date}}</span>
            </div>
            <el-button style="float: right; padding: 3px 0" type="text" @click="editClick">{{edit}}</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="viewClick">{{view}}</el-button>
        </div>
        <div>
            <p class="weekSump">{{sumup}}</p>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "weeklyCard",
        props: {
            width: {type: String, default: '320'},
            date: {type: String},
            cardName: {type: String, default: ''},
            view: {type: String, default: '查看详情'},
            sumup: {type: String, default: ''},
            edit: {type: String, default: ''},
        },
        methods: {
            viewClick() {
                this.$emit("viewClick");
            },
            editClick(){
                this.$emit("editClick");
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 320px;
    }

    .weekSump {
        line-height: 22px;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }
    .date{
        display: inline-block;
        margin-left: 13px;
    }
</style>
