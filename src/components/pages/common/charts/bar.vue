<template>
	<div id="bar11"></div>
</template>

<script>
	export default {
		name: 'Bar',
		props: {
			// cid: {
			// 	type: String,
			// 	required: true
			// },
			// pieData: {
			// 	type: Array,
			// 	required: true
			// }
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
				let myChart = this.$echarts.init(document.getElementById('bar11'), 'light')
				// 处理参数
				// var xData = [];
				// for (var i = 0; i < this.pieData.length; i++) {
				// 	xData.push(this.pieData[i].name);
				// }
				// 绘制图表
				var option = {
					tooltip: {
						trigger: 'item'
					},
					calculable: true,
					grid: {
						borderWidth: 0,
						y: 0,
						y2: 0
					},
					xAxis: [{
							type: 'value',
							show: false
						}
					],
					yAxis: [{
						type: 'category',
						show: false,
						data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force']
					}],
					series: [{
						name: 'ECharts例子个数统计',
						type: 'bar',
						itemStyle: {
							normal: {
								color: function(params) {
									// build a color map as your need.
									var colorList = [
										'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
										'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
									];
									return colorList[params.dataIndex]
								}
							}
						},
						data: [12, 21, 10, 4, 12, 5, 6, 5],
						markPoint: {
							tooltip: {
								trigger: 'item',
								backgroundColor: 'rgba(0,0,0,0)',
								formatter: function(params) {
									return '<img src="' +
										params.data.symbol.replace('image://', '') +
										'"/>';
								}
							},
							data: [{
									xAxis: 0,
									y: 350,
									name: 'Line',
									symbolSize: 20,
									symbol: 'image://../asset/ico/折线图.png'
								},
								{
									xAxis: 1,
									y: 350,
									name: 'Bar',
									symbolSize: 20,
									symbol: 'image://../asset/ico/柱状图.png'
								},
								{
									xAxis: 2,
									y: 350,
									name: 'Scatter',
									symbolSize: 20,
									symbol: 'image://../asset/ico/散点图.png'
								},
								{
									xAxis: 3,
									y: 350,
									name: 'K',
									symbolSize: 20,
									symbol: 'image://../asset/ico/K线图.png'
								},
								{
									xAxis: 4,
									y: 350,
									name: 'Pie',
									symbolSize: 20,
									symbol: 'image://../asset/ico/饼状图.png'
								},
								{
									xAxis: 5,
									y: 350,
									name: 'Radar',
									symbolSize: 20,
									symbol: 'image://../asset/ico/雷达图.png'
								},
								{
									xAxis: 6,
									y: 350,
									name: 'Chord',
									symbolSize: 20,
									symbol: 'image://../asset/ico/和弦图.png'
								},
								{
									xAxis: 7,
									y: 350,
									name: 'Force',
									symbolSize: 20,
									symbol: 'image://../asset/ico/力导向图.png'
								}
							]
						}
					}]
				};
				myChart.setOption(option);
			}
		}
	}
</script>

<style>
</style>
