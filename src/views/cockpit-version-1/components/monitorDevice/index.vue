<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">在线监测设备</div>
    </template>

    <!-- <moduleTitle title="监测设备" /> -->
    <!-- 监测设备总数 -->

    <template slot="head-right">
      <div class="switch-box">
        <!-- <div class="switch-btn ">规模</div>
        <div class="switch-btn switch-active">形式</div> -->
        <cockpit-select
          v-model="type1"
          :optionData="optionData"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type2"
          :optionData="optionData"
          placeholder="形式"
        />
      </div>
    </template>

    <!-- <div class="monitorDevice-total">
      <div class="name" @click="openCharts">监测设备总数</div>
      <div class="value">{{ total }}</div>
    </div> -->

    <bar
      ref="echartsBar"
      style="width:100%;height:100%"
      :colors="colors"
      :dataList="dataList"
      :yAxis="yAxis"
      :grid="grid"
      :moreYAxis="moreYAxis"
    />
  </moduleWrapper>
</template>
<script>
import echarts from "echarts";
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import bar from "@/views/cockpit-version-1/components/charts/barType2";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
export default {
  components: { moduleWrapper, bar, cockpitSelect },
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
      type1: "",
      type2: "",
      type3: "",
      optionData: [{ value: "xixihaha" }],
      isShow: false,
      grid: { containLabel: false, right: "5%" },
      dataTotal: 0,
      total: 895,
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
        ["#f4af54", "#f4af54"],
        ["#5fd0d3", "#5fd0d3"],
        ["#f1918c", "#f1918c"],
        ["#3f99f6", "#3f99f6"],
        ["#2c7ff1", "#2c7ff1"],
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
      const arr = [233, 208, 179, 153, 122];
      let total = this.total;
      this.yAxis.data.forEach((val, index) => {
        // const value = window.MathRandom(5*index, total);
        // total = total - value;
        demoData.push(arr[index]);
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
        this.$refs.echartsBar.echartsResize(); 
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
// .charts {
//   margin-top: torem(10px);
//   width: 100%;
//   height: torem(300px);
// }
</style>
