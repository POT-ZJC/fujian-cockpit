<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">技术状况走势</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
        <!-- <div class="switch-btn ">规模</div> -->
        <!-- <div class="switch-btn switch-active">形式</div> -->
        <cockpit-select
          v-model="times"
          :hasClear="false"
          :optionData="[{ value: '近五年' }]"
          placeholder="时间"
        />
        <cockpit-select
          v-model="type1"
          :optionData="optionData1"
          @change="handleType1Data"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type2"
          :optionData="optionData2"
          @change="handleType2Data"
          placeholder="形式"
        />
      </div>
    </template>
    <lines
      ref="chartsLines"
      :dataList="dataList" 
      :legendData="legendData"
      :xAxisData="xAxisData"
      :colors="colors"
      :yAxis="{name:'单位:%'}"
    />
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit/cockpit-bridge-v1/components/ui/module-wrapper";
import {  bridgeStore } from "@/views/cockpit/cockpit-bridge-v1/bridgeStore";
// import echarts from "echarts";
import lines from "../charts/line";
import cockpitSelect from "@/views/cockpit/cockpit-bridge-v1/components/ui/select";
import { demoData } from "./技术状况走势.js";
export default {
  components: { moduleWrapper, lines, cockpitSelect },
  computed: {
    pageLevelValue(val) {
      return bridgeStore.currentAreaLevelValue;
    },
  },
  watch: {
    pageLevelValue(val) {
      this.type1 = "";
      this.type2 = "";
      this.demoData();
    },
  },
  data() {
    return {
      times: "近5年",
      type1: "",
      type2: "",
      // type3:'正序',
      optionData1: [
        { value: "特大桥" },
        { value: "大桥" },
        { value: "中桥" },
        { value: "小桥" },
      ],
      optionData2: [
        { value: "梁桥" },
        { value: "拱桥" },
        { value: "悬索桥" },
        { value: "刚构桥" },
        { value: "组合桥" },
      ],
      optionData: [{ value: "xixihaha" }],
      xAxisData: [],
      colors: [
        ["rgba(84,212,144,0.6)", "rgba(84,212,144,0)"],
        ["rgba(29,121,210,0.6)", "rgba(29,121,210,0)"],
        ["rgba(225,185,20,0.6)", "rgba(225,185,20,0)"],
        ["rgba(187,14,202,0.6)", "rgba(187,14,202,0)"],
        ["rgba(125,11,31,0.6)", "rgba(125,11,31,0)"],
      ],
      legendData: ["1类", "2类", "3类", "4类", "5类"],
      //   dataZoom: {
      //     start: 0,
      //     end: 50,
      //   },
      dataList: [
        //   { smooth: true, data: [] }
      ],
    };
  },
  mounted() {
    this.demoData();
  },
  methods: {
    handleType1Data(data) {
      let type = data.value || "";
      this.type2 = "";
      this.demoData(type);
    },
    handleType2Data(data) {
      let type = data.value || "";
      this.type1 = "";
      this.demoData(type);
    },

    demoData(type) {
      //  {  smooth: true, data: [] }
      //  {
      //         年份: 2016,
      //         "1类": "36.22%",
      //         "2类": "24.27%",
      //         "3类": "21.14%",
      //         "4类": "6.11%",
      //         "5类": "2.82%",
      //       },
      type = type ? this.times + "-" + type : this.times;
      let dataList = [],
        dataSource = [],
        xAxisData = [];
      try {
        dataSource = demoData[this.pageLevelValue || "福建省"][type];
      } catch (err) {}
      this.legendData.forEach((val) => { 
        let obj = { name: val, smooth: false, data: [] };
        dataList.push(obj);
      });
      // debugger;
      dataSource.forEach((val) => {
        this.legendData.forEach((item, index) => {
          dataList[index].data.push(val[item]);
        });
        xAxisData.push(val["年份"]);
      });
      this.dataList = dataList;
      this.xAxisData = xAxisData;
      this.$nextTick(() => {
        this.$refs.chartsLines.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>

/deep/.head-right{
  margin-left: 1.2rem !important;
  width: calc(100% - 1.2rem)!important;
}

</style>
