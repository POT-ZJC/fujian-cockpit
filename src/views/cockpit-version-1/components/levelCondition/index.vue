<template>
  <moduleWrapper>
    <template slot="head">
      <div class="module-title">技术状况统计</div>
    </template>

    <div class="div-table" >
      <el-scrollbar style="height:100%"  class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="9">统计范围</el-col>
          <el-col class="td" :span="3">1类</el-col>
          <el-col class="td" :span="3">2类</el-col>
          <el-col class="td" :span="3">3类</el-col>
          <el-col class="td" :span="3">4类</el-col>
          <el-col class="td" :span="3">5类</el-col>
        </el-row>
        <el-row
          class="tr"
          v-for="(item, index) in bridgeLevelCondition"
          :key="index"
        >
          <el-col class="td" :span="9">{{ item.company }}</el-col>
          <el-col class="td" :span="3">{{ item.oneLevel || "-" }}</el-col>
          <el-col class="td" :span="3">{{ item.twoLevel || "-" }}</el-col>
          <el-col class="td" :span="3">{{ item.threeLevel || "-" }}</el-col>
          <el-col class="td" :span="3">{{ item.fourLevel || "-" }}</el-col>
          <el-col class="td" :span="3">{{ item.fiveLevel || "-" }}</el-col>
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
export default {
  components: { moduleWrapper },
  computed: {
    bridgeLevelCondition() {
      return store.bridgeLevelCondition;
    },
  },
  // watch:{
  //     bridgeLevelCondition:{
  //         handler(val){

  //         },
  //         deep:true
  //     }
  // }
};
</script>

<style lang="scss" scoped>

</style>
