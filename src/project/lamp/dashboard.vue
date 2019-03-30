<template>
    <div class="dashboard">
        <x-card icon="icon-online" class="card" title="楼栋数量" :value="2019" :time="1000" width="280" height="110" suffix=" 栋" iconColor="#ED594E"></x-card>
        <x-card icon="icon-online" class="card" title="房间数量" :value="2019" :time="1000" width="280" height="110" suffix=" 间" iconColor="#ED594E"></x-card>
        <x-card icon="icon-online" class="card" title="灯盏数量" :value="2019" :time="1000" width="280" height="110" suffix=" 间" iconColor="#ED594E"></x-card>
        <x-card icon="icon-online" class="card" title="运行数量" :value="2019" :time="1000" width="280" height="110" suffix=" 间" iconColor="#ED594E"></x-card>
    </div>
</template>

<script>
    import "@/project/lamp/icon/iconfont.css"
    import XCard from '../../components/component/xcard'
    export default {
        name:'dashboard',
        components: {XCard},
        methods:{
        }
    };
</script>
<style scoped>
    .dashboard{
        background-color:#eeeeee;
        height:100%;
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
    .card{
        margin-right: 50px;
    }
</style>