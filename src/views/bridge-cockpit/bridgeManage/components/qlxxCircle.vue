<template>
  <!-- qlxx-桥梁信息 -->
  <div class="module-qlxx module-pub">
    <moduleTitle title="桥梁信息" />
    <!--  -->
    <circleEcharts
      ref="echartsCircles"
      class="module-echarts"
      refName="qlxx-circle"
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
    fontSize: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.echartsCircles.echartsResize();
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      title: {},
      moduleName: "桥梁信息",
      colors: ["#7ECAFE", "#00388C", "#A4DCFF", "#086CD8"],
      legendData: [],
      legendTxtList: [
        { txt: "特大桥", unit: "" },
        { txt: "大桥", unit: "" },
        { txt: "中桥", unit: "" },
        { txt: "小桥", unit: "" },
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
          value: [10, 280 - index * 75],
          itemStyle: {
            color: color,
          },
          label: {
            position: "right",
            distance: 5,
            show: true,

            formatter: `{b|${val.txt}} {a|${value}} {b|${val.unit || "条"}}`,
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
.module-qlxx {
  width: 3.8958rem;
  height: 3.2292rem;
}
.module-echarts {
  width: 100%;
  height: 2.7604rem;
}
</style>
