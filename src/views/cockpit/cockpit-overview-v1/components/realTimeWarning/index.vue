<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">实时预警信息</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
        <cockpit-select
          v-model="type1"
          @change="handleType1Data"
          :optionData="optionData1"
          placeholder="时间"
        />
      </div>
    </template>
    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="5">设施名称 </el-col>
          <el-col class="td tc" :span="5">位置 </el-col>
          <el-col class="td tc" :span="5">内容 </el-col>
          <el-col class="td tc" :span="4">预警等级 </el-col>
          <el-col class="td tc" :span="4">时间 </el-col>
        </el-row>
        <el-row
          class="table-tr"
          v-for="(item, index) in tableData"
          :key="index"
          :class="{ 'table-stripe': index & 1 }"
        >
          <el-col class="td" :span="5" style="color:#3a8ff6">{{
            item["设施名称"]
          }}</el-col>
          <el-col class="td tc" :span="5">{{ item["位置"] }}</el-col>
          <el-col class="td tc" :span="5">{{ item["内容"] }}</el-col>
          <el-col
            class="td tc"
            :span="4"
            :class="{
              黄色: item['预警等级'] === '黄色',
              红色: item['预警等级'] === '红色',
            }"
            >{{ item["预警等级"] }}</el-col
          >
          <el-col class="td tc td-number" :span="4">{{ item["时间"] }}</el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit/cockpit-overview-v1/ui/module-wrapper"; //bridgeLevelCondition
// import { mutationsSet, store } from "@/views/cockpit/cockpit-overview-v1/bridgeStore";
import cockpitSelect from "@/views/cockpit/cockpit-overview-v1/ui/select";
import { demoData1 } from "./实时预警信息json.js";
export default {
  components: { moduleWrapper, cockpitSelect },
  data() {
    return {
      type1: "",
      optionData1: [
        { value: "今日" },
        { value: "近三日" },
        { value: "近一周" },
        { value: "近一月" },
        { value: "近一年" },
      ],

      tableData: [],
      tableSort: {
        type: true, //类型
        number: true, //数量
        part: true, //部件
        warning: true, //预警
        condition: true, //状况
      },
    };
  },
  mounted() {
    this.handleDemoData();
  },
  methods: {
    handleType1Data(data) {},

    randomDemoData() {
      //   const total=

      this.companyList.forEach((val, index) => {
        this.tableData.push({
          name: val.company,
          key1: window.MathRandom(index + 1, (index + 1) * 2),
          key2: window.MathRandom(index + 5, (index + 1) * 5),
          key3: window.MathRandom(index + 1, (index + 1) * 5),
          key4: window.MathRandom(index + 1, (index + 1) * 5),
          key5: window.MathRandom(index > 5 ? 2 : 1, index < 5 ? index + 1 : 5),
        });
      });
    },
    handleDemoData(levelValue) {
      let dataSource = [];

      try {
        dataSource = demoData1[levelValue || "福建省"] || [];
      } catch (err) {
        console.log(err);
      }
      this.tableData = dataSource;
    },
  },
};
</script>

<style lang="scss" scoped>
.td-number {
  font-size: torem(18px) !important;
  font-weight: normal !important;
}
.红色 {
  color: #ed6c61;
  background: initial !important;
  -webkit-background-clip: initial !important;//inherit 
  background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  text-fill-color: initial !important;
}
.黄色 {
  color: #f5b859;
  background: initial !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  text-fill-color: initial !important;
}
</style>
