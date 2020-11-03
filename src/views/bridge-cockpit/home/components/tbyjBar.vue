<template>
  <!-- tbyj-通报预警 -->
  <div class="module-tbyj module-pub">
    <moduleTitle title="通报预警" />
    <bar
      ref="echartsBar"
      refName="tbyj-bar"
      class="module-echarts"
      :colors="colors"
      :dataList="dataList"
      :xAxisData="xAxisData"
      :legendData="legendData"
    />
  </div>
</template>
<script>
import echarts from "echarts";
import bar from "@/views/bridge-cockpit/components/chartComponents/bar";
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
export default {
  components: {
    bar,
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
  watch: {
    fontSize: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.echartsBar.echartsResize();
        });
      },
      immediate: true,
    },
    id(val) {
      this.$nextTick(() => {
        this.setEcharts();
      });
    },
  },
  data() {
    return {
      grid: {},
      colors: ["1D60FF", "00AAE7"],
      legendData: ["通报数", "预警数"],
      xAxisData: [
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-01",
        "2020-04",
        "2020-05",
        "2020-06",
      ],
      colorItemArr: [
        ["#1D60FF", "#4409FF"],
        ["#00AAE7", "#00D2E8"],
      ],
      dataList: [],
    };
  },
  mounted() {
    // this.$forceUpdate()
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      this.dataList = this.legendData.map((a, index) => {
        const minNum = 50,
          maxNum = 400;
        const dataList = this.xAxisData.map(() =>
          Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
        );

        return {
          name: a,
          data: dataList,
          barWidth: 6,
          stack: index + "",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });

      console.log(this.dataList, "tbyj");
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-tbyj {
   width: 375px;
  height: 3.2292rem;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
}
.module-echarts {
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
</style>
