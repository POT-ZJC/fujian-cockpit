<template>
    <!--ssjc- 实时监测- -->
    <div class="module-ssjc module-pub">
        <moduleTitle title="实时监测" />
        <div
            :ref="refName"
            class="barBox-charts module-echarts" 
        ></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    components: {
        moduleTitle: () => import('@/views/bridge-cockpit/components/moduleTitle')
    },
    props: {
        fontSize: {
            type: Number,
            default: 14
        }
    },
    watch: {
        fontSize: {
            handler(val) { 
                this.$nextTick(() => {
                    this.echartsResize()
                })
            },
            immediate: true
        }
    },
    data() {
        return {
            myChart: null,
            refName: 'ssjc-echarts',
            // highlighttName: '',
            width: 100,
            height: 100,
            seriesData: [
                { name: '总量', data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290] },

                {
                    name: '完成量',
                    data: [80, 111, 50, 60, 70, 200, 160, 131, 120, 135, 250]
                }
            ]
        }
    },
    mounted() {
        this.createCharts()
        setTimeout(() => {
            this.setEcharts()
        }, 600)
    },
    methods: {
        setEcharts() {
            // const seriesItemArr = this.dataList.map(item => {
            //     return {
            //         ...item
            //     }
            // })
            const option = { series: this.seriesData }
            this.myChart.setOption(option)
        },
        echartsResize() {
            this.myChart.resize()
        },
        createCharts() {
            this.myChart = echarts.init(this.$refs[this.refName])

            let option = null
            let fontColor = '#485465'
            option = {
                backgroundColor: 'rgba(10,37,64,0.1)',
                grid: {
                    left: '6%',
                    right: '6%',
                    top: '20%',
                    bottom: '15%',
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                // legend: {
                //     show: false,
                //     x: 'center',
                //     y: 'top',
                //     icon: 'stack',
                //     itemWidth: 10,
                //     itemHeight: 10,
                //     textStyle: {
                //         color: ['#FB497C', '#09B66D']
                //     },
                //     data: ['总量', '完成量']
                // },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false, //轴线是否对齐空格
                        axisLabel: {
                            color: fontColor
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: fontColor
                            }
                        },
                        axisTick: {
                            show: false
                        },

                        data: ['除湿机故障', '台风', '重载', '船撞', '地震']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '实时监测',
                        // min:0,
                        // max:1000,
                        // axisLabel : {
                        // 	formatter: '{value}',
                        // 	textStyle:{
                        // 		color:'#2ad1d2'
                        // 	}
                        // },
                        axisLine: {
                            lineStyle: {
                                color: fontColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: fontColor
                            }
                        }
                    }
                ],
                series: [ 
                    {
                        name: '异常突发事件',
                        type: 'line',
                        symbolSize: 4,
                        // stack: '总量1',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#FB497C',
                                lineStyle: {
                                    color: '#FB497C',
                                    width: 1
                                },
                                areaStyle: {
                                    //color: '#94C9EC'
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(251,73,124,0.8)'
                                        },
                                        {
                                            offset: 0.9,
                                            color: 'rgba(251,73,124,0)'
                                        }
                                    ])
                                }
                            }
                        },

                        data: []
                    }
                ]
            }
            this.myChart.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.module-ssjc {
    width: 3.8958rem;
    height: 3.2292rem;
    margin-top: 0.1875rem;
  display: flex;
  flex-direction: column;
}
.module-echarts {
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
</style>
