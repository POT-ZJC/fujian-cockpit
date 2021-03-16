<template>
    <div :ref="refName"  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
    props: {
        refName: {
            type: String,
            default: ''
        },
        grid: {
            type: Object,
            default() {
                return {}
            }
        },
        yAxis: {
            type: Object,
            default: () => {}
        },
        moreYAxis: {
            type: Array,
            default() {
                return []
            }
        },
        colors: {
            type: Array,
            default: () => ['#00A6E3', '#87680C']
        },
        moduleName: {
            type: String,
            default: ''
        },
        dataList: {
            type: Array,
            default: () => [120, 200, 150, 80, 70, 110, 130]
        }
    },
    data() {
        return {
            myChart: null
        }
    },
    mounted() {
        this.createCharts()
    },
    methods: {
        setEcharts() {
            let yAxis = [
                {
                    ...this.yAxis
                }
            ]
            // console.log(this.moreYAxis, yAxis)
            if (!this.dataList.length) {
                yAxis = [
                    {
                        axisLabel: {
                            verticalAlign: 'bottom',
                            align: 'left',
                            padding: [0, 0, 7, 12],
                            textStyle: {
                                color: '#FFFFFF',
                                fontSize: '12'
                            }
                        },
                        data: ['暂无数据']
                    }
                ]
            }
            const option = {
                color: this.colors,
                yAxis: yAxis.concat(this.moreYAxis),
                grid: this.grid,
                series: [
                    {
                        data: this.dataList.length
                            ? this.dataList
                            : [{ name: '暂无数据', value: 1 }]
                    }
                ]
            }
            console.log(option)
            this.myChart.setOption(option)
        },
        echartsResize() {
            this.myChart.resize()
        },
        createCharts() {
            this.myChart = echarts.init(this.$refs[this.refName])

            let fontColor = '#485465'
            let option = {
                tooltip: {
                    show: true,
                    formatter: '{b}:{c}'
                },
                animationDurationUpdate: 1000,
                grid: {
                    left: '5%',
                    top: '5%',
                    right: '15%',
                    bottom: '8%',
                    containLabel: true
                },

                xAxis: {
                    type: 'value',
                    inverse: true,//是否反向坐标轴
                    show: false,
                    position: 'top',

                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: [
                    {
                        inverse: true,//是否反向坐标轴
                        type: 'category', 
                        axisTick: {
                            show: false,
                            alignWithLabel: false,
                            length: 5
                        },
                        nameTextStyle: {
                            color: '#ccc'
                        },
                        splitLine: {
                            //网格线
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        data: []
                    }
                ],
                series: [
                    {
                        name: 'bars',
                        type: 'bar',
                        barWidth: 10,
                        // showBackground: true,
                        backgroundStyle: {
                            barBorderRadius: 5
                        },
                        label: {
                            normal: {
                                show: true,
                                // position: 'right',
                                formatter: '{c}',
                                offset: [10, 0],
                                textStyle: {
                                    color: 'white' //color of value
                                },
                                fontFamily: 'DINEngschriftStd',
                                fontSize: 14
                            }
                        },
                        itemStyle: {
                            normal: {
                                show: true,
                                barBorderRadius: 30,
                                borderWidth: 0,
                                borderColor: '#333'
                            }
                        },
                        data: []
                    }
                ]
            }
            this.myChart.setOption(option)
            this.setEcharts()
        }
    }
}
</script>
