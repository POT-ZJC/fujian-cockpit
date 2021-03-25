<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">养护绩效TOP</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <div
          v-if="
            currentAreaLevelType === 'maintenanceStation' ||
              currentAreaLevelType === 'sectionName'
          "
        ></div>
        <div
          class="switch-btn "
          @click="handleSwitchType('范围')"
          :class="{ 'switch-active': switchType === '范围' }"
          v-else
        >
          范围
        </div>
        <div
          class="switch-btn "
          @click="handleSwitchType('桥梁')"
          :class="{ 'switch-active': switchType === '桥梁' }"
        >
          桥梁
        </div>
      </div>
      <div class="select-box">
        <cockpit-select
          v-model="type1"
          @change="handleType1Data"
          :optionData="optionData1"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type2"
          @change="handleType2Data"
          :optionData="optionData2"
          placeholder="形式"
        />
      </div>
    </template>
    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="4">{{ switchType }} </el-col>
          <el-col class="td tc" :span="4"
            >病害类型
            <span class="sort-arrow" @click="tableSort.type=!tableSort.type">{{
              tableSort.type ? "↑" : "↓"
            }}</span></el-col
          >
          <el-col class="td tc" :span="4"
            >病害数量
            <span class="sort-arrow" @click="tableSort.number=!tableSort.number">{{
              tableSort.number ? "↑" : "↓"
            }}</span></el-col
          >
          <el-col class="td tc" :span="4"
            >病害部件
            <span class="sort-arrow" @click="tableSort.part=!tableSort.part">{{
              tableSort.part ? "↑" : "↓"
            }}</span></el-col
          >
          <el-col class="td tc" :span="4"
            >预警次数
            <span class="sort-arrow" @click="tableSort.warning=!tableSort.warning">{{
              tableSort.warning ? "↑" : "↓"
            }}</span></el-col
          >
          <el-col class="td tc" :span="4"
            >{{ switchType === "范围" ? "危桥数量" : "技术状况"
            }}<span class="sort-arrow" @click="tableSort.condition=!tableSort.condition">{{
              tableSort.condition ? "↑" : "↓"
            }}</span>
          </el-col>
        </el-row>
        <el-row class="tr" v-for="(item, index) in tableData" :key="index">
          <el-col class="td" :span="4" style="color:#3a8ff6">{{
            item["统计范围"]
          }}</el-col>
          <el-col class="td tc" :span="4">{{ item["病害类型"] || "-" }}</el-col>
          <el-col class="td tc" :span="4">{{ item["病害数量"] || "-" }}</el-col>
          <el-col class="td tc" :span="4">{{ item["病害部件"] || "-" }}</el-col>
          <el-col class="td tc" :span="4">{{ item["预警次数"] || "-" }}</el-col>
          <el-col class="td tc" :span="4">{{
            item[switchType === "范围" ? "危桥数量" : "技术状况等级"] || "-"
          }}</el-col>
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
import { demoData1, demoData2 } from "./养护绩效TOP.js";
export default {
  components: { moduleWrapper, cockpitSelect },
  computed: {
    pageLevelValue(val) {
      return store.currentAreaLevelValue;
    },
    currentAreaLevelType() {
      return store.currentAreaLevelType;
    },
  },
  watch: {
    pageLevelValue(val) {
      this.type1 = "";
      this.type2 = "";
      if (
        this.currentAreaLevelType === "maintenanceStation" ||
        this.currentAreaLevelType === "sectionName"
      ) {
        this.switchType = "桥梁";
        this.handleDemoData("桥梁");
      } else {
        this.switchType = "范围";
        this.handleDemoData("范围");
      }
    },
  },
  data() {
    return {
      type1: "",
      type2: "",
      switchType: "范围",
      optionData1: [
        { value: "特大桥" },
        { value: "大桥" },
        { value: "中桥" },
        { value: "小桥" },
      ],
      optionData2: [
        { value: "梁桥" },
        { value: "拱桥" },
        { value: "悬索桥" },
        { value: "刚构桥" },
        { value: "组合桥" },
      ],
      tableData: [],
      tableSort: {
        type: true,//类型
        number: true,//数量
        part: true,//部件
        warning: true,//预警
        condition: true,//状况
      },
    };
  },
  mounted() {
    this.handleDemoData(this.switchType);
  },
  methods: {
    handleType1Data(data) {
      let type = data.value || "";
      this.type2 = "";
      this.handleDemoData(this.switchType, type);
    },
    handleType2Data(data) {
      let type = data.value || "";
      this.type1 = "";
      this.handleDemoData(this.switchType, type);
    },
    handleSwitchType(type) {
      this.switchType = type;
      this.handleDemoData(type, this.type1 || this.type2);
    },
    demoData() {
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
    handleDemoData(source, type) {
      let dataSource = [];

      try {
        if (source === "范围") {
          dataSource =
            demoData1[this.pageLevelValue || "福建省"][type || "全部"] || [];
        } else if (source === "桥梁") {
          dataSource =
            demoData2[this.pageLevelValue || "福建省"][type || "全部"] || [];
        }
      } catch (err) {
        console.log(err);
      }
      this.tableData = dataSource;
    },
  },
};
</script>

<style lang="scss" scoped></style>
