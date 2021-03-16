<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">桥梁分布</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <div
          class="switch-btn "
          :class="{ 'switch-active': switchType === '规模' }"
          @click="handleTypeData('规模')"
        >
          规模
        </div>
        <div
          class="switch-btn "
          :class="{ 'switch-active': switchType === '形式' }"
          @click="handleTypeData('形式')"
        >
          形式
        </div>
        <!-- <cockpit-select
            v-model="type1"
            :optionData="optionData"
            placeholder="规模"
          />
          <cockpit-select
            v-model="type1"
            :optionData="optionData"
            placeholder="形式"
          /> -->
      </div>
    </template>
    <bar
      ref="echartsBar"
      style="width:100%;height:100%"
      refName="bridgeDistribution"
      yAxisNmae="单位:座"
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
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import echarts from "echarts";
import bar from "../charts/bar";
export default {
  components: { moduleWrapper, bar, cockpitSelect },
  computed: {
    // companyList() {
    //   return store.areaList;
    // },
    bridgeDistributionData() {
      return store.bridgeDistributionData;
    },
    currentAreaLevelValue() {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    bridgeDistributionData: {
      handler(val) {
        // this.demoData();
        this.bridgeDistributionScaleData = val.bridgeDistributionScale;
        this.bridgeDistributionFormData = val.bridgeDistributionForm;
        this.handleTypeData("规模");
      },
      deep: true,
    },
  },
  data() {
    return {
      switchType: "",
      bridgeDistributionScaleData: [], //规模桥梁分布
      bridgeDistributionFormData: [], //形式桥梁分布
      grid: {},
      xAxisData: [],
      colors: ["#00A6E3", "#87680C"],
      legendData: [],
      colorItemArr: [
        ["#148d90", "#148d90"], //
        ["#32b3b6", "#32b3b6"], //
        ["#64d2d5", "#64d2d5"], //
        ["#93f1f4", "#93f1f4"], //
        ["rgba(147,241,244,0.7)", "rgba(147,241,244,0.7)"], //
      ],
      dataList: [{}],
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

    handleTypeData(type) {
      let legendFormat = [];
      let sourceData = [];
      if (type === "规模") {
        this.switchType = "规模";
        legendFormat = [
          { name: "特大", field: "superBigNumber" },
          { name: "大", field: "bigNumber" },
          { name: "中", field: "centerNumber" },
          { name: "小", field: "smallNumber" },
        ];
        sourceData = this.bridgeDistributionScaleData;
      } else if (type === "形式") {
        this.switchType = "形式";
        legendFormat = [
          { name: "梁桥", field: "liangNumber" },
          { name: "拱桥", field: "gongNumber" },
          { name: "刚构", field: "gangGouNumber" },
          { name: "悬索", field: "xuanSuoNumber" },
          { name: "组合", field: "zuHeNumber" },
        ];
        sourceData = this.bridgeDistributionFormData;
      }

      this.renderEchartsData(legendFormat, sourceData);
    },
    //过滤分公司和公司字符串
    filterStr(data) {
      const strs = ["分公司", "公司"];
      strs.forEach((val) => {
        // data.replace(/ /g,'')
        data = data.replace(new RegExp(`[${val}]`, "g"), "");
      });

      return data;
    },
    //
    renderEchartsData(legendFormat, sourceData) {
      const legendData = legendFormat.map((val) => val.name);
      let xAxisData = [];
      let dataList = legendData.map((aItem, index) => {
        return {
          name: aItem,
          data: [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });
      sourceData.forEach((val) => {
        legendFormat.forEach((item, index) => {
          dataList[index].data.push(val[item.field]);
        });
        xAxisData.push(this.filterStr(val.title));
      });
      this.dataList = dataList;
      console.log("legendData", legendData);
      this.legendData = legendData;

      this.xAxisData = xAxisData;
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
        this.$refs.echartsBar.echartsResize();
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
