<template>
	<div :ref="moduleName"></div>
</template>
<script>
import echarts from 'echarts'
import { store } from "@/views/cockpit-version-1/cockpitStore";
export default {
  computed: {
    fontSize() {
      return store.fontSize;
    },
  },
   watch: {
    fontSize(val) {
      this.echartsResize();
    },
  },
	props: {
		// refName: {
		// 	type: String,
		// 	default: ''
		// },
		moduleName: {
			type: String,
			default: '雷达图'
		},
		dataList: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			myChart: null
		}
	},
	mounted () {
		this.createCharts()
	},
	methods: {
		setEcharts () {
            // debugger
			const { indicator, radarData } = this.handleData()
			const option = {
				radar: { indicator },
				series: [{ data: radarData }]
			}
			console.log('radarData', radarData, indicator)
			this.myChart.setOption(option)
		},
		echartsResize () {
			this.myChart.resize()
		},
		handleData () {
			let indicator = [
			]
			let max = 0
			const radarData = {
				value: [],
				name: this.moduleName
			}
			this.dataList.forEach(val => {
                val.number=Number(val.number)
				val.number > max && (max = val.number)
			})
			this.dataList.forEach(val => {
				radarData.value.push(val.number)
				indicator.push({
					name: `${val.title}-${val.number}个`,
					max: max,
					color: '#fff'
				})
			})
			if (!indicator.length) {
				indicator = [{ name: '暂无数据', max: 0, color: '#fff' }]
			}

			return {
				indicator,
				radarData: [radarData]
			}
		},
		createCharts () {
			const { indicator, radarData } = this.handleData()
			// console.log('radarDataradarDataradarData', indicator, radarData)
			this.myChart = echarts.init(this.$refs[this.moduleName])
			const option = {
				tooltip: {},
				radar: {
					radius: '70%',
					name: {
						textStyle: {
							color: '#fff',
							fontSize: '12',
							borderRadius: 3,
							padding: [3, 5]
						}
					},
					nameGap: '2',
					splitNumber: 5,
					axisLine: {
						lineStyle: {
							color: 'rgba(61,191,205,1)',
							opacity: 0.2,
							width: 1
						}
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(61,191,205,1)',
							opacity: 0.2,
							width: 1
						}
					},
					splitArea: {
						areaStyle: {
							color: [
								'rgba(0,11,67,0.7)',
								'rgba(10,41,112,0.7)'
							].reverse()
						}
					},
					// splitArea: {
					// 	areaStyle: {
					// 		opacity: 0
					// 	}
					// },
					indicator: indicator
				},
				series: [
					{
						name: this.moduleName,
						type: 'radar',
						symbolSize: 3,
						itemStyle: {
							normal: {
								color: 'rgba(76,245,246,1)'
							}
						},
						lineStyle: {
							normal: {
								color: 'rgba(2,99,255,1)',
								width: 1
							}
						},

						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: 'rgba(2,99,255,0.5)'
										},
										{
											offset: 0.9,
											color: 'rgba(133,0,210,0.5)'
										}
									]
								),
								opacity: 1
							}
						},
						data: radarData
					}
				],

				backgroundColor: ''
			}

			this.myChart.setOption(option)
			this.$nextTick(() => {
				this.echartsResize()
			})
		}
	}
}
</script>
