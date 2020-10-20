<template>
    <!-- jszkpd-技术状况评定 -->
    <div class="module-jszkpd module-pub">
        <moduleTitle title="技术状况评定" />
        <bar
            ref="echartsBar"
            refName="jszkpd-bar"
            class="module-echarts"
            :width="width"
            :height="height"
            :colors="colors"
            :dataList="dataList"
            :xAxisData="xAxisData"
            :legendData="legendData"
        />
    </div>
</template>
<script>
import echarts from 'echarts'
import bar from '../../components/chartComponents/bar'
import moduleTitle from '@/views/bridge-cockpit/components/moduleTitle'
export default {
    components: {
        bar,
        moduleTitle
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
                const remW = 11.7708 //单位rem
                const remH = 2.7604//3.2708 - 1.1354 //   265px/0.96
                this.width = val * remW
                this.height = val * remH
                console.log(this.height)
                this.$nextTick(() => {
                    this.$refs.echartsBar.echartsResize()
                })
            },
            immediate: true
        }
    },
    data() {
        return {
            // title: {},
            width: null,
			height: null,
			grid:{

			},
            colors: ['#00A6E3', '#87680C'],
            legendData: ['优', '良', '中', '次', '差'],
            xAxisData: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            colorItemArr: [
                ['#DE3040', '#850D1A'],
                ['#00FFDE', '#007D6D'],
                ['#FDCE44', '#66592A'],
                ['#FF7DFD', '#B72750'],
                ['#00C9E4', '#420FFF']
            ],
            dataList: []
        }
    },
    mounted() {
		// this.$forceUpdate()
		this.creatEcharts()
    },
    methods: {
        creatEcharts() {
            this.dataList = this.legendData.map((a, index) => {
                const minNum = 50,
                    maxNum = 400
                const dataList = this.xAxisData.map(() =>
                    Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
                )

                return {
                    name: a,
                    data: dataList,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: this.colorItemArr[index][0] },
                            { offset: 1, color: this.colorItemArr[index][1] }
                        ])
                    }
                }
            })
            console.log(this.dataList)
            this.$nextTick(() => {
                this.$refs.echartsBar.setEcharts()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.module-jszkpd {
    width: 11.7708rem;
    height: 3.2708rem;
}
</style>
