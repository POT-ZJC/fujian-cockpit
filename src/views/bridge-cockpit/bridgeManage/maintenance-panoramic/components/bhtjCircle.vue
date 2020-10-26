<template>
  <!-- bhtj-病害统计 -->
  <div class="module-bhtj module-pub">
    <moduleTitle title="病害统计" /> 
    <circleEcharts
      ref="echartsCircles"
      class="module-echarts"
      refName="bhtj-circle" 
      :colors="colors"
      :dataList="dataList"
      :title="title"
      :moduleName="moduleName"
      :legendData="legendData"
    />
  </div>
</template>
<script>
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
import circleEcharts from "@/views/bridge-cockpit/components/chartComponents/circle";
export default {
  components: {
    circleEcharts,
    moduleTitle,
  },
  props: {
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  watch: {
    fontSize(val) {
      this.$nextTick(() => {
        this.$refs.echartsCircles.echartsResize();
      });
    },
  },
  data() {
    return {
      title: {},
      moduleName: "病害统计", 
      colors: ["#00388C", "#086CD8", "#39A3FE", "#7ECAFE", "#A4DCFF"],
      legendData: [],
      legendTxtList: [
        { txt: "混凝土裂缝：", unit: "" },
        { txt: "蜂窝麻面：", unit: "" },
        { txt: "剥落露筋：", unit: "" },
        { txt: "钢筋锈蚀：", unit: "" },
        { txt: "混凝土碳化：", unit: "" },
      ],
      dataList: [],
    };
  },
  mounted() {
    this.createEcharts();
  },
  methods: {
    createEcharts() {
      // this.legendData = this.dataList.map(val => val.name)
      let valueTotal = 0;
      this.dataList = this.legendTxtList.map((val, index) => {
        const minNum = 50,
          maxNum = 400;
        const color = this.colors[index];
        const value = Math.floor(
          Math.random() * (maxNum - minNum + 1) + minNum
        );
        valueTotal += value;
        const item = {
          name: val.txt,
          value: [0, 320 - index * 75],
          itemStyle: {
            color: color,
          },
          label: {
            position: "right",
            distance: 5,
            show: true,

            formatter: `{b|${val.txt}}{a|${value}}{b|${val.unit || "条"}}`,
            rich: {
              a: {
                color: color,
                fontSize: 20,
                fontFamily: "DINEngschriftStd",
              },
              b: { color: "#fff", fontSize: 12 },
            },
          },
        };
        this.legendData.push(item);
        return { value: value, name: val.txt };
      });
      this.title = {
        text: valueTotal + "",
        subtext: "共计",
        // name: this.moduleName
      };
      this.$nextTick(() => {
        this.$refs.echartsCircles.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-bhtj {
  width: 3.8958rem;
  height: 3.2292rem;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
}
.module-echarts {
  width: 100%;
  // height: 2.7604rem;
  flex: 1;
}
</style>
