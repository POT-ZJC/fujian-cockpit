<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">养护绩效TOP</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <div class="switch-btn ">规模</div>
        <div class="switch-btn switch-active">形式</div>
      </div>
      <div class="switch-box">
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
    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="4">统计范围</el-col>
          <el-col class="td" :span="4">病害类型</el-col>
          <el-col class="td" :span="4">病害数量</el-col>
          <el-col class="td" :span="4">病害部件</el-col>
          <el-col class="td" :span="4">预警次数</el-col>
          <el-col class="td" :span="4">技术状况等级</el-col>
        </el-row>
        <el-row class="tr" v-for="(item, index) in showDemoData" :key="index">
          <el-col class="td" :span="4"   style='color:#3a8ff6'>{{ item.name }}</el-col>
          <el-col class="td" :span="4">{{ item.key1 || "-" }}</el-col>
          <el-col class="td" :span="4">{{ item.key2 || "-" }}</el-col>
          <el-col class="td" :span="4">{{ item.key3 || "-" }}</el-col>
          <el-col class="td" :span="4">{{ item.key4 || "-" }}</el-col>
          <el-col class="td" :span="4">{{ item.key5 || "-" }}</el-col>
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
export default {
  components: { moduleWrapper, cockpitSelect },
  computed: {
    companyList() {
      return store.areaList;
    },
  },

  watch: {
    companyList: {
      handler(val) {
        this.demoData();
      },
      deep: true,
    },
  },
  data() {
    return {
      type1: "",
      type2: "",
      type3: "",
      optionData: [{ value: "xixihaha" }],
      showDemoData: [],
    };
  },
  mounted() {},
  methods: {
    demoData() {
      //   const total=

      this.companyList.forEach((val, index) => {
        this.showDemoData.push({
          name: val.company,
          key1: window.MathRandom(index + 1, (index + 1) * 2),
          key2: window.MathRandom(index + 5, (index + 1) * 5),
          key3: window.MathRandom(index + 1, (index + 1) * 5),
          key4: window.MathRandom(index + 1, (index + 1) * 5),
          key5: window.MathRandom(index > 5 ? 2 : 1, index < 5 ? index + 1 : 5),
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
