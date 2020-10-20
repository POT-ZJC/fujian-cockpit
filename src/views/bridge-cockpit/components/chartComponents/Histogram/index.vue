<template>
  <div :ref="refName" class="histogram-charts"></div>
</template>

<script>
export default {
  name: "Histogram",
  props: {
    refName: {
      type: String,
      default: ""
    },
    // 是否显示y轴文字
    axisLabelShow: {
      type: Boolean,
      default: true
    },
    //显示分类
    showLegend: {
      type: Boolean,
      default: true
    },
    //节点数据持续显示
    nodeNormalLabelShow: {
      type: Boolean,
      default: false
    },
    //是否从折线到x轴覆盖颜色
    isAreaColorCover: {
      type: Boolean,
      default: false
    },
    // 数据
    dataList: {
      type: Array,
      default: () => []
    },
    //x轴数据
    xAxisData: {
      type: Array,
      default: () => []
    },
    //y轴数据
    yAxisData: {
      type: Array,
      default: () => []
    },
    //分类配置
    legendConfig: {
      type: Object,
      default: () => null
    },
    //图表margin-bottom
    gridMarginBottom: {
      type: String,
      default: "3%"
    },
    //图表margin-top
    gridMarginTop: {
      type: String,
      default: "5%"
    },
    barWidth: {
      type: String,
      default: "10%"
    },
    isAutoSlide: {
      //是否自动滑动
      type: Boolean,
      default: false
    },
    // 自动滑动的Length
    autoSlideLength: {
      type: Number,
      default: 5
    },
    fontRotate: {
      type: Number,
      default: 0
    },
    symbolSize: {
      type: Number,
      default: null
    },
    // 是否展示y轴分割线
    showYSplitLine: {
      type: Boolean,
      default: true
    },
    // bar圆角效果
    barBorderRadius: {
      type: Array,
      default: () => [8, 8, 0, 0]
    },
    barGap: {
      // 不同系列的柱子之间的距离-100%为重合 ，默认30%
      type: String,
      default: "30%"
    },
    labelTextPosition: {
      // labelPosition 文字显示位置
      type: String,
      default: ""
    },
    tipFormatter: {
      type: Function,
      default: itemArr => {
        return itemArr[0].name + "<br/>" + itemArr[0].value;
      }
    },
    unitTop: {
      //单位是否放在上方
      type: String,
      default: ""
    },
    //跳转路径
    jumpUrl: {
      type: String,
      default: ""
    },
    //折线光滑
    needSmooth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myChart: null,
      legendList: [],
      customInterval: null // 定时任务
    };
  },
  computed: {
    assemblyData() {
      let lists = [];
      this.dataList.map((item, index) => {
        let name = this.dataList[index].name;
        lists.push({
          name: name,
          type: item.type || "bar",
          symbol: item.symbol || "circle",
          barWidth: this.barWidth,
          stack: this.dataList[index].stack || "",
          data: item.dataArr,
          barGap: this.barGap,
          symbolSize: this.symbolSize,
          smooth: this.needSmooth
        });
        this.showLegend ? (name ? this.legendList.push(name) : "") : "";
      });
      return lists;
    }
  },
  mounted() {
    console.log(this.dataList);
    this.$nextTick(() => {
      this.createCharts(this.dataList);
    });
  },

  methods: {
    createCharts: function(dataList) {
      const _this = this;
      this.myChart = this.$echarts.init(this.$refs[this.refName]);
      this.option = {
        color: ["#3398DB"],
        legend: {
          show: this.showLegend,
          data: this.legendList,
          // top: this.legendMarginTop,
          // bottom: 10,
          // left: "70px",
          // y: "bottom",
          textStyle: {
            fontSize: 12,
            color: "#ccc",
            top: 10
          }
          // itemWidth: 20,
          // itemHeight: 10,
          // itemGap: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: this.tipFormatter
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: this.gridMarginBottom,
          top: this.gridMarginTop,
          containLabel: true
        },
        xAxis: [
          {
            type: this.yAxisData.length > 0 ? "value" : "category",
            data: this.xAxisData,
            axisLabel: {
              show: true,
              rotate: this.fontRotate,
              color: "#94a9c9"
            },
            axisTick: {
              alignWithLabel: true,
              //隐藏刻度线
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: this.yAxisData.length > 0 ? "category" : "value",
            data: this.yAxisData,
            name: this.unitTop,
            nameTextStyle: {
              color: "#94a9c9"
            },
            axisLabel: {
              show: this.axisLabelShow,
              formatter: "{value}",
              color: "#94a9c9"
            },
            axisTick: {
              //隐藏刻度线
              show: false
            },
            //坐标线
            axisLine: {
              show: false
            },
            splitLine: {
              //隐藏分割线
              show: this.showYSplitLine,
              lineStyle: {
                color: "#5965a2"
              }
            }
          }
        ],
        series: _this.assemblyData.map((item, index) => {
          let obj = Object.assign({}, item, {
            itemStyle: {
              normal: {
                label: {
                  show: this.nodeNormalLabelShow,
                  position: this.labelTextPosition || "",
                  color: "#2a3c57",
                  lineStyle: {
                    color: dataList[index].color //折线颜色
                  }
                },
                color: dataList[index].color || "#77adff",
                //柱形图圆角，初始化效果
                barBorderRadius: this.barBorderRadius
              }
            },
            emphasis: {
              itemStyle: {
                //   "#2d70e3"
                color: dataList[index].color,
                opacity: 1.5
              }
            }
          });

          if (item.type == "line" && this.isAreaColorCover) {
            obj.areaStyle = {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "#fff" // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: dataList[index].color
                      ? dataList[index].color
                      : "#f8a06e" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              opacity: 0.3
            };
          }
          return obj;
        })
      };

      if (this.showLegend && this.legendConfig) {
        this.option.legend = Object.assign(option.legend, this.legendConfig);
      }
      if (this.isAutoSlide) {
        this.option.dataZoom = [
          {
            type: "slider",
            show: false,
            startValue: 0,
            endValue: this.autoSlideLength
          }
        ];
        this.customInterval = setInterval(() => {
          // 每次向后滚动一个，最后一个从头开始。
          if (
            this.option.dataZoom[0].endValue ==
            this.dataList[0].dataArr.length - 1
          ) {
            this.option.dataZoom[0].endValue = this.autoSlideLength;
            this.option.dataZoom[0].startValue = 0;
          } else {
            this.option.dataZoom[0].endValue += 1;
            this.option.dataZoom[0].startValue += 1;
          }
          this.myChart.setOption(this.option);
        }, 3500);
      }
      this.myChart.setOption(this.option);
      this.myChart.on("click", item => {
        console.log(item);
        if (this.jumpUrl) {
          this.$router.push({ name: this.jumpUrl });
        }
      });
    }
  },
  watch: {
    dataList: function(data) {
      this.createCharts(data);
    }
  },
  beforeDestroy() {
    clearInterval(this.customInterval);
  }
};
</script>

<style lang="less" scoped>
.histogram-charts {
  width: inherit;
  height: inherit;
}
</style>