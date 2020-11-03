<template>
    <!-- jszkpd-技术状况评定 -->
    <div class="module-jszkpd module-pub">
        <moduleTitle title="技术状况评定" />
        <bar
            ref="echartsBar"
            refName="jszkpd-bar"
            class="module-echarts" 
            :colors="colors"
            :dataList="dataList"
            :xAxisData="xAxisData"
            :legendData="legendData"
        />
    </div>
</template>
<script>
import echarts from 'echarts'
import bar from '@/views/bridge-cockpit/components/chartComponents/bar'
import moduleTitle from '@/views/bridge-cockpit/components/moduleTitle'
export default {
    components: {
        bar,
        moduleTitle
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
                this.$nextTick(() => {
                    this.$refs.echartsBar.echartsResize()
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
			grid:{

			},
            colors: ['#00A6E3', '#87680C'],
            legendData: ['1类', '2类', '3类', '4类', '5类'],
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
		this.setEcharts()
    },
    methods: {
        setEcharts() {
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
    height: 3.2292rem;
  display: flex;
  flex-direction: column;
}
.module-echarts {
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
</style>
