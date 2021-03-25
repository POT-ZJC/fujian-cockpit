<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">桥梁技术状况</div>
    </template>
    <template slot="head-right">
      <div class="select-box">
        <!-- <div class="switch-btn ">规模</div>
        <div class="switch-btn switch-active">形式</div> -->
        <cockpit-select
          v-model="type1"
          :hasClear="true"
          :optionData="optionData1"
          @change="(data) => handleData(data, '1')"
          placeholder="规模"
        />
        <cockpit-select
          v-model="type2"
          :hasClear="true"
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
          <el-col class="td title ">范围</el-col>
          <el-col class="td field tc"
            >5类
            <span
              class="sort-arrow"
              @click="tableSort.type5 = !tableSort.type5"
              >{{ tableSort.type5 ? "↑" : "↓" }}</span
            ></el-col
          >
          <el-col class="td field tc"
            >4类
            <span
              class="sort-arrow"
              @click="tableSort.type4 = !tableSort.type4"
              >{{ tableSort.type4 ? "↑" : "↓" }}</span
            ></el-col
          >
          <el-col class="td field tc"
            >3类
            <span
              class="sort-arrow"
              @click="tableSort.type3 = !tableSort.type3"
              >{{ tableSort.type3 ? "↑" : "↓" }}</span
            ></el-col
          >
          <el-col class="td field tc"
            >2类
            <span
              class="sort-arrow"
              @click="tableSort.type2 = !tableSort.type2"
              >{{ tableSort.type2 ? "↑" : "↓" }}</span
            ></el-col
          >
          <el-col class="td field tc"
            >1类
            <span
              class="sort-arrow"
              @click="tableSort.type1 = !tableSort.type1"
              >{{ tableSort.type1 ? "↑" : "↓" }}</span
            ></el-col
          >
        </el-row>
        <el-row class="tr" v-for="(item, index) in tableData" :key="index">
          <el-col class="td title  ">{{ filterStr(item.title) }}</el-col>
          <el-col class="td field tc">{{
            showTableTd(item.fiveNumber, tableTdStr, item.fiveProportion)
          }}</el-col>
          <el-col class="td field tc">{{
            showTableTd(item.fourNumber, tableTdStr, item.fourProportion)
          }}</el-col>

          <el-col class="td field tc">{{
            showTableTd(item.threeNumber, tableTdStr, item.threeProportion)
          }}</el-col>

          <el-col class="td field tc">{{
            showTableTd(item.twoNumber, tableTdStr, item.twProportion)
          }}</el-col>

          <el-col class="td field tc">{{
            showTableTd(item.oneNumber, tableTdStr, item.oneProportion)
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
    currentAreaLevelValue() {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    bridgeTechnicalStatus: {
      handler(val) {
        console.log("bridgeTechnicalStatus", val);
        if (this.type2) {
          // bridgeDistributionScale:[],//规模
          // bridgeDistributionForm:[] //形式
          this.tableData = val.bridgeDistributionForm;
        } else {
          this.tableData = val.bridgeDistributionScale;
        }
      },
      deep: true,
    },
    currentAreaLevelValue() {
      this.type1 = "";
      this.type2 = "";
      let queryData = {
        bridgeSize: this.type1,
        bridgeType: this.type2,
      };
      ajaxFunObj.getBridgeTechnicalStatus(queryData);
    },
  },
  data() {
    return {
      tableTdStr: "，",
      type1: "特大桥",
      type2: "",
      optionData1: [
        // { value: "", label: "规模" },
        { value: "特大桥" },
        { value: "大桥" },
        { value: "中桥" },
        { value: "小桥" },
      ],
      optionData2: [
        // { value: "", label: "形式" },
        { value: "梁桥" },
        { value: "拱桥" },
        { value: "悬索桥" },
        { value: "刚构桥" },
        { value: "组合桥" },
      ],
      tableData: [],
      tableSort: {
        type1: true,
        type2: true,
        type3: true,
        type4: true,
        type5: true,
      },
    };
  },
  methods: {
    showTableTd(a, b, c) {
      // return a+b+c
      return c;
    },
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
      if (type === "1") {
        this.type2 = "";
        // this.type1 = data.value;
      } else if (type === "2") {
        this.type1 = "";
      }
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
    width: 20%;
    // text-align: center;
  }
  .field {
    width: 16%;
    font-family: DINEngschriftStd;
  }
}
/deep/.el-scrollbar__view {
  // width: 150%;
}
/deep/.el-scrollbar__bar.is-horizontal {
  height: 8px;
}
</style>
