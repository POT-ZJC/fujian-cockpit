<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">病害TOP</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
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
        <cockpit-select
            v-model="type3"
            :hasClear="false"
            :optionData="[{value:'正序'},{value:'倒序'}]"
            placeholder="排序"
          />
      </div>
    </template>
    <div class="charts-left">
      <div class="charts-title">类型</div>
      <bar
        ref="typeBar"
        style="width:100%;height:100%"
        refName="typeBar"
        yAxisNmae=""
        :colors="[colors[0]]"
        :dataList="typeBarData"
        :xAxisData="xAxisData1"
        :xAxisRotate="45"
      />
    </div>
    <div class="charts-right">
      <div class="charts-title">部件</div>
      <bar
        ref="partsBar"
        style="width:100%;height:100%"
        refName="partsBar"
        yAxisNmae=""
        :colors="[colors[1]]"
        :dataList="partsBarData"
        :xAxisData="xAxisData2"
        :xAxisRotate="45"
      />
    </div>
  </moduleWrapper>
  <!-- <div class="cockpit-module">
    <div class="module-head">
    
    </div>

   
  </div> -->
</template>
<script>
import radar from "../charts/radar";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import echarts from "echarts";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
import bar from "../charts/bar";
import { demoData1, demoData2 } from "./demoData";
export default {
  components: { radar, moduleWrapper, bar, cockpitSelect },
  computed: {
    pageLevelValue(val) {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    pageLevelValue(val) {
      this.type1 = "";
      this.type2 = "";
      this.typeDemoData();
      this.partsDemoData();
    },
  },
  data() {
    const typeBars = [
      "不完整",
      "开口",
      "纵向裂缝",
      "车辆刮痕",
      "缺失",
      "锈蚀",
      "灯具损坏",
      "灯具故障",
      "其它",
      "破损",
    ];
    return {
      // level: "福建省",
      type1: "",
      type2: "",
      type3:'正序',
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
      typeBars,
      typeBarData: [
        {
          name: "病害类型TOP",
          data: [],
          itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(53,224,220,0.91)' },
                { offset: 1, color: 'rgba(11,124,234,0.91)' },
              ]),
            },
        },
      ],
      partsBarData: [
        {
          name: "病害部件TOP",
          data: [],
        },
      ],
      xAxisData1: [],
      xAxisData2: [],
      colors: [["rgba(53,224,220,0.91)", "rgba(11,124,234,0.91)"], "#3a8ff6"],

      colorItemArr: [
        ["#00FFDE", "#007D6D"], //绿
        ["#00C9E4", "#420FFF"], //蓝
        ["#FDCE44", "#66592A"], //黄
        ["#FF7DFD", "#B72750"], //粉
        ["#DE3040", "#850D1A"], //红
      ],

      years: [],
      selectedYear: null,
    };
  },
  mounted() {
    this.typeDemoData();
    this.partsDemoData();
  },
  methods: {
    handleType1Data(data) {
      let type = data.value || "";
      this.type2 = ""; 
      this.typeDemoData(type);
      this.partsDemoData(type);
    },
    handleType2Data(data) {
      let type = data.value || "";
      this.type1 = "";
      this.typeDemoData(type);
      this.partsDemoData(type);
    },

    typeDemoData(type) {
      let xAxisData1 = [],
        arr = [],
        data = [];
      try {
        // debugger
        arr = demoData1[this.pageLevelValue || "福建省"][type || "all"];
        arr.forEach((val) => {
          xAxisData1.push(val["病害类型"]);
          data.push(val["数量"]);
        });
      } catch (err) {}
      this.typeBarData[0].data = data;
      this.xAxisData1 = xAxisData1;
      //   console.log(this.typeBarData)
      this.$nextTick(() => {
        this.$refs.typeBar.setEcharts();
      });
      //   this.xAxisData = this.companyList.map((val) => val.company);
      //     const dataList = this.companyList.map((bItem) => {
      //       //   this.xAxisData.push(bItem.company);
      //       return window.MathRandom(15, 150);
      //     });

      //     return {
      //       name: aItem,
      //       data: dataList,
      //       itemStyle: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      //           { offset: 0, color: this.colorItemArr[index][0] },
      //           { offset: 1, color: this.colorItemArr[index][1] },
      //         ]),
      //       },
      //     };

      //   console.log("xAxisData", this.xAxisData);
    },
    partsDemoData(type) {
      let xAxisData2 = [],
        arr = [],
        data = [];
      try {
        arr = demoData2[this.pageLevelValue || "福建省"][type || "all"];

        arr.forEach((val) => {
          xAxisData2.push(val["病害部件"]);
          data.push(val["数量"]);
        });
       
      } catch (err) {}
      this.partsBarData[0].data = data;
      this.xAxisData2 = xAxisData2;
      console.log(this.partsBarData);
      this.$nextTick(() => {
        this.$refs.partsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.charts-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-size: torem(16px);
  font-weight: bold;
  color: #fff;
}
.charts-left {
  float: left;
  height: 100%;
  width: 50%;
  position: relative;
  .charts-radar {
    height: 100%;
  }
}
.charts-right {
  float: right;
  height: 100%;
  width: 50%;
  position: relative;

  .charts-radar {
    height: 100%;
  }
}
</style>
