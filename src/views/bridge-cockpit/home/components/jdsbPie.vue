<template>
    <!-- jdcb-机电设备 -->
    <div class="module-jdcb module-pub">
        <moduleTitle title="机电设备" />
        <pie
            ref="echartsPie"
            refName="jdcb-pie"
            class="module-echarts"
            :width="width"
            :height="height"
            :colors="colors"
            :dataList="dataList"
            :title="title"
            :moduleName="moduleName"
            :legendData="legendData"
        />
    </div>
</template>
<script>
// import pie from './../components/chartComponents/pie'
import pie from '../../components/chartComponents/pie'
export default {
    components: {
        pie,
        moduleTitle: () => import('@/views/bridge-cockpit/components/moduleTitle')
    },
    props: {
        fontSize: {
            type: Number,
            default: 14
        }
    },
    watch: {
        fontSize(val) {
            const remW = 3.8958 //单位rem
            const remH = 2.7604
            this.width = val * remW
            this.height = val * remH
        }
    },
    data() {
        return {
            title: {},
            moduleName: '机电设备',
            width: null,
            height: null,
            colors: ['#FFC760', '#12E1B8', '#7DB5FF', '#F0B9F7', '#FB497C', '#8974F2'],
            legendData: [],
            legendTxtList: [
                { txt: '收费系统', unit: '' },
                { txt: '监控系统', unit: '' },
                { txt: '通信系统', unit: '' },
                { txt: '供配电系统', unit: '' },
                { txt: '隧道机电系统', unit: '' },
                { txt: '照明设施', unit: '' }
            ],
            dataList: []
        }
    },
    mounted() {
        // this.legendData = this.dataList.map(val => val.name)
        let valueTotal = 0
        this.dataList = this.legendTxtList.map((val, index) => {
            const minNum = 50,
                maxNum = 400
            const color = this.colors[index]
            const value = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
            valueTotal += value
            const item = {
                name: val.txt,
                value: [100, 350 - index * 65],
                itemStyle: {
                    color: color
                },
                label: {
                    position: 'right',
                    distance: 10,
                    show: true,

                    formatter: `{b|${val.txt}} {a|${value}} {b|${val.unit || '个'}}`,
                    rich: {
                        a: {
                            color: color,
                            fontSize: 20,
                            fontFamily: 'DINEngschriftStd'
                        },
                        b: { color: '#fff', fontSize: 12 }
                    }
                }
            }

            console.log(value)
            this.legendData.push(item)
            return { value: value, name: val.txt }
        })
        this.title = {
            text: valueTotal + '',
            subtext: '合计(项)'
            // name: this.moduleName
        }
        this.$forceUpdate()
        this.$nextTick(() => {
            this.$refs.echartsPie.setEcharts()
        })
    }
}
</script>
<style lang="scss" scoped>
.module-jdcb {
    width: 3.8958rem;
    height: 3.2292rem;
    margin-top: 0.1875rem;
}
</style>
