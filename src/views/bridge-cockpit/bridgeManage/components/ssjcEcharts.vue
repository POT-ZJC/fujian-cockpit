<template>
  <!-- ssjc-实时监测 -->
  <div class="module-ssjc module-pub">
    <moduleTitle title="实时监测" />
    <div class="data-total-box" >
      异常突发事件:<span class="data-total"> {{ dataTotal }}</span>
    </div>
    <radar
      refName="ssjc-radar"
      ref="echartsRadar"
      class='module-echarts' 
      :center="center" 
      :areaColor="areaColor"
      :dataList="dataList"
      :indicatorData="indicatorData"
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
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  data() {
    return { 
      center: ['45%','60%'],
      dataTotal: 0,
      areaColor: ["rgba(251,73,124,0.8)", "rgba(251,73,124,0)"],
      indicatorData: [
        //指示器配置
        {
          name: "除湿机故障",
        },
        {
          name: "台风",
        },
        {
          name: "重载",
        },
        {
          name: "船撞",
        },
        {
          name: "地震",
        },
      ],
      dataList: [],
    };
  },
  watch: {
    fontSize: {
      handler(val) { 
        this.$nextTick(() => {
          this.$refs.echartsRadar.echartsResize();
        });
      },
      immediate: true,
    },
  },

  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      const maxDataNum = 500;
      const minNum = 50;
      let valueArr = [];
      this.indicatorData.forEach((a) => {
        a.max = maxDataNum;
        const value = Math.floor(
          Math.random() * (maxDataNum - minNum + 1) + minNum
        );
        this.dataTotal = this.dataTotal + value;
        valueArr.push(value);
      });

      this.dataList = [
        {
          value: valueArr,
          name: "实时监测",
        },
      ];
      this.$nextTick(() => {
        this.$refs.echartsRadar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-ssjc {
  width: 3.8958rem;
  height: 3.2292rem;
  position: relative;
  display: flex;
  flex-direction: column;
}
.module-echarts {
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
.data-total-box {
  position: absolute;
  display: flex;
  align-items: center;
  right: 24px;
  top: 56px; 
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  .data-total {
    font-size: 20px;
    font-family: DINEngschriftStd;
    color: #00ffde;
  }
}
</style>
