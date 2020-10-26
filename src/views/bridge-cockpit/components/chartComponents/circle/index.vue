<template>
  <div :ref="refName"></div>
  <!-- <div :ref="refName" style="width:100%;height:100%" ></div> -->
  <!-- <div :ref="refName" :style="`height:${height}px;width:${width}px`"></div> -->
</template>

<script>
import echarts from "echarts";
export default {
  name: "circle-echarts",
  components: {},
  props: {
    // center: ["72%", "48%"]
    showLabel:{
      type:Boolean,
      default:false
    },
    center: {
      type: Array,
      default() {
        return ["72%", "48%"];
      },
    },
    title: {
      type: Object,
      default() {
        return {
          text: "valueTotal" + "",
          subtext: "共计",
        };
      },
    },
    refName: {
      type: String,
      default: "",
    },
    moduleName: {
      type: String,
      default: "pie",
    },
    legendData: {
      type: Array,
      default() {
        return [];
      },
    },
    colors: {
      type: Array,
      default: () => ["#00388C", "#086CD8", "#39A3FE", "#7ECAFE", "#A4DCFF"],
    },
    dataList: {
      type: Array,
      default: () => [
        { value: 335, name: "数据-1" },
        { value: 310, name: "数据-3" },
        { value: 274, name: "数据-5" },
        { value: 235, name: "数据-2" },
        { value: 400, name: "数据-4" },
      ],
    },
  },
  data() {
    return {
      myChart: null,
      highlighttName: "",
    };
  },
  computed: {},
  mounted() {
    this.createCharts();
  },
  methods: {
    echartsResize() {
      this.myChart.resize();
    },
    setEcharts() {
      const option = {
        colors: this.colors,
        title: this.title,
        series: [
          { data: this.dataList, center: this.center },
          { data: this.legendData },
        ],
      };
      this.myChart.setOption(option);
    },

    createCharts() {
      this.myChart = echarts.init(this.$refs[this.refName]);
      let option = {
        // backgroundColor: '#2c343c',
        title: {
          text: "",
          left: "71%",
          top: "39%",
          subtext: "",
          // x: 'center',
          // y: 'center',
          textAlign: "center",
          textStyle: {
            fontSize: 28,
            fontWeight: "bold",
            color: ["#fff"],
            textAlign: "center",
          },
          subtextStyle: {
            color: "#828282",
            fontSize: 14,
            textAlign: "center",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: this.colors,
        grid: {
          show: false,
          borderColor: "#000",
          z: 2,
          top: 0,
          right: 0,
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "value",
            show: false,
            position: "top",
            min: 0,
            max: 200,
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            position: "left",
            show: false,
            max: 400,
          },
        ],
        // legend: {
        //     orient: 'vertical',
        //     right: '40',
        //     top: '35',
        //     // data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        //     data: this.legendData
        // },
        series: [
          {
            name: this.moduleName,
            type: "pie",
            radius: ["52%", "62%"],
            center: this.center,
            data: this.dataList.sort(function(a, b) {
              return a.value - b.value;
            }),

            label: {
              show: this.showLabel,
              color: "rgba(255, 255, 255, 0.3)",
              position: "outside",
              formatter: '{b}: {c}'
            },
            itemStyle: {
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            animationType: "scale", //'expansion' 默认沿圆弧展开的效果。'scale' 缩放效果
            animationEasing: "elasticOut", //初始动画的缓动效果
            animationDelay: function(idx) {
              //初始动画的延迟，支持回调函数
              return Math.random() * 200;
            },
          },
          {
            type: "scatter",
            symbol: "rect",
            symbolSize: [10, 10],
            tooltip: { show: false },
            // silent: true, //是否不响应和触发鼠标事件
            data: this.legendData,
          },
        ],
      };

      this.myChart.setOption(option);

      //给点位添加鼠标移入事件
      this.myChart.on("mouseover", { seriesIndex: 1 }, (params) => {
        this.highlightArea(params);
      });
    },
    //高亮图形区域
    highlightArea(params) {
      // console.log(params);
      //如果高亮的区域名不同，才高亮 -否则不做处理
      if (params.name !== this.highlighttName) {
        //如果存在上次高亮的区域就取消
        if (this.highlighttName) {
          this.myChart.dispatchAction({
            type: "downplay", //
            seriesIndex: 0,
            name: this.highlighttName,
          });
        }

        this.myChart.dispatchAction({
          type: "highlight", //
          seriesIndex: 0,
          name: params.name,
        });
        //更新当前高亮的区域名
        this.highlighttName = params.name;
      }
    },
  },
};
</script>
