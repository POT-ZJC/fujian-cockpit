<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">路面技术状况</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <div
          :class="`switch-btn ${switchType === 'bar' && 'switch-active'}`"
          @click="switchTypeEvent('bar', 'echartsBar')"
        >
          分布
        </div>
        <div
          :class="`switch-btn ${switchType === 'lines' && 'switch-active'}`"
          @click="switchTypeEvent('lines', 'echartsLines')"
        >
          走势
        </div>
      </div>
    </template>
    <bar
      v-show="switchType === 'bar'"
      ref="echartsBar"
      style="width:100%;height:100%"
      refName="road-bar"
      yAxisNmae="单位：km"
      :colors="barOption.colors"
      :dataList="barOption.dataList"
      :xAxisData="barOption.xAxisData"
      :legendData="[]"
      :xAxisRotate="0"
    />
    <lines
      v-show="switchType === 'lines'"
      ref="echartsLines"
      style="width:100%;height:100%"
      refName="road-lines"
      :dataList="linesOption.dataList"
      :legendData="linesOption.legendData"
      :xAxisData="linesOption.xAxisData"
      :colors="linesOption.colors"
      :yAxis="{ name: '单位：%' }"
    />
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit/cockpit-overview-v1/ui/module-wrapper"; //bridgeLevelCondition
// import { mutationsSet, store } from "@/views/cockpit/cockpit-overview-v1/bridgeStore";
import cockpitSelect from "@/views/cockpit/cockpit-overview-v1/ui/select";
import bar from "@/views/cockpit/charts/bar";
import lines from "@/views/cockpit/charts/line";
import { demoData } from "./路面技术状况与走势";
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
      switchType: "bar",
      barOption: {
        grid: {},
        xAxisData: [],
        colors: ["#3e9ae2"],
        colorItemArr: [
          ["#041527", "#3e9ae2"], //
        ],
        dataList: [{}],
      },
      linesOption: {
        colors: [
           ["rgba(76,158,209,0.4)"],
          ["rgba(60,100,189,0.4)"],
          ["rgba(255,255,255,0.4)"],
          ["rgba(29,73,107,0.4)"],
          ["rgba(192,218,225,0.6)"]
        ],
        legendData: ["优", "良", "中", "次", "差"],
        xAxisData: [],
        dataList: [
          //   { smooth: true, data: [] }
        ],
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
      this.barRenderData(dataSource["技术状况"]);
      this.lineRenderData(dataSource["技术走势"]);
    },
    switchTypeEvent(type, echartsRef) {
      this.switchType = type;
      this.$nextTick(() => {
        this.$refs[echartsRef].echartsResize();
      });
    },
    barRenderData(dataSource) {
      // console.log('dataSource',dataSource)
      let itemData = {
        name: "技术状况",
        data: [],
        showBackground: false,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0, color: this.barOption.colorItemArr[0][0] },
            { offset: 1, color: this.barOption.colorItemArr[0][1] },
          ]),
        },
      };
      let xAxisData = [];
      dataSource.forEach((val) => {
        itemData.data.push(val["里程"]);
        xAxisData.push(val["技术等级"]);
      });
      this.barOption.dataList = [itemData];
      this.barOption.xAxisData = xAxisData;
      console.log("barOption", this.barOption);
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
        this.$refs.echartsBar.echartsResize();
      });
    },
    lineRenderData(dataSource) {
      let dataList = [],
        xAxisData = [];
      this.linesOption.legendData.forEach((val) => {
        let obj = { name: val, smooth: true, data: [] };
        dataList.push(obj);
      });
      dataSource.forEach((val) => {
        this.linesOption.legendData.forEach((item, index) => {
          dataList[index].data.push(val[item]);
        });
        xAxisData.push(val["年份"]);
      });
      this.linesOption.dataList = dataList;
      this.linesOption.xAxisData = xAxisData;
      this.$nextTick(() => {
        this.$refs.echartsLines.echartsResize();
        this.$refs.echartsLines.setEcharts();
      });
    },
  },
};
</script>
