<template>
  <!-- yhwx-养护维修 -->
  <div class="module-yhwx module-pub">
    <moduleTitle title="养护维修" /> 
    <circleEcharts
      ref="echartsCircles"
      class="module-echarts"
      refName="yhwx-circle" 
      :colors="colors"
      :showLabel="true"
      :dataList="dataList"
      :title="title"
      :center="center"
      :moduleName="moduleName" 
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
      center:["50%",'50%'],
      moduleName: "养护维修", 
      colors: ["#00388C", "#086CD8", "#39A3FE", "#7ECAFE", "#A4DCFF"],
      legendData: [],
      legendTxtList: [
        { txt: "已修复", unit: "" },
        { txt: "未修复", unit: "" }, 
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
        const value = Math.floor(
          Math.random() * (maxNum - minNum + 1) + minNum
        );
        valueTotal += value;
         
        return { value: value, name: val.txt };
      });
      this.title = {
        text: valueTotal + "",
        subtext: "共计",
          left: "49%",
          top: "39%", 
      };
      this.$nextTick(() => {
        this.$refs.echartsCircles.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-yhwx {
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
