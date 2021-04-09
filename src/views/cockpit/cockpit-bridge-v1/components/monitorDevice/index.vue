<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">在线监测设备数量</div>
    </template>

    <!-- <moduleTitle title="监测设备" /> -->
    <!-- 监测设备总数 -->

    <template slot="head-right">
      <div class="select-box">
        <!-- <div class="switch-btn ">规模</div>
        <div class="switch-btn switch-active">形式</div> -->
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

    <!-- <div class="monitorDevice-total">
      <div class="name" @click="openCharts">监测设备总数</div>
      <div class="value">{{ total }}</div>
    </div> -->

    <barCircle
      :ref="refName"
      :polar="polar"
      :colors="colors"
      :title="title"
      :dataList="dataList" 
      style="height:100%;width:100%"
      :startAngle="startAngle"
    />
  </moduleWrapper>
</template>
<script>
// import echarts from "echarts";
import moduleWrapper from "@/views/cockpit/cockpit-bridge-v1/components/ui/module-wrapper";
import barCircle from "@/views/cockpit/cockpit-bridge-v1/components/charts/barCircle";
import cockpitSelect from "@/views/cockpit/cockpit-bridge-v1/components/ui/select";
import {  bridgeStore } from "@/views/cockpit/cockpit-bridge-v1/bridgeStore";
import { demoData } from "./在线监测设备数量.js";
export default {
  components: { moduleWrapper, barCircle, cockpitSelect },
  props: {},
  computed: {
    pageLevelValue(val) {
      return bridgeStore.currentAreaLevelValue;
    },
  },
  watch: {
    pageLevelValue(val) {
      this.type1 = "";
      this.type2 = "";
      this.handleDemoData();
    },
  },
  data() {
    return {
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
      isShow: false,
      grid: { containLabel: false, right: "5%" },
      polar: {
        center: ["50%", "35%"],
        radius: "115%",
      },
      dataTotal: 0,
      total: 895,
      refName: "echartsBar",
      startAngle: 90,
      dataList: [], 
      name: "设备",
      title: {
        text: "",
        top: "40%",
        subtext: "总数",
      },
      // colors: [['#8963FF', '#0190FF'], '#9475CD'],
      //  colors:['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],
      colors: [
        ["#f4af54", "#f4af54"],
        ["#5fd0d3", "#5fd0d3"],
        ["#f1918c", "#f1918c"],
        ["#3f99f6", "#3f99f6"],
        ["#2c7ff1", "#2c7ff1"],
      ],
      dataList: [],
    };
  },
  mounted() {
    // this.$forceUpdate()
    this.handleDemoData();
  },
  methods: {
    handleType1Data(data) {
      let type = data.value || "";
      this.type2 = "";
      this.handleDemoData(type);
    },
    handleType2Data(data) {
      let type = data.value || ""; 
      this.type1 = "";
      this.handleDemoData(type);
    },
    handleDemoData(type) {
      let dataSource = [];
      try {
        dataSource =
          demoData[this.pageLevelValue || "福建省"][type || "全部"] || [];
      } catch (err) {}
      let demoDataList = [];
      let total = 0;
      // this.yAxis.data = [];
      dataSource.forEach((val, index) => {
        // const value = window.MathRandom(5*index, total);
        // total = total - value;
        demoDataList.push(val["数量"]);
        // this.yAxis.data.push(val["设备"]);
        total += val["数量"];
      });

      demoDataList.sort((a, b) => {
        return b - a;
      });
      this.total = total; 
      this.setEcharts(dataSource, demoDataList);
    },
    setEcharts(dataSource, demoDataList) {
      let dataList = [];
      dataList = dataSource.map((item, index) => {
        const value = demoDataList[index];
        let obj = {
          name: item['设备'],
          value: value,
          tooltip: {
            show:true,
            formatter: item['设备']+`:${value}(${
              (value / this.total).toFixed(2).split(".")[1]
            }%) `,
          },
        };

        return obj; 
      });
      this.title.text = this.total;
      this.dataList = dataList;
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
        this.$refs.echartsBar.echartsResize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
//监测设备总数
.monitorDevice-total {
  //   position: absolute;
  //   top: 15px;
  //   right: 15px;
  justify-content: flex-end;
  font-size: torem(20px);
  font-weight: bold;
  display: flex;
  // align-items: center;
  height: torem(30px);
  line-height: torem(29px);
  .name {
    color: #fff;
    cursor: pointer;
  }
  .value {
    font-size: 22px;
    color: #eac922;
  }
}
// .charts {
//   margin-top: torem(10px);
//   width: 100%;
//   height: torem(300px);
// }
</style>
