<template>
    <!-- khzb-考核指标 -->
    <div class="module-khzb module-pub">
        <moduleTitle title="考核指标" />
        <radar
            refName="khzb-radar"
            ref="echartsRadar"
            :width="width"
            :height="height"
        />
    </div>
</template>
<script>
export default {
    components: {
        radar: () => import('../../components/chartComponents/Radar'),
        moduleTitle: () => import('@/views/bridge-cockpit/components/moduleTitle')
    },
    props: {
        fontSize: {
            type: Number,
            default: 14
        }
    },
    data() {
        return {
            width: null,
            height: null
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
                    this.$refs.echartsRadar.echartsResize()
                })
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.module-khzb {
    width: 3.8958rem;
    height: 3.2708rem;
}
</style>
