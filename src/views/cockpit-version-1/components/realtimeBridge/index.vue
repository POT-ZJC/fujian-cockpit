<template>
  <moduleWrapper>
    <template slot="head">
      <div class="module-title">实时监测桥梁分布</div>
    </template>

     <bar
      ref="echartsBar"
      style="width:100%;height:100%"
      refName="jszkpd-bar"
      yAxisNmae="座"
      :colors="colors"
      :dataList="dataList"
      :xAxisData="xAxisData"
      :legendData="legendData"
      :xAxisRotate="45"
    />
    
    
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import echarts from "echarts";
import bar from "../charts/bar";
export default {
  components: { moduleWrapper, bar },
  computed: {
    companyList() {
      return store.areaList;
    },
  },
  watch: {
    companyList: {
      handler(val) {
        this.demoData();
      },
      deep: true,
    },
  },
  data() {
    return {
      grid: {},
      xAxisData: [],
      colors: ["#00A6E3", "#87680C"],
      legendData: ["悬索", "刚构", "拱桥", "梁桥", "组合体系"],
      colorItemArr: [
        ["#00FFDE", "#007D6D"], //绿
        ["#00C9E4", "#420FFF"], //蓝
        ["#FDCE44", "#66592A"], //黄
        ["#FF7DFD", "#B72750"], //粉
        ["#DE3040", "#850D1A"], //红
      ],
      dataList: [{}],
      years: [],
      selectedYear: null,
    };
  },
  mounted() {},
  methods: {
    demoData() {
      this.xAxisData = this.companyList.map((val) => val.company);

      this.dataList = this.legendData.map((aItem, index) => {
        const dataList = this.companyList.map((bItem) => {
          //   this.xAxisData.push(bItem.company);
          return window.MathRandom(15, 150);
        });

        return {
          name: aItem,
          data: dataList,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });
      console.log("xAxisData", this.xAxisData);
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
