<template>
    <!--yhrw- 养护任务- -->
    <div class="module-yhrw module-pub">
        <moduleTitle title="养护任务" />
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
                console.log(this.height)
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
            refName: 'yhrw-echarts',
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
                legend: {
                    show: true,
                    x: 'center',
                    y: 'top',
                    icon: 'stack',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: ['#FB497C', '#09B66D']
                    },
                    data: ['总量', '完成量']
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

                        data: ['2015', '2016', '2017', '2018', '2019', '2020']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '养护任务单',
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
                        name: '完成量',
                        type: 'line',
                        // stack: '总量1',
                        symbolSize: 4,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#09B66D',
                                lineStyle: {
                                    color: '#09B66D',
                                    width: 1
                                },
                                areaStyle: {
                                    //color: '#94C9EC'
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(9,182,109,0.8)'
                                        },
                                        {
                                            offset: 0.9,
                                            color: 'rgba(9,182,109,0.1)'
                                        }
                                    ])
                                }
                            }
                        },
                        data: []
                    },

                    {
                        name: '总量',
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
.module-yhrw {
    width: 3.8958rem;
    height: 3.2292rem;
    margin-top: 0.1875rem;
}
</style>
