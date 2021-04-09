<template>
  <div :ref="refName" style="width:100%;height:100%"></div>
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
    refName: {
      type: String,
      default: "lines",
    },
    colors: {
      type: Array,
      default: () => [],
    },
    yAxis: {
      type: Object,
      default() {
        return {};
      },
    },
    xAxisData: {
      type: Array,
      default: () => [],
    },
    dataZoom: {
      type: Object,
      default() {
        return {
          // start: 0,
          // end: 10
        };
      },
    },
    legendData: {
      type: Array,
      default: () => [],
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      myChart: null,
      lineItem: {
        name: "",
        type: "line",
        // stack: '总量1',
        symbolSize: 3,
        smooth: true,
        data: [],
      },
    };
  },
  mounted() {
    this.createCharts();
  },
  methods: {
    echartsResize() {
      this.myChart.resize();
    },
    setDataZoom() {
      const option = {
        dataZoom: [this.dataZoom],
      };
      this.myChart.setOption(option);
    },
    setEcharts() {
      let maxVal = 0,
        lineWidth = 2;
      const seriesItemArr = this.dataList.map((item, index) => {
        const color = this.colors[index];
        if (typeof color === "string") {
          item.itemStyle = {
            normal: {
              lineStyle: {
                color: color,
                width: lineWidth,
              },
            },
          };
        } else if (Array.isArray(color)) {
          item.itemStyle = {
            normal: {
              lineStyle: {
                color: color[0],
                width: lineWidth,
              },
              
              areaStyle: {
                //color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[0],
                  },
                  {
                    offset: 0.9,
                    color: color[1] || color[0],
                  },
                ]),
              },
            },
          };
        }

        return {
          ...this.lineItem,
          ...item,
        };
      });

      const option = {
        color: this.colors,
        yAxis: [this.yAxis],
        xAxis: [
          {
            data: this.xAxisData.length ? this.xAxisData : ["暂无数据"],
          },
        ],
        // grid: this.grid,
        dataZoom: [{ ...this.dataZoom }],
        legend: {
          data: this.legendData,
        },
        series: seriesItemArr,
      };

      this.myChart.setOption(option);
      this.$nextTick(() => {
        this.echartsResize();
      });
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);
      let option = null;
      let fontColor = "#fff";
      option = {
        backgroundColor: "rgba(10,37,64,0.1)",
        grid: {
          left: "3%",
          right: "3%",
          top: "20%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          show: true,
          // x: 'center',
          y: "top",
          right: 0,
          icon: "stack",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#ccc",
          },
          // data: ['总量', '完成量']
        },
        dataZoom: [
          {
            // start: 0,
            type: "inside",
            // minSpan: 1,
            // end: 10
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false, //轴线是否对齐空格
            axisLabel: {
              interval: 0,
              // color: fontColor,
              textStyle: {
                color: fontColor,
                fontFamily: "DINENGSCHRIFTSTD",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#485465",
              },
            },
            axisTick: {
              show: false,
            },

            data: this.xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: '养护任务单',
            min: 0,
            max: 100,
            nameTextStyle: {
              color: "#fff",
              // fontFamily: "DINENGSCHRIFTSTD",
            },
            axisLabel: {
              // formatter: '{value}',
              textStyle: {
                color: fontColor,
                fontFamily: "DINENGSCHRIFTSTD",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#485465",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#485465",
              },
            },
          },
        ],
        series: [],
      };

      this.myChart.setOption(option);
    },
  },
};
</script>
