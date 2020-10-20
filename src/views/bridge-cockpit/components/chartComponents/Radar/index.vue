<template>
    <div :ref="refName" :style="`height:${height}px;width:${width}px`"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    props: {
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        refName: {
            type: String,
            default: ''
        },
        moduleName: {
            type: String,
            default: 'pie'
        },
        dataList: {
            type: Array,
            default: () => []
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
            const option = {
                // colors: this.colors,
                // title: this.title,
                // series: [{ data: this.dataList }, { data: this.legendData }]
            }
            this.myChart.setOption(option)
        },
        echartsResize() {
            this.myChart.resize()
        },
        createCharts() {
            this.myChart = echarts.init(this.$refs[this.refName])
            let option = {
                tooltip: {},
                radar: {
                    radius: '70%',
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
                            opacity: 0
                        }
                    },
                    indicator: [
                        {
                            name: '公路优化效率',
                            max: 6000,
                            color: '#fff'
                        },
                        {
                            name: '桥隧完好率',
                            max: 16000,
                            color: '#fff'
                        },
                        {
                            name: '机电完好率',
                            max: 30000,
                            color: '#fff'
                        },
                        {
                            name: '养护及时性',
                            max: 35000,
                            color: '#fff'
                        },
                        {
                            name: '审批效率指标',
                            max: 50000,
                            color: '#fff'
                        },
                        {
                            name: '审批效率指标',
                            max: 25000,
                            color: '#fff'
                        }
                    ]
                },
                series: [
                    {
                        name: '考核指标',
                        type: 'radar',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: 'rgba(76,245,246,1)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(76,245,246,0.53)'
                                    },
                                    {
                                        offset: 0.9,
                                        color: 'rgba(41,109,228,1)'
                                    }
                                ]),
                                width: 3
                            }
                        },

                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(76,245,246,0.53)'
                                    },
                                    {
                                        offset: 0.9,
                                        color: 'rgba(42,105,225,0.41)'
                                    }
                                ]),
                                opacity: 1
                            }
                        },
                        data: [
                            {
                                value: [5000, 7000, 12000, 11000, 15000, 14000],
                                name: '考核指标'
                            }
                        ]
                    }
                ],

                backgroundColor: ''
            }

            this.myChart.setOption(option)
        }
    }
}
</script>
