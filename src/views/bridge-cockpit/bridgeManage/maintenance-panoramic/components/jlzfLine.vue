<template>
    <!--jlzf- 计量支付- -->
    <div class="module-jlzf module-pub">
        <moduleTitle title="计量支付" />
        <div
            :ref="refName"
            class="barBox-charts"
            :style="`height:${height}px;width:${width}px`"
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
        id: {
      type: String,
      default: "",
    },
        fontSize: {
            type: Number,
            default: 14
        }
    },
    watch: {
        fontSize: {
            handler(val) {
                const remW = 3.8958 //单位rem
                const remH = 2.7604 //   265px/0.96
                this.width = val * remW
                this.height = val * remH 
                this.$nextTick(() => {
                    this.echartsResize()
                })
            },
            immediate: true
        },
         id(val) {
      this.$nextTick(() => {
        this.setEcharts();
      });
     }
    },
    data() {
        return {
            myChart: null,
            refName: 'jlzf-echarts',
            // highlighttName: '',
            width: 100,
            height: 100,
            seriesData: [
                { name: '总量', data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290] }

                
            ]
        }
    },
    mounted() {
        this.createCharts()
        setTimeout(() => {
            // this.setEcharts()
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

                        data: ['1月', '2月', '3月', '4月', '5月', '6月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '计量支付',
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
                        name: '支付量',
                        type: 'line', 
                        symbol: 'circle',
                        symbolSize: 4,
                        showSymbol: true,
                        lineStyle: {
                            normal: {
                                width: 2
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(255,225,50,0.54)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(45,240,219,1)'
                                    }
                                ])
                            },
                            emphasis: {
                                color: 'rgb(0,196,132)',
                                borderColor: 'rgba(0,196,132,0.2)',
                                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                                borderWidth: 10
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    1,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0.8,
                                            color: 'rgba(48,236,213,0.2)'
                                        },
                                        {
                                            offset: 0,
                                            color: 'rgba(255,221,51,0.0)'
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },

                        data: [90, 105, 84, 125, 110, 92, 98]
                    }
                ]
            }
            this.myChart.setOption(option)
        }
    }
}
</script>
<style lang="scss" scoped>
.module-jlzf {
    width: 3.8958rem;
    height: 3.2292rem; 
}
</style>
