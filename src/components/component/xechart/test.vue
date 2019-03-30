<template>
    <div>
        <x-echart v-model="mock"  @init="init" :size="{width: 400, height: 400}" ></x-echart>
    </div>
</template>

<script>
    import XEchart from '@/components/component/xechart'
    export default {
        components: {XEchart},
        data() {
            return {
                mock: {
                    // 'series': [{
                    //     'name': 'gauge',
                    //     'type': 'gauge',
                    //     'detail': {'formatter': '{value}'},
                    //     'data': [{'value': 34}]
                    // }]
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            data:[
                                {value:235, name:'视频广告'},
                                {value:274, name:'联盟广告'},
                                {value:310, name:'邮件营销'},
                                {value:335, name:'直接访问'},
                                {value:400, name:'搜索引擎'}
                            ]
                        }
                    ]
                }
             }
        },
        methods:{
            init(echart){
                console.log(echart)
            }
        }
    }
</script>