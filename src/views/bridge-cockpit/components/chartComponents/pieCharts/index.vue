<template>
  <div :ref="refName" class="pie-charts"></div>
</template>

<script>
export default {
  name: "PieCharts",
  components: {},
  props: {
    refName: {
      type: String,
      default: ""
    },

    chartsName: {
      type: String,
      default: ""
    },
    showLegend: {
      // 显示分类
      type: Boolean,
      default: true
    },
    legendUnit: {
      // 分类单位
      type: String,
      default: ""
    },
    showLabel: {
      // 显示每项文字
      type: Boolean,
      default: true
    },
    legendConfig: {
      type: Object,
      default: () => {
        return null;
      }
    },
    isRing: {
      // 是否为圆环
      type: Boolean,
      default: false
    },
    showLabelLine: {
      // 是否展示胡须
      type: Boolean,
      default: true
    },
    dataList: {
      type: Array,
      default: () => []
    },
    ringRadius: {
      type: Array,
      default: () => ["32%", "45%"]
    },
    centers: {
      type: Array,
      default: () => ["50%", "30%"]
    },
    // 圆环中间的字
    centerText: {
      type: String,
      default: ""
    },
    // 胡须1
    labelLineLength1: {
      type: Number,
      default: 30
    },
    // 文字显示配置项
    labelFormatter: {
      type: Function,
      default: function(val) {
        return val.name;
      }
    },
    justShowLegendName: {
      // 进显示分类名
      type: Boolean,
      default: false
    },
    isMain: {
      type: Boolean,
      default: false
    },
    centerTextTop: {
      type: String,
      default: "27%"
    },
    //是否需要回调
    needCallback: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { myChart: null };
  },
  computed: {},
  mounted() {
    console.log(this.chartsName);
    this.$nextTick(() => {
      this.dataList.length > 0 ? this.createPieCharts(this.dataList) : "";
    });
  },
  methods: {
    createPieCharts: function(dataList) {
      const _this = this;
      this.myChart = this.$echarts.init(this.$refs[this.refName]);
      let option = {
        tooltip: {
          trigger: "item",
          formatter:
            "" +
            (this.chartsName ? "{a} <br/>" : "") +
            "{b}: {c}" +
            this.legendUnit +
            " ({d}%)"
        },
        legend:
          //  this.legendConfig,
          {
            show: this.showLegend,
            orient: "vertical", //horizontal
            // x: "left",
            formatter: function(name) {
              const item = dataList.filter(item => item.name == name);
              return (
                name +
                (_this.justShowLegendName
                  ? ""
                  : " " + item[0].value + _this.legendUnit)
              );
            },
            textStyle: {
              fontSize: 12,
              color: this.isMain ? "#ccc" : "",
              top: 10
              // padding: [0, 50],
            }
          },
        series: [
          {
            name: this.chartsName || "",
            type: "pie",
            radius: this.ringRadius,
            center: this.centers,

            label: {
              normal: {
                show: this.showLabel,
                position: "outside",
                color: this.isMain ? "#ccc" : "#2a3c57",
                formatter: this.labelFormatter
              },
              emphasis: {
                show: true,
                textStyle: {
                  // fontSize: "30",
                  // fontWeight: "bold",
                  color: "#2a3c57"
                }
              }
            },
            labelLine: {
              normal: {
                show: this.showLabelLine,
                lineStyle: {
                  color: "#94a9c9"
                },
                smooth: 0.2, //平滑度
                length: this.labelLineLength1,
                length2: 0
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = [
                    "#afa3f5",
                    "#00d488",
                    "#3feed4",
                    "#3bafff",
                    "#f1bb4c",
                    "rgba(250,250,250,0.5)"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: dataList
          }
        ]
      };
      // 有centerText 就显示在中间
      if (this.isRing && this.centerText) {
        option.graphic = {
          elements: [
            {
              type: "text",
              left: "center",
              top: this.centerTextTop,
              style: {
                text: this.centerText.replace("\\n", "\n"),
                fontSize: "17",
                lineHeight: "30",
                textAlign: "center"
              }
            }
          ]
        };
      }

      if (this.showLegend && this.legendConfig) {
        option.legend = Object.assign(option.legend, this.legendConfig);
      }
      this.myChart.setOption(option);
      this.myChart.on("click", item => {
        if (this.needCallback) {
          this.$emit("callback", item);
        }
      });
    }
  },
  watch: {
    dataList: function(data) {
      this.createPieCharts(data);
    }
  }
};
</script>

<style lang="less" scoped>
.pie-charts {
  width: inherit;
  height: inherit;
}
</style>