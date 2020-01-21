<template>
    <div class="dashboard">
        <div v-if="showEcharts" style="width: 100%;">
            <p class="confirm">您好，当前为第{{nowweek}}周</p>
            <div class="vcharts">
                <div class="chart">
                    <p class="chartTitle">当前周提交</p>
                    <ve-pie :data="pieChartData" style="width: 500px;height: 400px;" :extend="extend"></ve-pie>
                </div>
                <div class="chart">
                    <p class="chartTitle">成员提交</p>
                    <ve-histogram :data="histogramChartData" style="width: 500px;height: 400px;" :extend="extend"></ve-histogram>
                </div>
            </div>
        </div>
        <p class="tishi" v-else> 您好,当前是第{{nowweek}}周，请尽快填写周报</p>
    </div>
</template>

<script>
    import "@/common/icon/iconfont.css"
    import support from '@/views/support/support'
    import "echarts/lib/component/title";

    export default {
        name: 'dashboard',
        mixins: [support],
        data() {
            this.extend = {
                series: {
                    label: { show: true, position: "top" }
                }
            }
            return {
                nowweek: '',
                showEcharts: false,
                total:'',
                form: {
                    privilege: ''
                },
                pieChartData: {
                    columns: ['日期', '完成'],
                    rows: [ ]
                },
                histogramChartData: {
                    columns: ['日期', '已提交'],
                    rows: []
                }
            }
        },
        created() {
            this.nowweek = this.getWeekOfYear()
            this.form.privilege = sessionStorage.getItem("privilege") || '';
            if (this.form.privilege == 210 || this.form.privilege == 310) {
                this.showEcharts = true
            }
            this.getHistogramData();
            this.getPieChartData();
        },
        methods: {
            getPieChartData(){
                var params = {name: '', post: '', group_num: '', page:1, row:100, nowweek: this.nowweek}
                this.$axios.postJson('/public/userquery.do', params).then((res) => {
                    // console.log(res.userlist)
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else {

                            this.pieChartData.rows.push(
                                {'日期': '完成', '完成': `${res.userlist.length}`},
                                {'日期': '未完成', '完成':` ${this.total - res.userlist.length}`})
                        console.log('res.userlist.length:',res.userlist.length,",this.total",this.total,'this.total - res.userlist.length',this.total - res.userlist.length)
                        console.log("this.pieChartData",this.pieChartData)
                    }
                })
            },
            getHistogramData(){
                var params = {name: '', post: '', group_num: '', page:1, row:100, nowweek:'',}
                this.$axios.postJson('/public/userquery.do', params).then((res) => {
                    // console.log('getHistogramData   ',res.userlist)
                    if (res.code == -1) {
                        this.$router.push({path: '/login'})
                    } else {
                        console.log("row",res.userlist,'total',this.total)
                        for(var i = 0 ;i<res.userlist.length;i++){
                            this.histogramChartData.rows.push({'日期': `${res.userlist[i].realname}`, '已提交': Number(`${res.userlist[i].count}`),})
                        }
                        this.total = res.userlist.length;
                        // console.log("this.histogramRow",this.histogramChartData,'total',this.total)
                    }
                    if(res.userlist.length==0){
                        this.histogramChartData.rows.push(
                            {'日期': '方', '已提交': 4,},
                            {'日期': '晨', '已提交': 7,},
                            {'日期': '政', '已提交': 2,},
                            {'日期': '亮', '已提交': 2,},
                            {'日期': '杨', '已提交': 5,},
                            {'日期': '鹏', '已提交': 6,},
                            {'日期': '国', '已提交': 4,},
                            {'日期': '燕', '已提交': 5,},
                            {'日期': '禹', '已提交': 6,},
                        )
                    }
                })
            },
        }
    };
</script>
<style scoped lang="less">
    .dashboard {
        /*background-color:#eeeeee;*/
        height: 100%;
        width: 100%;
        /*padding: 15px;*/
        display: flex;
        justify-content: space-between;
        .confirm{
            font-size: 28px;
            margin: 20px 100px;
        }
        .vcharts {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 60px;
            .chart {
                -webkit-border-radius: 5px;
                border-radius: 5px;
                padding: 35px 35px 15px;
                height: 400px;
                background: #fff;
                border: 1px solid #eaeaea;
                box-shadow: 0 0 25px #cac6c6;
                .chartTitle{
                    font-size: 22px;
                    font-weight: 500;
                }
            }
        }
        .tishi {
            font-size: 22px;
            margin: 0 auto;
            line-height: 200px;
            height: 200px;
        }
    }

    .card {
        margin-right: 50px;
    }
</style>
