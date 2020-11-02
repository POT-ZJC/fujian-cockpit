<template>
    <div :ref="refName"  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'pieBox',
    components: {},
    props: {
        title: {
            type: Object,
            default() {
                return {
                    text: '',
                    subtext: ''
                }
            }
        }, 
        refName: {
            type: String,
            default: ''
        },
        moduleName: {
            type: String,
            default: 'pie'
        },
        legendData: {
            type: Array,
            default() {
                return []
            }
        },
        colors: {
            type: Array,
            default: () => [
                '#FFC647',
                '#00FFDE',
                '#4B7AF3',
                '#0F4392',
                '#FB497C',
                '#00FFDE',
                '#F0B9F7',
                '#8974F2'
            ]
        },
        dataList: {
            type: Array,
            default: () => [
                { value: 335, name: '数据-1' },
                { value: 310, name: '数据-3' },
                { value: 274, name: '数据-5' },
                { value: 235, name: '数据-2' },
                { value: 400, name: '数据-4' }
            ]
        }
    },
    watch: {
        // width(val) {
        //     console.log(val)
        //     this.$nextTick(() => {
        //         this.myChart.resize()
        //     })
        // },
        // height() {
        //     this.$nextTick(() => {
        //         this.myChart.resize()
        //     })
        // }
    },
    data() {
        return {
            myChart: null,
            highlighttName: ''
        }
    },
    computed: {},
    mounted() {
        this.createCharts()
    },
    methods: {
         echartsResize() {
      this.myChart.resize();
    },
        setEcharts() {
            const option = {
                colors: this.colors,
                title: this.title,
                series: [{ data: this.dataList }, { data: this.legendData }]
            }
            this.myChart.setOption(option,true)
        },

        createCharts() {
            this.myChart = echarts.init(this.$refs[this.refName])
            let option = {
                // backgroundColor: '#2c343c',
                animationDurationUpdate:1000,
                title: {
                    // name: this.moduleName,
                    text: '',
                    left: '24%',
                    top: '37%',
                    subtext: '',
                    // x: 'center',
                    // y: 'center',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal',
                        color: ['#fff'],
                        textAlign: 'center'
                    },
                    subtextStyle: {
                        color: '#828282',
                        fontSize: 12,
                        textAlign: 'center'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                color: this.colors,
                grid: {
                    show: false,
                    borderColor: '#000',
                    z: 2,
                    top: 0,
                    right: 0
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        type: 'value',
                        show: false,
                        position: 'top',
                        min: 0,
                        max: 200
                    }
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        min: 0,
                        position: 'right',
                        show: false,
                        max: 400
                    }
                ],
                // legend: {
                //     orient: 'vertical',
                //     right: '40',
                //     top: '35',
                //     // data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
                //     data: this.legendData
                // },
                series: [
                    {
                        name: this.moduleName,
                        type: 'pie',
                        radius: ['30%', '62%'],
                        center: ['26%', '45%'],
                        data: this.dataList.sort(function(a, b) {
                            return a.value - b.value
                        }),

                        label: {
                            show: false,
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        itemStyle: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        animationType: 'scale', //'expansion' 默认沿圆弧展开的效果。'scale' 缩放效果
                        animationEasing: 'elasticOut', //初始动画的缓动效果
                        animationDelay: function(idx) {
                            //初始动画的延迟，支持回调函数
                            return Math.random() * 200
                        }
                    },
                    {
                        type: 'scatter',
                        symbol: 'rect',
                        symbolSize: [20, 15],
                        tooltip: { show: false },
                        // silent: true, //是否不响应和触发鼠标事件
                        data: this.legendData
                    }
                ]
            }

            this.myChart.setOption(option)

            //给点位添加鼠标移入事件
            this.myChart.on('mouseover', { seriesIndex: 1 }, params => {
                this.highlightArea(params)
            })
        },
        //高亮图形区域
        highlightArea(params) {
            // console.log(params)
            //如果高亮的区域名不同，才高亮 -否则不做处理
            if (params.name !== this.highlighttName) {
                //如果存在上次高亮的区域就取消
                if (this.highlighttName) {
                    this.myChart.dispatchAction({
                        type: 'downplay', //
                        seriesIndex: 0,
                        name: this.highlighttName
                    })
                }

                this.myChart.dispatchAction({
                    type: 'highlight', //
                    seriesIndex: 0,
                    name: params.name
                })
                //更新当前高亮的区域名
                this.highlighttName = params.name

                // console.log(this.highlighttName)
            }
        }
    }
}
</script>
 
