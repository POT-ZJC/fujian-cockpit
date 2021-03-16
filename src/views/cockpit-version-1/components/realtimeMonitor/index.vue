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
          <el-col class="td" :span="5">预警等级</el-col>
          <el-col class="td" :span="5">内容</el-col>
          <el-col class="td" :span="5">时间</el-col>
          <!-- <el-col class="td" :span="3">5类</el-col> -->
        </el-row>
        <el-row
          class="tr"
        
          v-for="(item, index) in demoData"
          :key="index"
        >
          <el-col class="td" :span="5">{{
            item.name || "大桥" + (index + 1)
          }}</el-col>
          <el-col class="td" :span="4">{{
            item.key1 || "构件" + (index + 1)
          }}</el-col>
          <el-col class="td" :span="5"    :style="`color:${item.type===1? 'yellow' :(item.type===2?'red': 'white')}`">{{
            item.key2 || (index & 1 ? "黄色" : "红色")
          }}</el-col>
          <el-col class="td" :span="5"  :title="item.key3 ">{{
            item.key3 || "预警内容" + (index + 1)
          }}</el-col>
          <el-col class="td" :span="5">{{ item.key4 || "2021-3-01" }}</el-col>
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
export default {
  components: { moduleWrapper,cockpitSelect },
  computed: {
    bridgeLevelCondition() {
      return store.bridgeLevelCondition;
    },
  },
  data() {
    return {
       type1:'检测',
      type2:'今日', 
      optionData1:[{value:'检测'},{value:'监测'}],
      optionData2:[{value:'今日'},{value:'近7日'},{value:'近1月'}],
      demoData: [
        {
          name: "营前特大桥左桥",
          key1: "第2跨3#T梁",
          key2: "标度：3	",
          type:3,
          key3: "T梁腹板斜向裂缝	",
          key4: "2021-3-5	",
        },
        {
          name: "太城岭大桥左桥",
          key1: "第3跨1#箱梁",
          key2: "黄色预警	",
           type:1,
          key3: "裂缝宽度值接近限值	",
          key4: "2021-3-3",
        },
        {
          name: "青口大桥右桥",
          key1: "第1跨2#板梁",
          key2: "标度：3	",
           type:3,
          key3: "板底横向裂缝	",
          key4: "2021-3-2",
        },
        {
          name: "里仁特大桥右桥",
          key1: "第8跨1#箱梁",
          key2: "红色预警	",
           type:2,
          key3: "温度超标	",
          key4: "2021-3-1",
        },
        {
          name: "来福大桥右幅",
          key1: "第2跨2#桥墩",
          key2: "标度：4	",
           type:3,
          key3: "墩顶混凝土破损、露筋	",
          key4: "2021-2-29",
        },
        {
          name: "车里湾大桥左幅",
          key1: "第6跨1#T梁",
          key2: "黄色预警	",
           type:1,
          key3: "应力变化较大	",
          key4: "2021-2-28",
        },
        {
          name: "下庄大桥右桥",
          key1: "第3跨4#支座",
          key2: "标度：3	",
           type:3,
          key3: "支座剪切变形位移较大	",
          key4: "2021-2-27",
        },
        {
          name: "叶坊大桥左幅",
          key1: "第2跨1#T梁",
          key2: "红色预警	",
           type:2,
          key3: "下挠位移接近限值	",
          key4: "2021-2-25",
        },
      ],
    };
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
