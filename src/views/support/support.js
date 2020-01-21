export default {
    methods: {
        getWeekOfYear() {
            var today = new Date();
            var firstDay = new Date(today.getFullYear(), 0, 1);
            var dayOfWeek = firstDay.getDay();
            var spendDay = 1;
            if (dayOfWeek != 0) {
                spendDay = 7 - dayOfWeek + 1;
            }
            firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
            var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
            var result = Math.ceil(d / 7);
            return result + 1;
        },
        transferDate(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            var dateString = year + '年' + month + '月' + day + '日';
            return dateString;
        },
        getWeek() {
            var date = new Date();
            var today = date.getDay();
            //上周日距离今天的天数（负数表示）
            var stepSunDay = -today + 1;
            if (today == 0) {
                stepSunDay = -7;
            }
            var stepMonday = 7 - today;
            var time = date.getTime();

            var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
            var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
            this.form.startdate = monday.valueOf();
            this.form.overdate = sunday.valueOf();
            var startDate = this.transferDate(monday); // 日期变换
            var endDate = this.transferDate(sunday); // 日期变换
            this.showStartDate = startDate;
            this.showEndDate = endDate;
            // return startDate + ' - ' + endDate;
        },
    }

}
