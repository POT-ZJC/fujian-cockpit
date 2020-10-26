<template>
  <div :ref="refName"  ></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: { 
    areaColor: {
      type: Array,
      default: () => [],
    },
    center: {
      type: Array,
      default: () => [],
    }, 
    refName: {
      type: String,
      default: "",
    },
    moduleName: {
      type: String,
      default: "pie",
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    indicatorData: {
      type: Array,
      default: () => [],
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
      const option = {
        // colors: this.colors,
        radar: { indicator: this.indicatorData, center: this.center },
        series: [{ name: "radars", data: this.dataList }],
      };
      console.log(option);
      this.myChart.setOption(option);
    },
    echartsResize() {
      this.myChart.resize();
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);
      let option = {
        tooltip: {},
        radar: {
          radius: "70%",
          center: ["50%", "50%"],
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              color: "rgba(61,191,205,1)",
              opacity: 0.2,
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
              opacity: 0,
            },
          },
          name: {
            textStyle: {
              color: "#fff",
            },
          },
          indicator: [],
        },
        series: [
          {
            name: "radars",
            type: "radar",
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "rgba(76,245,246,1)",
              },
            },
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(76,245,246,0.53)",
                  },
                  {
                    offset: 0.9,
                    color: "rgba(41,109,228,1)",
                  },
                ]),
                width: 3,
              },
            },

            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    // color: "rgba(76,245,246,0.53)",
                    color: this.areaColor[0],
                  },
                  {
                    offset: 0.9,
                    // color: "rgba(42,105,225,0.41)",
                    color: this.areaColor[1],
                  },
                ]),
                opacity: 1,
              },
            },
            data: [],
          },
        ],

        backgroundColor: "",
      };

      this.myChart.setOption(option);
    },
  },
};
</script>
