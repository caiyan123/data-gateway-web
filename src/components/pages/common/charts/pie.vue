<template>
	<div :id="'chart' + cid"></div>
</template>

<script>
	export default {
		name: 'Pie',
		props: {
			cid: {
				type: String,
				required: true
			},
			pieData: {
				type: Array,
				required: true
			},
			curcle: {
				type: Number
			},
			sin: {
				type: Number
			},
			pieName: {
				type: String
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
		watch: {
			sin: {
				handler(newName, oldName) {
					if (newName == 1) {
						this.setEchart()
					}
				}
			},
			immediate: true,
			deep: true
		},

		methods: {
			setEchart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('chart' + this.cid), 'light')
				// 处理参数
				var xData = [];
				for (var i = 0; i < this.pieData.length; i++) {
					xData.push(this.pieData[i].name);
				}
				// alert(this.curcle);
				// 绘制图表
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					grid: {
						left: '0',
						top: '20',
						right: '20',
						bottom: '40'
					},
					legend: {
						orient: 'vertical',
						x: 'right',
						y: 'middle',
						align: 'left',
						data: xData
					},
					series: [{
						name: this.pieName,
						type: 'pie',
						center: ['35%', '50%'],
						radius: [this.curcle == undefined ? '20%' : this.curcle + 'px', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							normal: {
								label: {
									position: 'inner',
									formatter: function(params) {
										return (params.percent - 0).toFixed(0) + '%'
									}
								},
								labelLine: {
									show: false
								}
							},
							emphasis: {
								label: {
									show: true,
									formatter: "{b}\n{d}%"
								}
							}

						},
						data: this.pieData
					}]
				};
				myChart.setOption(option);

				
				myChart.on("click", this.eConsole);
			},
			eConsole(param) {
				this.$emit("itemClick",param.value,param.name);  //执行点击效果
			}
			

		},
	}
</script>

<style>
</style>
