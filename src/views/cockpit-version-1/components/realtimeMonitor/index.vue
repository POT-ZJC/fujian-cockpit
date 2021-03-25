<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">实时监(检)测信息</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
        <cockpit-select
          v-model="type1"
          :optionData="optionData1"
          placeholder="类型"
        />
        <cockpit-select
          v-model="type2"
          :optionData="optionData2"
          placeholder="时间"
        />
      </div>
    </template>
    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="5">桥名</el-col>
          <el-col class="td" :span="4">构件</el-col>
          <el-col class="td" :span="5">内容</el-col>
          <el-col class="td" :span="4">预警</el-col>

          <el-col class="td" :span="6">时间</el-col>
          <!-- <el-col class="td" :span="3">5类</el-col> -->
        </el-row>

        <el-row
          class="tr"
          v-for="(item, index) in tableData"
          :key="index"
          :title="handleShowRow(item)"
        >
          <el-col class="td" :span="5">{{ item["桥梁名称"] }}</el-col>
          <el-col class="td" :span="4">{{ item["构件"] }}</el-col>
          <el-col class="td" :span="5">{{ item["内容"] }}</el-col>
          <el-col
            class="td "
            :span="4"
            :style="
              `color:${
                item['预警等级'] === '黄色'
                  ? 'yellow'
                  : item['预警等级'] === '红色'
                  ? 'red'
                  : 'white'
              }`
            "
            >{{ item["预警等级"] }}</el-col
          >
          <el-col class="td tc" :span="6">{{ item["时间"] }}</el-col>
          <!-- <el-col class="td" :span="3">{{ item.fiveLevel || "-" }}</el-col> -->
        </el-row>
      </el-scrollbar>
    </div>
  </moduleWrapper>
  <!-- <div class="cockpit-module">
    <div class="module-head">
      <div class="module-title">技术状况统计</div>
      <div class="module-btn-wrapper">
        <div class="">
          <el-select v-model="value" placeholder="规模">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="">形式</div>
      </div>
    </div>
  </div> -->
</template>
<script>
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper"; //bridgeLevelCondition
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
import { demoData } from "./demoData.js";
export default {
  components: { moduleWrapper, cockpitSelect },
  computed: {
    pageLevelValue(val) {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    pageLevelValue(val) {
      this.type1 = "";
      this.type2 = "";
      this.handleDemoData();
    },
  },
  data() {
    return {
      type1: "",
      type2: "",
      optionData1: [{ value: "检测" }, { value: "监测" }],
      optionData2: [{ value: "今日" }, { value: "近7日" }, { value: "近1月" }],
      tableData: [],
    };
  },
  mounted() {
    this.handleDemoData();
  },
  methods: {
    handleShowRow(data) {
      let str = "";
      const arr = ["桥梁名称", "构件", "内容", "预警等级", "时间"];
      arr.forEach((val, index) => {
        str += index === 0 ? data[val] : "   " + data[val];
      }); 
      return str;
    },
    handleDemoData() {
      let dataSource = [];
      try {
        dataSource = demoData[this.pageLevelValue || "福建省"] || [];
      } catch (err) {}
      this.tableData = dataSource;
    },
  },
};
</script>

<style lang="scss" scoped></style>
