<template>
  <moduleWrapper>
    <template slot="head">
      <div class="module-title">实时监测(检测)</div>
    </template>

    <div class="div-table">
      <el-scrollbar style="height:100%" class="scrollbar">
        <el-row class="th">
          <el-col class="td" :span="5">桥名</el-col>
          <el-col class="td" :span="4">构件</el-col>
          <el-col class="td" :span="5">预警等级</el-col>
          <el-col class="td" :span="5">监测(检测)内容</el-col>
          <el-col class="td" :span="5">时间</el-col>
          <!-- <el-col class="td" :span="3">5类</el-col> -->
        </el-row>
        <el-row
          class="tr"
          :style="`color:${index&1?'yellow':'red'}`"
          v-for="(item, index) in bridgeLevelCondition"
          :key="index"
        >
          <el-col class="td" :span="5">{{ "大桥" + (index + 1) }}</el-col>
          <el-col class="td" :span="4">{{ "构件" + (index + 1) }}</el-col>
          <el-col class="td" :span="5">{{   index&0?'黄色':'红色'  }}</el-col>
          <el-col class="td" :span="5">{{ "预警内容" + (index + 1) }}</el-col>
          <el-col class="td" :span="5">{{ '2021-3-01' }}</el-col>
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
