<template>
  <div :ref="moduleName" class="radar-container"></div>
</template>
<script>
import echarts from "echarts";
import { store } from "@/views/cockpit/cockpitStore";
export default {
  computed: {
    fontSize() {
      return store.fontSize;
    },
  },
  watch: {
    fontSize(val) {
      this.echartsResize();
    },
  },
  props: {
    // refName: {
    // 	type: String,
    // 	default: ''
    // },
    moduleName: {
      type: String,
      default: "雷达图",
    },
    dataList: {
      type: Array,
      default: () => [
        // {
        // 	title:'数据项',number:111
        // }
      ],
    },
    areaColors: {
      type: Array,
      default() {
        return ["rgba(13,64,95,0.9)", "rgba(8,30,48,0.7)"];
      },
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.createCharts();
  },
  methods: {
    setEcharts() {
      // debugger
      const { indicator, radarData, tooltip } = this.handleData();
      const option = {
        tooltip,
        radar: { indicator },
        series: [{ data: radarData }],
      };
      console.log("radarData", radarData, indicator);
      this.myChart.setOption(option);
    },
    echartsResize() {
      this.myChart.resize();
    },
    handleData() {
      let indicator = [];
      let tooltip = {};
      let formatter = "";
      let max = 0;
      const radarData = {
        value: [],
        name: this.moduleName,
      };
      this.dataList.forEach((val) => {
        val.number = Number(val.number);
        val.number > max && (max = val.number);
      });
      formatter += `<div>${this.moduleName}<br/>`;
      this.dataList.forEach((val) => {
        const name = `${val.title}:${val.number}`;
        radarData.value.push(val.number);
        formatter += `${name}<br/>`;
        indicator.push({
          name,
          max: max,
          color: "#fff",
        });
      });
      formatter += "</div>";
      tooltip.formatter = function() {
        return formatter;
      };
      if (!indicator.length) {
        indicator = [{ name: "暂无数据", max: 0, color: "#fff" }];
      }

      return {
        tooltip,
        indicator,
        radarData: [radarData],
      };
    },
    createCharts() {
      const { indicator, radarData } = this.handleData();
      // console.log('radarDataradarDataradarData', indicator, radarData)
      this.myChart = echarts.init(this.$refs[this.moduleName]);
      const option = {
        tooltip: {},
        radar: {
          radius: "70%",
          name: {
            // formatter: function(value, indicator) {
            //   console.log("indicator", indicator);
            //   return "【" + value + "】";
            // },
            textStyle: {
              color: "#fff",
              fontSize: "12",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          nameGap: "2",
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              color: "#62a2cd",
              // opacity: 0.2,
              width: 1,
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(61,191,205,1)",
              opacity: 0.2,
              width: 1,
            },
          },
          splitArea: {
            areaStyle: {
              color: ["rgba(0,11,67,0.1)", "rgba(10,41,112,0.1)"].reverse(),
            },
          },
          // splitArea: {
          // 	areaStyle: {
          // 		opacity: 0
          // 	}
          // },
          indicator: indicator,
        },
        series: [
          {
            name: this.moduleName,
            type: "radar",
            symbolSize: 3,
            itemStyle: {
              normal: {
                color: "rgba(76,245,246,1)",
              },
            },
            lineStyle: {
              normal: {
                color: "rgba(2,99,255,1)",
                width: 1,
              },
            },
            // label:{
            //   formatter: "{a}: {@name}",
            // },
            // tooltip: {
            //     formatter(prop,a){
            //       console.info('formatter',prop,a)
            //       return 'aaa'
            //     },
            // },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    // color: "rgba(2,99,255,0.5)",
                    color: this.areaColors[0],
                  },
                  {
                    offset: 0.9,
                    // color: "rgba(133,0,210,0.5)",
                    color: this.areaColors[1],
                  },
                ]),
                opacity: 1,
              },
            },
            data: radarData,
          },
        ],

        backgroundColor: "",
      };

      this.myChart.setOption(option);
      this.$nextTick(() => {
        this.echartsResize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.radar-container {
  width: 100%;
  height: 100%;
}
</style>
