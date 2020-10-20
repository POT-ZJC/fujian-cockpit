<template>
    <div :ref="refName" class="barBox-charts" :style="`height:${height}px;width:${width}px`"></div>
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
        grid: {
            type: Object,
            default() {
                return {}
            }
        },
        xAxisData: {
            type: Array,
            default: () => ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
        },
        legendData: {
            type: Array,
            default: () => []
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
            default: () => [
                { name: '1', data: [120, 200, 150, 80, 70, 110, 130] },
                { name: '2', data: [200, 150, 80, 70, 110, 130, 219] }
            ]
        }
    },
    data() {
        return {
            myChart: null,
            // highlighttName: '',
            seriesItem: {
                name: '',
                type: 'bar',
                barWidth: 18,
                stack: '1',
                data: []
            }
        }
    },
    mounted() {
        this.createCharts()
    },
    methods: {
        setEcharts() {
            const seriesItemArr = this.dataList.map(item => {
                return {
                    ...this.seriesItem,
                    ...item
                }
            })

            const option = {
                color: this.colors,
                xAxis: {
                    data: this.xAxisData
                },
                grid: this.grid,
                legend: {
                    data: this.legendData
                },
                series: seriesItemArr
            }
            console.log(option)
            this.myChart.setOption(option)
        },
        echartsResize() {
            this.myChart.resize()
        },
        createCharts() {
            this.myChart = echarts.init(this.$refs[this.refName])
            const seriesItemArr = this.dataList.map(item => {
                let newItem = { ...this.seriesItem, ...item }
                return newItem
            })
            console.log(seriesItemArr)
            let fontColor = '#485465'
            let option = {
                color: this.colors,
                legend: {
                    data: this.legendData,
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                grid: {
                    containLabel: true,
                    top: 30,
                    left: 10,
                    right: 20,
                    bottom: 20
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}'
                },
                xAxis: {
                    type: 'category',
                    data: this.xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: fontColor
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: fontColor
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: fontColor
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: fontColor
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: fontColor
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: seriesItemArr
            }
            this.myChart.setOption(option)
        }
    }
}
</script>
