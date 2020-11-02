<template>
  <!-- bhgl-病害管理 -->
  <div class="module-bhgl module-pub">
    <moduleTitle title="病害管理" />
    <bar
      ref="echartsBar"
      refName="bhgl-bar"
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
      colors: ["#00A6E3", "#87680C"],
      legendData: ["完成", "未完成"],
      xAxisData: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
      dataList: [
        {
          name: "完成",
          data: [120, 200, 150, 80, 70, 110, 130],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#E4B52E" },
              { offset: 1, color: "#87680C" },
            ]),
          },
        },
        {
          name: "未完成",
          data: [200, 150, 80, 70, 110, 130, 219],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00CEE3" },
              { offset: 1, color: "#00A6E3" },
            ]),
          },
        },
      ],
    };
  },
  mounted() {
    // this.$forceUpdate()
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      const minNum = 80,
        maxNum = 200;
      this.dataList[0].data = this.xAxisData.map((a) => {
        return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      });
      this.dataList[1].data = this.xAxisData.map((a) => {
        return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      });
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-bhgl {
  width: 377px;
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
