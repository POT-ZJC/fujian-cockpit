<template>
  <div :ref="refName"></div>
</template>

<script>
import echarts from "echarts";
// fontSize
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
    isToAmount: {
      type: Boolean,
      default: false,
    },
    refName: {
      type: String,
      default: "refName",
    },
    grid: {
      type: Object,
      default() {
        return {};
      },
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
    yAxisNmae: {
      type: String,
      default: "",
    },
    xAxisRotate: {
      type: Number,
      default: 0,
    },
    xAxisData: {
      type: Array,
      default: () => [], //['2015', '2016', '2017', '2018', '2019', '2020', '2021']
    },
    legendData: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => ["#00A6E3", "#87680C"],
    },
    moduleName: {
      type: String,
      default: "",
    },
    dataList: {
      type: Array,
      default: () => [
        // { name: '1', data: [120, 200, 150, 80, 70, 110, 130] },
        // { name: '2', data: [200, 150, 80, 70, 110, 130, 219] }
      ],
    },
  },

  data() {
    return {
      myChart: null,
      // highlighttName: '',
      seriesItem: {
        name: "",
        showBackground: true,
        backgroundStyle: {
          color: "#273b58",
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowBlur: 4,
          shadowOffsetX: 4,
        },
        label: {
          normal: {
            show: false,
            position: "inside",
            formatter: "{c}",
            // offset: [10, 0],
            textStyle: {
              color: "white", //color of value
            },
            fontFamily: "DINENGSCHRIFTSTD",
            fontSize: 14,
          },
        },
        type: "bar",
        barWidth: 14,
        stack: "1",
        data: [],
      },
    };
  },
  mounted() {
    this.createCharts();
  },
  methods: {
    setEcharts() {
      let maxVal = 0;

      const seriesItemArr = this.dataList.map((item) => {
        item.data.forEach((val) => {
          Number(val) > maxVal && (maxVal = Number(val));
        });
        return {
          ...this.seriesItem,
          ...item,
        };
      });
      let yAxisNmae = "";
      if (this.isToAmount) {
        let amountObj = numToAmount(maxVal);
        yAxisNmae = amountObj.unit;
        let baseNum = 1;
        if (amountObj.unit === "万") {
          //     // item.label.normal.formatter = ''
          baseNum = 10000;
        } else if (amountObj.unit === "亿") {
          baseNum = 10000 * 10000;
        }
        seriesItemArr.forEach((item) => {
          item.data.forEach((val, index) => {
            item.data[index] = {
              value: val / baseNum,
              tooltip: {
                // normal: {
                // show: true,
                trigger: "item",
                formatter: `{a} <br/>{b} : ${val}`,
                // }
              },
            };
          });
        });
      }
      const xAxisData = this.xAxisData.length ? this.xAxisData : ["暂无数据"];
      const option = {
        color: this.colors,
        xAxis: {
          axisLabel: { rotate: this.xAxisRotate },
          data: xAxisData,
        },
        yAxis: {
          name: yAxisNmae || this.yAxisNmae,
        },
        dataZoom: [{ ...this.dataZoom }],
        grid: this.grid,
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
    setDataZoom() {
      const option = {
        dataZoom: [this.dataZoom],
      };
      this.myChart.setOption(option);
    },
    echartsResize() {
      this.myChart.resize();
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);
      const seriesItemArr = this.dataList.map((item) => {
        let newItem = { ...this.seriesItem, ...item };
        return newItem;
      });
      // console.log(seriesItemArr)
      let fontColor = "#fff";
      let option = {
        color: this.colors,
        legend: {
          data: this.legendData,
          itemWidth: 10,
          itemHeight: 10,
          right: 0,
          textStyle: {
            color: "#ccc",
          },
        },
        dataZoom: [{ type: "inside", ...this.dataZoom }],
        grid: {
          containLabel: true,
          top: '20%',
          left: '3%',
          right: '3%',
          bottom: 5,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",

          data: this.xAxisData,
          axisLabel: {
            rotate: this.xAxisRotate,
            interval: 0,
            //    rotate:40 ,
            textStyle: {
              color: fontColor,
              fontFamily: "DINENGSCHRIFTSTD",
            },
            // formatter: '{a|{value} a}',
            // width: 40,
            // rich: {
            //     a: {
            //         color: '#fff',
            //         width: 40
            //     }
            // }
          },
          axisLine: {
            lineStyle: {
              color: "#485465",
            },
          },
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: fontColor,
          },
          axisLabel: {
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
          splitLine: {
            show: true,
            lineStyle: {
              color: "#485465",
            },
          },
        },
        series: seriesItemArr,
      };
      this.myChart.setOption(option);
    },
  },
};
</script>
