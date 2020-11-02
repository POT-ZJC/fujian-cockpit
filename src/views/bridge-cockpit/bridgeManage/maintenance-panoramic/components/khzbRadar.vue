<template>
  <!-- khzb-考核指标 -->
  <div class="module-khzb module-pub">
    <moduleTitle title="考核指标" />
    <radar
      refName="khzb-radar"
        class='module-echarts'
      ref="echartsRadar" 
      :areaColor="areaColor"
    />
  </div>
</template>
<script>
import radar from "@/views/bridge-cockpit/components/chartComponents/Radar";
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
export default {
  components: {
    radar,
    moduleTitle,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  data() {
    return { 
      areaColor:['rgba(76,245,246,0.53)','rgba(42,105,225,0.41)']
    };
  },
  watch: {
    fontSize: {
      handler(val) {
        const remW = 3.8958; //单位rem
        const remH = 2.7604; //   265px/0.96
        this.width = val * remW;
        this.height = val * remH; 
        this.$nextTick(() => {
          this.$refs.echartsRadar.echartsResize();
        });
      },
      // immediate: true,
    },
     id(val) {
      this.$nextTick(() => {
        this.setEcharts();
      });
     }
  },
};
</script>
<style lang="scss" scoped>
.module-khzb {
  width: 3.8958rem;
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
