<template>
  <div>
    <div :ref="refName" class="BarFrame-charts"></div>
  </div>
</template>
<script>
export default {
  name: "BarFrame",
  props: {
    refName: {
      type: String,
      default: ""
    },
    chartsName: {
      type: String,
      default: ""
    },
    colors: {
      type: Array,
      default: ["#fff", "#000"]
    }
  },
  mounted() {
    this.createCharts();
  },
  methods: {
    createCharts: function() {
      const _this = this;
      this.myChart = this.$echarts.init(this.$refs[this.refName]);

      var data = [70, 34, 60, 78, 69];
      // var titlename = ['太原市民政局', '太原市运输局', '太原市残联', '太原市报社', '太原市司法局'];
      var valdata = [683, 234, 234, 523, 345];
      //   var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
      var myColor = this.colors;

      let option = {
        // backgroundColor: '#0e2147',
        xAxis: {
          show: false
        },






















        yAxis: [
          {
            show: true,
            data: ["单位1", "单位2", "单位3", "单位4", "单位5"],
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#000",
              formatter: function(value, index) {
                return [
                  "{lg|" + (index + 1) + "}" + "{title|" + value + "} "
                ].join("\n");
              },
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 5,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#000"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: data,
            barWidth: 16,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            barWidth: 24,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "rgba(80, 238, 177, 0.664)",
                borderWidth: 3,
                barBorderRadius: 15
              }
            }
          }
        ],




// xAxis
// yAxis

                  // dataZoom: [//滑动条
                  //          { 
                  //              yAxisIndex: 0,//这里是从X轴的0刻度开始
                  //              show:false,//是否显示滑动条，不影响使用
                  //              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                  //              startValue: 0, // 从头开始。
                  //              endValue: 2  // 一次性展示10个。
                  //          }
                  // ]














      };
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.BarFrame-charts {
  width: 6rem;
  height: 3rem;
}
</style>