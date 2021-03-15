<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">技术状况走势</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
        <!-- <div class="switch-btn ">规模</div> -->
        <!-- <div class="switch-btn switch-active">形式</div> -->
        <cockpit-select
          v-model="type1"
          :optionData="optionData"
          placeholder="时间"
        />
        <cockpit-select
          v-model="type2"
          :optionData="optionData"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type3"
          :optionData="optionData"
          placeholder="形式"
        />
      </div>
    </template>
    <lines
      ref="chartsLines"
      :dataList="dataList"
      :legendData="legendData"
      :xAxisData="xAxisData"
      :colors="colors"
    />
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
// import echarts from "echarts";
import lines from "../charts/line";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
export default {
  components: { moduleWrapper, lines, cockpitSelect },
  computed: {
    // companyList() {
    //   return store.areaList;
    // },
  },
  watch: {
    // companyList: {
    //   handler(val) {
    //     this.demoData();
    //   },
    //   deep: true,
    // },
  },
  data() {
    return {
      type1: "",
      type2: "",
      type3: "",
      optionData: [{ value: "xixihaha" }],
      xAxisData: [2016, 2017, 2018, 2019, 2020],
      colors: [
        ["rgba(84,212,144,1)", "rgba(84,212,144,0.1)"],
        ["rgba(29,121,210,1)", "rgba(29,121,210,0.1)"],
        ["rgba(225,185,20,1)", "rgba(225,185,20,0.1)"],
        ["rgba(187,14,202,1)", "rgba(187,14,202,0.1)"],
        ["rgba(125,11,31,1)", "rgba(125,11,31,0.1)"],
      ],
      legendData: ["1类", "2类", "3类", "4类", "5类"],
      //   dataZoom: {
      //     start: 0,
      //     end: 50,
      //   },
      dataList: [
        //   { smooth: true, data: [] }
      ],
    };
  },
  mounted() {
    this.demoData();
  },
  methods: {
    demoData() {
      //  {  smooth: true, data: [] }

      this.legendData.forEach((val) => {
        let obj = { name: val, smooth: true, data: [] };
        this.xAxisData.forEach((item) => {
          obj.data.push(window.MathRandom(15, 150));
        });
        this.dataList.push(obj);
      });
      this.$nextTick(() => {
        this.$refs.chartsLines.setEcharts();
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
