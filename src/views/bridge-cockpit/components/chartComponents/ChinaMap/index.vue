<template>
    <div
        class="china-map"
        :ref="refName"

    ></div>
</template>

<script>
import echarts from 'echarts'
import { chinaObj } from './china.js'
import tipsBoxDemoPng from './img/tooltip.png'

import point_1 from './img/point-1.svg'
import point_2 from './img/point-2.svg'
import point_3 from './img/point-3.svg'
export default {
    name: 'ChinaMap',
    props: {
        refName: {
            type: String,
            default: 'ChinaMap'
        },
        fontSize: {
            type: Number,
            default: 96
        }
    },
    watch: {
        fontSize: {
            handler(val) {
                // console.log('china', val)
                this.$nextTick(() => {
                    this.myChart.resize()
                })
            }
        }
    },
    data() {
        return {
            remWidth: 12, //单位rem
            remHeight: 6.6, //单位rem
            pointSourceArr: [point_1, point_2, point_3],
            currentHighlightName: '', //当前高亮的数据名称name
            cancelHighlightSetTime: null, //当前取消高亮的倒计时对象
            myChart: null,
            series: [],
            // 标记地图坐标
            chinaGeoCoordMap: [
                { name: '北京', lat: 116.4551, lng: 40.2539 },
                { name: '重庆', lat: 108.384366, lng: 30.439702 },
                { name: '西宁', lat: 101.771151, lng: 36.62489 },
                { name: '广州', lat: 113.26626, lng: 23.13171 },
                {
                    name: '上海',
                    lat: 121.4648,
                    lng: 31.2891
                }
            ],
            tooltipData: [
                {
                    name: '重庆',
                    coords: [
                        [108.384366, 30.439702],
                        [125.384366, 30.439702],
                        [132.384366, 35.439702]
                    ], // 线条位置[开始位置，结束位置]
                    value: ''
                }
            ],
            tipsBoxData: [
                {
                    name: '重庆',
                    lat: 132.384366,
                    lng: 35.439702,
                    symbolOffset: [55, '50%']
                }
            ],
            linesLableData: [
                // {
                //   name: "北京",
                //   coords: [
                //     [116.24, 39.55, 100],
                //     [120.24, 46.55, 100]
                //   ], // 线条位置[开始位置，结束位置]
                //   value: ""
                // },
                {
                    name: '重庆',
                    coords: [
                        [108.384366, 30.439702],
                        [125.384366, 30.439702],
                        [132.384366, 35.439702]
                    ], // 线条位置[开始位置，结束位置]
                    value: ''
                }
                // {
                //   name: "广州",
                //   coords: [
                //     [106.54, 29.59],
                //     [100.24, 40.55]
                //   ], // 线条位置[开始位置，结束位置]
                //   value: ""
                // }
            ]
        }
    },

    mounted() {
        this.createEchartsMap()
    },
    methods: {
        //更新地图 散点 point
        updateMapPoint() {
            // this.chinaGeoCoordMap.push({
            //   name: "山西",
            //   lat: 112.549248,
            //   lng: 37.857014
            // });
            this.chinaGeoCoordMap = [
                {
                    name: '山西',
                    lat: 112.549248,
                    lng: 37.857014
                }
            ]

            this.myChart.setOption({
                series: [
                    {
                        // 根据名字对应到相应的数据
                        data: this.mapPointData()
                    }
                ]
            })
        },

        //给每个区域设置背景色
        areaAddBackcolor(arreaList) {
            const backColorArr = [
                '#002e38',
                '#016b83',
                '#014655',
                // "#00151a",
                '#016b83'
            ]

            let areaData = arreaList.map((item, index) => {
                // backColorArr 长度范围内的随机整数
                // const randomNIndex = Math.floor(
                //   Math.random() * (backColorArr.length - 1)
                // );
                // parseInt(3/4)
                const randomNIndex =
                    index - Math.floor(index / backColorArr.length) * backColorArr.length
                // console.log(randomNIndex)
                return {
                    name: item.properties.name,
                    itemStyle: {
                        // normal: {
                        //   shadowColor: "#2194a9",
                        //   shadowOffsetX: 0,
                        //   shadowOffsetY: 18,
                        //   opacity: 1
                        //   // zlevel:-2
                        // },
                        emphasis: {
                            areaColor: '#7be8fd'
                            // position: "top"
                        },
                        areaColor: backColorArr[randomNIndex],
                        color: 'red',
                        borderWidth: '2',
                        borderType: 'solid',
                        borderColor: '#319fb6'
                    }
                }
            })

            return areaData
        },
        //构建地图散点 数据
        mapPointData() {
            let myList = [...this.chinaGeoCoordMap]
            let res = []
            // console.log(myList)

            for (let enterprise of myList) {
                res.push({
                    name: enterprise.name,
                    value: [enterprise.lat, enterprise.lng, 1],
                    tooltip: {
                        show: true
                    },
                    // type: enterprise.type,
                    id: enterprise.id || '-',
                    symbol: 'image://' + this.pointSourceArr[2], // 点-样式
                    symbolSize: 35
                    // symbol: false //是 path:// 的形式，是否在缩放时保持该图形的长宽比。
                })
            }
            // console.log(res)
            return res
        },
        // 提示框点位
        tipsBoxPointData() {
            let myList = [...this.tipsBoxData]
            let res = []
            for (let pointItem of myList) {
                res.push({
                    name: pointItem.name,
                    symbolOffset: pointItem.symbolOffset,
                    value: [pointItem.lat, pointItem.lng]
                })
            }
            // console.log(res)
            return res
        },
        createEchartsMap: function() {
            this.myChart = echarts.init(this.$refs[this.refName])
            echarts.registerMap('china', chinaObj)
            // console.log(this.chinaGeoCoordMap)
            //

            const option = {
                backgroundColor: '',
                title: {
                    text: '',
                    subtext: '',
                    sublink: '',
                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                //hover tips
                // tooltip: {
                //   show: false,
                //   // renderMode:'',//
                //   // hideDelay: 3500, //隐藏延迟 ms
                //   enterable: true, // 鼠标能否移入提示层
                //   appendToBody: false, // 是否挂载到body节点
                //   position: "right" //定位string Array Function ，默认不设置=跟随鼠标
                // },

                //geo地图
                geo: {
                    show: true,
                    map: 'china',

                    aspectScale: 0.85,
                    layoutCenter: ['50%', '50%'], //地图位置
                    layoutSize: '100%',
                    zoom: 1.4,

                    scaleLimit: {
                        min: 0.4,
                        max: 50
                    },
                    rotate: 0,
                    roam: true,
                    // itemStyle: {
                    //   emphasis: {
                    //     areaColor: "#7be8fd"
                    //     // position: "top"
                    //   }
                    // },
                    // center: [112.493604967, 37.6959433545],
                    // label: {
                    //   normal: {
                    //     show: true
                    //   },
                    //   emphasis: {
                    //     show: true,
                    //     areaColor: "#3a6ce1",
                    //     label: { color: "#343f5d", rotate: 0 }
                    //   }
                    // },

                    regions: this.areaAddBackcolor(chinaObj.features) //单独设定一些区域的样式
                },
                // 点
                series: [
                    // 常规地图
                    // {
                    //   type: "map",
                    //   mapType: "china",

                    //   aspectScale: 0.85,
                    //   layoutCenter: ["50%", "50%"], //地图位置
                    //   layoutSize: "100%",
                    //   zoom: 1.4,

                    //   scaleLimit: {
                    //     min: 0.4,
                    //     max: 50
                    //   },
                    //   rotate: 0,
                    //   roam: true,
                    //   itemStyle: {
                    //     // normal: {
                    //     //   areaColor: "#0c274b",
                    //     //   borderColor: "#1cccff",
                    //     //   borderWidth: 1.5
                    //     // },
                    //     emphasis: {
                    //       areaColor: "#02102b",
                    //       label: {
                    //         color: "#fff"
                    //       }
                    //     }
                    //   }
                    // },

                    {
                        type: 'scatter', //  scatter=散点图
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        label: {
                            show: false
                            // emphasis: {
                            //   show: true
                            // }
                        },
                        itemStyle: {
                            opacity: 1
                        },
                        // symbol: "circle",
                        // symbolSize: function(val) {
                        //   return 5 + val[2] * 10; //圆环大小
                        // },
                        data: this.mapPointData()
                    },
                    //提示框的线段
                    {
                        type: 'lines',
                        zlevel: 3,
                        hoverAnimation: false,
                        legendHoverLink: false,
                        animation: false, //是否开启动画
                        silent: true, //是否不响应和触发鼠标事件
                        symbol: 'circle',
                        // coordinateSystem: "geo",
                        polyline: true, //是否是多段线。
                        symbolSize: [25, 25],
                        color: '#f74776',

                        lineStyle: {
                            type: 'solid',
                            color: '#f74776',
                            width: 2,
                            opacity: 0
                        },
                        emphasis: {
                            lineStyle: {
                                type: 'solid',
                                color: '#f74776',
                                width: 2,
                                opacity: 1
                            }
                        },

                        data: this.linesLableData
                    },
                    // 用点来展示提示款
                    {
                        type: 'scatter', //  scatter=散点图
                        name: 'tipsBoxData',
                        coordinateSystem: 'geo',
                        hoverAnimation: false,
                        silent: true, //是否不响应和触发鼠标事件
                        // zlevel: 2,
                        tooltip: {
                            show: false
                        },
                        symbol: 'image://' + tipsBoxDemoPng, // 点-样式
                        symbolSize: [135, 85],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            opacity: 0
                        },
                        emphasis: {
                            itemStyle: {
                                opacity: 1
                            }
                        },

                        data: this.tipsBoxPointData()
                    }
                ]
            }
            this.myChart.setOption(option)
            //给点位添加鼠标移入事件
            this.myChart.on('mouseover', { seriesIndex: 0 }, params => {
                // console.log(params)
                // const data = params.data;
                // const seriesIndex=params.seriesIndex
                this.highlightTipsBox(params, 'in')
            })
            //给lines 鼠标移出事件
            this.myChart.on('mouseout', { seriesIndex: 0 }, params => {
                // console.log(params)
                // const data = params.data;
                // const seriesIndex=params.seriesIndex
                this.highlightTipsBox(params, 'out')
            })

            this.myChart.dispatchAction({
                eventName: 'datazoom',
                handler: params => {
                    // console.log(params)
                }
            })
            // 'datazoom', params => {
            //                 console.log(params)
            //             }
            //
        },
        // 高亮提示框
        highlightTipsBox(params, type) {
            // type: in=移入  out  移出

            if (type === 'in') {
                // 如果有上一次高亮的name-//先取消上一个点的高亮
                if (this.currentHighlightName) {
                    this.myChart.dispatchAction({
                        type: 'downplay', //
                        seriesIndex: 1,
                        name: this.currentHighlightName
                        // dataIndex: lightIndex //第 lightIndex
                    })
                    this.myChart.dispatchAction({
                        type: 'downplay', //
                        seriesIndex: 2,
                        name: this.currentHighlightName
                        // dataIndex: lightIndex //第 lightIndex
                    })
                }
                //如果有需要取消高亮的倒计时-清除
                this.cancelHighlightSetTime && clearTimeout(this.cancelHighlightSetTime)
                this.cancelHighlightSetTime = null
                // 再高亮当前对应的提示框
                this.myChart.dispatchAction({
                    type: 'highlight', //
                    seriesIndex: 1,
                    name: params.name
                    // dataIndex: lightIndex //第
                })
                this.myChart.dispatchAction({
                    type: 'highlight', //
                    seriesIndex: 2,
                    name: params.name
                    // dataIndex: lightIndex //第
                })
                //更新this高亮的数据name
                this.currentHighlightName = params.name
            } else if (type === 'out') {
                //  取消高亮 -延迟1.5s
                this.cancelHighlightSetTime = setTimeout(() => {
                    this.myChart.dispatchAction({
                        type: 'downplay', //
                        seriesIndex: 1,
                        name: params.name
                        // dataIndex: lightIndex //第 lightIndex
                    })
                    this.myChart.dispatchAction({
                        type: 'downplay', //
                        seriesIndex: 2,
                        name: params.name
                        // dataIndex: lightIndex //第 lightIndex
                    })
                }, 1500)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.china-map {
    width: 100%;
    height: 100%;
}
</style>
