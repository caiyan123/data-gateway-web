<template>
    <div :id="'chart' + cid"></div>
</template>

<script>
    export default {
        name: "myLine",
        props: {
            cid: {
                type: String,
                required: true
            },
            lineData: {
                type: Array,
                required: true
            },
            curcle: {
                type: Number
            }
        },
        data() {
            return {
                // chartId: cid
            }
        },
        mounted() {
            this.setEchart();
        },
        methods: {
            setEchart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('chart' + this.cid), 'light')
                // 处理参数
                var xData = [];
                for (var i = 0; i < this.lineData.length; i++) {
                    xData.push(this.lineData[i].name);
                }
                alert(this.lineData);
                // 绘制图表
                var option = {
                    // tooltip: {
                    //     trigger: 'axis',
                    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
                    // },
                    // grid: {
                    //     left: '3%',
                    //     top: '3%',
                    //     right: '3%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    // legend: {
                    //     data:['资产余额']
                    // },
                    xAxis: {
                        type: 'category',
                        data: ['一月','二月','三月','四月','五月','六月','七月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210]
                        }]
                };
                myChart.setOption(option);
            }
        }
    }
</script>

<style>

</style>