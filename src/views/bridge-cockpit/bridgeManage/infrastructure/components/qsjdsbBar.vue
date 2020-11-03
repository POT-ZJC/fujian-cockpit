<template>
  <!-- qsjdsbBar-桥上机电设备 -->
  <div class="module-qsjdsbBar module-pub">
    <moduleTitle title="桥上机电设备" />
     <div class="data-total-box">
      设备总数:<span class="data-total"> {{ dataTotal }}</span>
    </div>
    <bar
      ref="echartsBar"
      refName="qsjdsbBar-bar"
      class="module-echarts" 
      :colors="colors"
      :dataList="dataList"
      :yAxisData="yAxisData"
    />
  </div>
</template>
<script>
import echarts from "echarts";
import bar from "@/views/bridge-cockpit/components/chartComponents/barType2";
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
export default {
  components: {
    bar,
    moduleTitle,
  },
  props: {
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  watch: {
    fontSize: {
      handler(val) { 
        this.$nextTick(() => {
          this.$refs.echartsBar.echartsResize();
        });
      },
      immediate: true,
    },
  },
  data() {
    return { 
      grid: {},
      colors: ["#00A6E3", "#87680C"],
      dataTotal:0,
      yAxisData: [
        "除湿机",
        "桁车",
        "变电站",
        "柴油发电机组",
        "平台桥上机电设备",
        "监控中心配电房",
      ],
      colorItemArr: [
        ["#8A1BFE", "#7684FB"],
        ["#3E1BFE", "#76DDFB"],
        ["#DE1BFE", "#76CBFB"],
        ["#53AAE2", "#76FBC2"],
        ["#E25366", "#FBA876"],
        ["#B72750", "#FF7DFD"],
      ],
      dataList: [],
    };
  },
  mounted() {
    // this.$forceUpdate()
    this.creatEcharts();
  },
  methods: {
    creatEcharts() {
      this.dataList = this.yAxisData.map((a, index) => {
        const minNum = 50,
          maxNum = 400;

        const value = Math.floor(
          Math.random() * (maxNum - minNum + 1) + minNum
        );
this.dataTotal = this.dataTotal + value;
        return {
          name: a,
          value: value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-qsjdsbBar {
  width: 3.8958rem;
  height: 3.2292rem;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.module-echarts { 
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
</style>
