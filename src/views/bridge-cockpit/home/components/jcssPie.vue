<template>
    <!-- jcss-基础设施 -->
    <div class="module-jcss module-pub">
        <moduleTitle title="基础设施" />
        <pie
            ref="echartsPie"
            refName="jcss-pie"
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
import moduleTitle from '@/views/bridge-cockpit/components/moduleTitle'
export default {
    components: {
        pie,
        moduleTitle
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
            moduleName: '基础设施',
            width: null,
            height: null,
            colors: ['#fb497c', '#00ffde', '#ffc760', '#4A79F1', '#0F4392'],
            legendData: [],
            legendTxtList: [
                { txt: '桥梁', unit: '座' },
                { txt: '隧道', unit: '座' },
                { txt: '涵洞', unit: '个' },
                { txt: '边坡', unit: '处' },
                { txt: '收费站', unit: '个' }
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
                value: [100, 340 - index * 75],
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
.module-jcss {
    width: 3.8958rem;
    height: 3.2292rem;
}
</style>
