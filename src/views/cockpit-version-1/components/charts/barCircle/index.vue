<template>
  <div :ref="refName"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    refName: {
      type: String,
      default: "",
    },
    grid: {
      type: Object,
      default() {
        return {};
      },
    },
    colors: {
      type: Array,
      default: () => ["#00A6E3", "#87680C"],
    },
    title: {
      type: Object,
      default() {
        return {};
      },
    },
    borderWidth: {
      type: Number,
      default: 7,
    },
    moduleName: {
      type: String,
      default: "",
    },
    polar: {
      type: Object,
      default() {
        return {};
      },
    },
    startAngle: {
      type: Number,
      default: 90,
    },
    dataList: {
      type: Array,
      default: () => [
        // { name: '1', data: 100 },
        // { name: '2', data: 0 }
      ],
    },
  },
  data() {
    return {
      myChart: null,
      seriesItem: {
        name: "",
        type: "pie",
        clockWise: false,
        radius: ["56%", "58%"],
        hoverAnimation: true,
        itemStyle: {
          normal: {
            label: {
              color: "#fff",
            },
            labelLine: {
              length: 15,
              length2: 15,
              show: true,
              color: "#fff",
            },
          },
        },
      },
      seriesNoData: [],
    };
  },
  mounted() {
    let seriesNoData = {
      ...this.seriesItem,
      tooltip: { show: false },
      data: [1],
      itemStyle: {
        normal: {
          shadowBlur: 2,
          shadowColor: "rgba(0,0,0,0.16)",
          borderWidth: this.borderWidth,
        },
      },
    };
    let color = this.colors[0]; //颜色值
    if (typeof color === "string") {
      seriesNoData.itemStyle.normal.borderColor = this.colors[0];
      seriesNoData.itemStyle.normal.color = this.colors[0];
    } else if (Array.isArray(color)) {
      seriesNoData.itemStyle.normal.borderColor = new echarts.graphic.LinearGradient(
        1,
        0,
        0,
        0,
        [
          {
            offset: 0,
            color: color[0],
          },
          {
            offset: 1,
            color: color[1] || color[0],
          },
        ]
      );

      seriesNoData.itemStyle.normal.color = new echarts.graphic.LinearGradient(
        1,
        0,
        0,
        0,
        [
          {
            offset: 0,
            color: color[0],
          },
          {
            offset: 1,
            color: color[1] || color[0],
          },
        ]
      );
    }
    this.seriesNoData = [seriesNoData];
    this.createCharts();
  },
  methods: {
    echartsResize() {
      this.myChart.resize();
    },
    setEcharts() {
      const normal = {
        shadowBlur: 5,
        shadowColor: "rgba(0,0,0,0.16)",
        borderWidth: this.borderWidth,
      };
      let max = 0,
        seriesData = {
          ...this.seriesItem,
          data: [],
        },
        len = this.dataList.length;
      this.dataList.forEach((val) => (max = max + val.value));
      this.dataList.forEach((item, index) => {
        let itemdata = {
          // ...this.seriesItem,
          ...item,
        };

        // // itemdata.data = [a.data];
        let color = this.colors[index]; //颜色值
        itemdata.itemStyle = {};
        itemdata.itemStyle.normal = {
          ...normal,
        };
        if (typeof color === "string") {
          itemdata.itemStyle.normal.borderColor = this.colors[index];
          itemdata.itemStyle.normal.color = this.colors[index];
        } else if (Array.isArray(color)) {
          itemdata.itemStyle.normal.borderColor = new echarts.graphic.LinearGradient(
            1,
            0,
            0,
            0,
            [
              {
                offset: 0,
                color: color[0],
              },
              {
                offset: 1,
                color: color[1] || color[0],
              },
            ]
          );

          itemdata.itemStyle.normal.color = new echarts.graphic.LinearGradient(
            1,
            0,
            0,
            0,
            [
              {
                offset: 0,
                color: color[0],
              },
              {
                offset: 1,
                color: color[1] || color[0],
              },
            ]
          );
        }

        // itemdata.itemStyle.normal=null
        seriesData.data.push(
          {
            ...itemdata,
            label: {
              show: true,
              position: "outside",
              color: "#fff",
              formatter() {
                return (
                  item.name +`:${item.value}`+
                        '\n'+
                  `占比${
                    (item.value / max).toFixed(2).split(".")[1]
                  }%`
                );
              },
            },
          },
          {
            value: this.borderWidth * 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                fontFamily: "DINENGSCHRIFTSTD",
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      });
      const title = {
        text: max,
        ...this.title,
      };

      console.log("seriesData", seriesData);
      //   seriesData.data =   [55,66,77,88,99]
      //   seriesData
      this.myChart.setOption({
        title: title,
        color: this.colors,
        series: max > 0 ? [seriesData] : this.seriesNoData,
      });
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);

      let option = {
        title: {
          text: "",
          textStyle: {
            color: "#fff",
            fontSize: 28,
            lineHeight: 15,
            fontFamily: "DINENGSCHRIFTSTD",
          },
          subtext: "",
          subtextStyle: {
            color: "#ccc",
            fontSize: 14,
            lineHeight: 14,
          },
          // itemGap: 20,
          left: "center",
          top: "23%",
        },
        tooltip: {
          show: true,
        },
        // title: {
        //   text: "交通方式",
        //   top: "48%",
        //   textAlign: "center",
        //   left: "49%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 22,
        //     fontWeight: "400",
        //   },
        // },
        // legend: {
        //   icon: "circle",
        //   orient: "horizontal",
        //   // x: 'left',
        //   data: ["火车", "飞机", "客车", "轮渡"],
        //   right: 340,
        //   bottom: 150,
        //   align: "right",
        //   textStyle: {
        //     color: "#fff",
        //   },
        //   itemGap: 20,
        // },
        series: [
          {
            ...this.seriesItem,
          },
        ],
      };
      this.myChart.setOption(option);
      this.setEcharts();
    },
  },
};
</script>
