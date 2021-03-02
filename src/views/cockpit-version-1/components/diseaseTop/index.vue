<template>
  <moduleWrapper>
    <template slot="head">
      <div class="module-title">病害TOP</div>
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
import bar from "../charts/bar";
export default {
  components: { radar, moduleWrapper, bar },

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
      typeBars,
      typeBarData: [
        {
          name: "病害类型TOP",
          data: [],
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
      colors: ["#00A6E3", "#87680C"],

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
    typeDemoData() {
      let objdata = [];
      //   debugger
      for (let i = 0; i < 6; i++) {
        objdata.push(window.MathRandom(10, 50));
        const length = this.typeBars.length;
        const index = window.MathRandom(1, length) - 1;
        const str = this.typeBars.splice(index, 1);
        this.xAxisData1.push(str);
      }
      this.typeBarData[0].data = objdata;
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
    partsDemoData() {
      let partsBars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      let objdata = [];
      //   debugger
      for (let i = 0; i < 6; i++) {
        objdata.push(window.MathRandom(10, 50));
        const length = partsBars.length;
        const index = window.MathRandom(1, length) - 1;
        const str = partsBars.splice(index, 1);
        this.xAxisData2.push("部件-" + str);
      }
      this.partsBarData[0].data = objdata;
      console.log(this.partsBarData);
      this.$nextTick(() => {
        this.$refs.partsBar.setEcharts();
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
  },
};
</script>
<style lang="scss" scoped>
.charts-left {
  float: left;
  height: 100%;
  width: 50%;
  position: relative;
  .charts-radar {
    height: 100%;
  }
  .charts-title {
    margin: 0 auto;
    text-align: center;
    font-size: torem(16px);
    font-weight: bold;
    color: #fff;
  }
}
.charts-right {
  float: right;
  height: 100%;
  width: 50%;
  position: relative;
  .charts-title {
    text-align: center;
    margin: 0 auto;
    font-size: torem(16px);
    font-weight: bold;
    color: #fff;
  }
  .charts-radar {
    height: 100%;
  }
}
</style>
