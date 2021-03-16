<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">桥梁技术状况</div>
    </template>
    <template slot="head-right">
      <div class="switch-box">
        <!-- <div class="switch-btn ">规模</div>
        <div class="switch-btn switch-active">形式</div> -->
        <cockpit-select
          v-model="type1"
          :optionData="optionData1"
          @change="(data) => handleData(data, '1')"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type2"
          :optionData="optionData2"
          @change="(data) => handleData(data, '2')"
          placeholder="形式"
        />
      </div>
    </template>
    <template slot="head-right">
      <div class="module-head-right">
        <!-- <el-select size="mini" class="module-btn" placeholder="形式">
          <el-option label="形式1"></el-option
        ></el-select> -->
      </div>
    </template>
    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td title">范围</el-col>
          <el-col class="td field">1类</el-col>
          <el-col class="td field">2类</el-col>
          <el-col class="td field">3类</el-col>
          <el-col class="td field">4类</el-col>
          <el-col class="td field">5类</el-col>
        </el-row>
        <el-row
          class="tr"
          v-for="(item, index) in bridgeTechnicalStatus"
          :key="index"
        >
          <el-col class="td title">{{ filterStr(item.title) }}</el-col>
          <el-col class="td field">{{
            item.oneNumber + tableTdStr + item.oneProportion
          }}</el-col>
          <el-col class="td field">{{
            item.twoNumber + tableTdStr + item.twProportion
          }}</el-col>
          <el-col class="td field">{{
            item.threeNumber + tableTdStr + item.threeProportion
          }}</el-col>
          <el-col class="td field">{{
            item.fourNumber + tableTdStr + item.fourProportion
          }}</el-col>
          <el-col class="td field">{{
            item.fiveNumber + tableTdStr + item.fiveProportion
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
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper"; //bridgeTechnicalStatus
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
import { ajaxFunObj } from "@/views/cockpit-version-1/commonFun";
export default {
  components: { moduleWrapper, cockpitSelect },
  computed: {
    bridgeTechnicalStatus() {
      return store.bridgeTechnicalStatus;
    },
    currentAreaLevelValue(){
      return store.currentAreaLevelValue
    }
  },
  watch: {
    bridgeTechnicalStatus: {
      handler(val) {
        this.tableData = val;
      },
      deep: true,
    },
    currentAreaLevelValue(){
      this.type1=''
      this.type2=''
    }
  },
  data() {
    return {
      tableTdStr: ",",
      type1: "",
      type2: "",
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
    };
  },
  methods: {
      //过滤分公司和公司字符串
    filterStr(data) {
      const strs = ["分公司", "公司"];
      strs.forEach((val) => {
        // data.replace(/ /g,'')
        data = data.replace(new RegExp(`[${val}]`, "g"), "");
      });

      return data;
    },
    handleData(data, type) {
      // if (type === "1") {
      //   this.type2 = "";
      //   // this.type1 = data.value;
      // } else if (type === "2") {
      //   this.type1 = "";
      // }
      // "bridgeSize": "桥梁大小（大桥、小桥）"
      // "bridgeType": "桥梁类型（拱桥、刚构桥）"
      let queryData = {
        bridgeSize: this.type1,
        bridgeType: this.type2,
      };
      ajaxFunObj.getBridgeTechnicalStatus(queryData);
    },
  },
};
</script>

<style lang="scss" scoped>
.div-table {
  .title {
    width: 10%;
  }
  .field {
    width: 18%;
    font-family: DINEngschriftStd;
  }
}
</style>
