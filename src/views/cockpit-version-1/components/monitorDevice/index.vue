<template>
  <div style="width:100%;height:100%">
    <!-- <moduleTitle title="监测设备" /> -->
    <!-- 监测设备总数 -->
    <div class="monitorDevice-total">
      <div class="name" @click="openCharts">监测设备总数</div>
      <div class="value">{{ total }}</div>
    </div>
    <div class="charts" v-show="isShow">
      <bar
        ref="echartsBar"
        :colors="colors"
        :dataList="dataList"
        :yAxis="yAxis"
        :grid="grid"
        :moreYAxis="moreYAxis"
      />
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import bar from "@/views/cockpit-version-1/components/charts/barType2";
export default {
  components: {
    bar,
  },
  props: {
    // params: {
    //     type: Object,
    //     default: () => {}
    // },
    // fontSize: {
    //     type: Number,
    //     default: 14
    // }
  },
  watch: {
    // fontSize: {
    //     handler(val) {
    //         this.$nextTick(() => {
    //             this.$refs.echartsBar.echartsResize()
    //         })
    //     },
    //     immediate: true
    // },
    // id(val) {
    //     this.$nextTick(() => {
    //         this.setEcharts()
    //     })
    // }
  },
  data() {
    return {
      isShow: false,
      grid: { containLabel: false, right: "5%" },
      dataTotal: 0,
      total: 1132,
      colors: ["#00A6E3", "#87680C"],
      yAxis: {
        position: "right",
        axisLabel: {
          verticalAlign: "bottom",
        //   show:false,
          align: "right",
          padding: [0, 0, 12, 12],
          textStyle: {
            color: "#FFFFFF",
            fontSize: "12",
          },
        },
        data: [
          "环境荷载",
          "结构整体响应",
          "结构局部响应",
          "车辆荷载监测",
          "视频监测",
        ],
      },
      moreYAxis: [],
      colorItemArr: [
        ["#3E1BFE", "#76DDFB"],
        ["#AE53E2", "#FBB676"],
        ["#88E253", "#9176FB"],
        ["#538FE2", "#FB7676"],
        ["#DE1BFE", "#76CBFB"],
      ],
      dataList: [],
    };
  },
  mounted() {
    // this.$forceUpdate()
    this.setEcharts();
  },
  methods: {
    openCharts() {
      if (this.isShow) {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.$nextTick(() => {
          this.$refs.echartsBar.echartsResize();
        });
      }
    },
    setEcharts() {
      const moreYAxisdata = {
        splitLine: "none",
        axisTick: "none",
        position: "right",
        axisLine: "none",
        data: [],
        inverse: true,
        axisLabel: {
          show: false,
          verticalAlign: "bottom",
          align: "right",
          padding: [0, 10, 12, 0],
          textStyle: {
            color: "#fff",
            fontSize: "14",
          },
          formatter: function(value) {
            return value; //+ 'W'
          },
          // rich: {
          // y: {
          //     color: '#befbff',
          //     fontSize: 16
          // },
          // x: {
          //     color: '#f6cf42',
          //     fontSize: 16
          // }
          // }
        },
      };
      let demoData = [];
      let total = this.total;
      this.yAxis.data.forEach(() => {
        const value = window.MathRandom(5, total);
        total = total - value;
        demoData.push(value);
      });

      demoData.sort((a, b) => {
        return b - a;
      });

      this.dataList = this.yAxis.data.map((aItem, index) => {
        moreYAxisdata.data.push(demoData[index]);

        return {
          name: aItem,
          value: demoData[index],
          barCategoryGap: 15,
          label: {
            normal: {
              formatter: "{c}个",
            },
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: this.colorItemArr[index][0] },
              { offset: 1, color: this.colorItemArr[index][1] },
            ]),
          },
        };
      });
      this.moreYAxis.push(moreYAxisdata);
      this.$nextTick(() => {
        this.$refs.echartsBar.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
//监测设备总数
.monitorDevice-total {
  //   position: absolute;
  //   top: 15px;
  //   right: 15px;
  justify-content: flex-end;
  font-size: torem(20px);
  font-weight: bold;
  display: flex;
  // align-items: center;
  height: torem(30px);
  line-height: torem(29px);
  .name {
    color: #fff;
    cursor: pointer;
  }
  .value {
    font-size: 22px;
    color: #eac922;
  }
}
.charts {
  margin-top: torem(10px);
  width: 100%;
  height: torem(300px);
}
</style>
