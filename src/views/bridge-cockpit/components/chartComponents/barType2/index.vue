<template>
  <div
    :ref="refName"
    class="barBox-charts" 
  ></div>
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
    yAxisData: {
      type: Array,
      default: () => ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
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
      default: () => [120, 200, 150, 80, 70, 110, 130],
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
        color: this.colors,
        yAxis: {
          data: this.yAxisData,
        },
        grid: this.grid,
        series: [{ data: this.dataList }],
      };
      console.log(option);
      this.myChart.setOption(option);
    },
    echartsResize() {
      this.myChart.resize();
    },
    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);

      let fontColor = "#485465";
      let option = {
        tooltip: {
          show: true,
          formatter: "{b}:{c}",
        }, 
        animationDurationUpdate:1000,
        grid: {
          left: "5%",
          top: "5%",
          right: "15%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: {
          type: "value",
          show: false,
          position: "top",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5,
            },
            nameTextStyle: {
              color: "#ccc",
            },
            splitLine: {
              //网格线
              show: false,
            },
            inverse: "true", //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            data: [],
          },
        ],
        series: [
          {
            name: "bars",
            type: "bar",
            barWidth:10,
             showBackground:true,
            backgroundStyle:{
                barBorderRadius: 5
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: "{c}",
                textStyle: {
                  color: "white", //color of value
                },
                fontFamily:'DINEngschriftStd',
                fontSize:14
              },
            },
            itemStyle: {
              normal: {
                show: true,
                barBorderRadius: 30,
                borderWidth: 0,
                borderColor: "#333",
              },
            }, 
            data: this.dataList,
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>
