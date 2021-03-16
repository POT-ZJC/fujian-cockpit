<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">在线监测设备数量</div>
    </template>

    <!-- <moduleTitle title="监测设备" /> -->
    <!-- 监测设备总数 -->

    <template slot="head-right">
      <div class="switch-box">
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

    <bar
      ref="echartsBar"
      style="width:100%;height:100%"
      :colors="colors"
      :dataList="dataList"
      :yAxis="yAxis"
      :grid="grid"
      :moreYAxis="moreYAxis"
    />
  </moduleWrapper>
</template>
<script>
import echarts from "echarts";
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import bar from "@/views/cockpit-version-1/components/charts/barType2";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import { demoData } from "./在线监测设备数量.js";
export default {
  components: { moduleWrapper, bar, cockpitSelect },
  props: {},
  computed: {
    pageLevelValue(val) {
      return store.currentAreaLevelValue;
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
      optionData: [{ value: "xixihaha" }],
      isShow: false,
      grid: { containLabel: false, right: "5%" },
      dataTotal: 0,
      total: 895,
      colors: ["#00A6E3", "#87680C"],
      yAxis: {
        position: "right",
        axisLabel: {
          verticalAlign: "bottom",
          //   show:false,
          align: "right",
          padding: [0, 0, 12, 12],
          textStyle: {
            color: "#FFFFFF",
            fontSize: "12",
          },
        },
        data: [],
      },
      moreYAxis: [],
      colorItemArr: [
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
      const moreYAxisdata = {
        splitLine: "none",
        axisTick: "none",
        position: "right",
        axisLine: "none",
        data: [],
        inverse: true,
        axisLabel: {
          show: false,
          verticalAlign: "bottom",
          align: "right",
          padding: [0, 10, 12, 0],
          textStyle: {
            color: "#fff",
            fontSize: "14",
          },
          formatter: function(value) {
            return value; //+ 'W'
          },
          // rich: {
          // y: {
          //     color: '#befbff',
          //     fontSize: 16
          // },
          // x: {
          //     color: '#f6cf42',
          //     fontSize: 16
          // }
          // }
        },
      };
      //  { 设备: "环境", 数量: 87 },
      // { 设备: "车辆荷载", 数量: 103 },
      // { 设备: "结构整体响应", 数量: 123 },
      // { 设备: "结构局部响应", 数量: 135 },
      // { 设备: "视频", 数量: 205 },
      let dataSource = [];
      try {
        dataSource = demoData[this.pageLevelValue || "福建省"][type||'全部']||[];
      } catch (err) {}
      let demoDataList = [];
      let total = 0;
      this.yAxis.data=[]
      dataSource.forEach((val, index) => {
        // const value = window.MathRandom(5*index, total);
        // total = total - value;
        demoDataList.push(val["数量"]);
        this.yAxis.data.push(val["设备"]);
        total += val["数量"];
      });

      demoDataList.sort((a, b) => {
        return b - a;
      });

      this.dataList = dataSource.map((aItem, index) => {
        moreYAxisdata.data.push(demoDataList[index]); 
        return {
          name: aItem,
          value: demoDataList[index],
          barCategoryGap: 15,
          label: {
            normal: {
              formatter: "{c}个",
            },
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });
      this.moreYAxis.push(moreYAxisdata);
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
