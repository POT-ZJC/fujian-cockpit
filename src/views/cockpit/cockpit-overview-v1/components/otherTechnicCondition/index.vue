<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">其他技术状况</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <div
          :class="`switch-btn ${switchType === 'bar1' && 'switch-active'}`"
          @click="switchTypeEvent('bar1', 'echartsBar1')"
        >
          涵洞
        </div>
        <div
          :class="`switch-btn ${switchType === 'bar2' && 'switch-active'}`"
          @click="switchTypeEvent('bar2', 'echartsBar2')"
        >
          机电
        </div>
      </div>
    </template>
    <bar
      v-show="switchType === 'bar1'"
      ref="echartsBar1"
      style="width:100%;height:100%"
      refName="road-bar"
      yAxisNmae="单位：个"
      :colors="barOption1.colors"
      :dataList="barOption1.dataList"
      :xAxisData="barOption1.xAxisData"
      :legendData="[]"
      :xAxisRotate="0"
    />
    <bar
      v-show="switchType === 'bar2'"
      ref="echartsBar2"
      style="width:100%;height:100%"
      refName="road-bar"
      yAxisNmae="单位：个"
      :colors="barOption2.colors"
      :dataList="barOption2.dataList"
      :xAxisData="barOption2.xAxisData"
      :legendData="[]"
      :xAxisRotate="0"
    />
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit/cockpit-overview-v1/ui/module-wrapper"; //bridgeLevelCondition
// import { mutationsSet, store } from "@/views/cockpit/cockpit-overview-v1/bridgeStore";
import cockpitSelect from "@/views/cockpit/cockpit-overview-v1/ui/select";
import bar from "@/views/cockpit/charts/bar";
import lines from "@/views/cockpit/charts/line";
import { demoData } from "./涵洞与机电.js";
import echarts from "echarts";
export default {
  components: {
    moduleWrapper,
    cockpitSelect,
    bar,
    lines,
  },
  data() {
    return {
      switchType: "bar1",
      barOption1: {
        grid: {},
        xAxisData: [],
        colors: [],
        colorItemArr: [
          ["#081a2b", "#0753a8"], //
        ],
        dataList: [{}],
      },
      barOption2: {
        grid: {},
        xAxisData: [],
        colors: [],
        colorItemArr: [
          ["#041527", "#3e9ae2"], //
        ],
        dataList: [{}],
      },
    };
  },
  mounted() {
    this.handleDemoData();
  },
  methods: {
    handleDemoData(levelValue) {
      let dataSource = [];
      //   console.log(demoData)
      try {
        dataSource = demoData[levelValue || "福建省"] || [];
      } catch (err) {
        console.log(err);
      }
      this.barRenderData1(dataSource["涵洞"]);
      this.barRenderData2(dataSource["机电"]);
    },
    switchTypeEvent(type, echartsRef) {
      this.switchType = type;
      this.$nextTick(() => {
        this.$refs[echartsRef].echartsResize();
      });
    },
    barRenderData1(dataSource) {
      // console.log('dataSource',dataSource)
      let itemData = {
        name: "涵洞",
        data: [],
        showBackground: false,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: this.barOption1.colorItemArr[0][0] },
            { offset: 1, color: this.barOption1.colorItemArr[0][1] },
          ]),
        },
      };
      let xAxisData = [];
      dataSource.forEach((val) => {
        itemData.data.push(val["数量"]);
        xAxisData.push(val["技术等级"]);
      });
      this.barOption1.dataList = [itemData];
      this.barOption1.xAxisData = xAxisData;
      console.log("barOption", this.barOption1);
      this.$nextTick(() => {
        this.$refs.echartsBar1.setEcharts();
        this.$refs.echartsBar1.echartsResize();
      });
    },
    barRenderData2(dataSource) {
      // console.log('dataSource',dataSource)
      let itemData = {
        name: "机电",
        data: [],
        showBackground: false,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: this.barOption2.colorItemArr[0][0] },
            { offset: 1, color: this.barOption2.colorItemArr[0][1] },
          ]),
        },
      };
      let xAxisData = [];
      dataSource.forEach((val) => {
        itemData.data.push(val["数量"]);
        xAxisData.push(val["技术等级"]);
      });
      this.barOption2.dataList = [itemData];
      this.barOption2.xAxisData = xAxisData;
      console.log("barOption", this.barOption2);
      this.$nextTick(() => {
        this.$refs.echartsBar2.setEcharts();
        this.$refs.echartsBar2.echartsResize();
      });
    },
  },
};
</script>
