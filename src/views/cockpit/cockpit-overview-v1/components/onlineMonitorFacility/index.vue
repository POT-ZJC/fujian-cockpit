<template>
  <moduleWrapper>
    <template slot="head-title">
      <div class="module-title">在线监测设施数量</div>
    </template>
    <radar :dataList="dataList" ref='echartsRadar' moduleName='监测设施' :areaColors="areaColors"/>
  </moduleWrapper>
</template>
<script>
import moduleWrapper from "@/views/cockpit/cockpit-overview-v1/ui/module-wrapper"; //bridgeLevelCondition
// import { mutationsSet, store } from "@/views/cockpit/cockpit-overview-v1/bridgeStore";
import cockpitSelect from "@/views/cockpit/cockpit-overview-v1/ui/select";
import radar from "@/views/cockpit/charts/radar";
import { demoData } from "./在线监测设施json";
export default {
  components: {
    moduleWrapper,
    cockpitSelect,
    radar,
  },
  data() {
    return {
      dataList: [],
      areaColors:['rgba(11,245,254,0.4)','rgba(1,1,1,0.4)']
    };
  },
  mounted() {
    this.handleDemoData()
  },
  methods: {
    handleDemoData(levelValue ) {
      let dataSource = []; 
      try {
        dataSource = demoData[levelValue || "福建省"] || [];
      } catch (err) {
        console.log(err);
      }

      this.dataList = dataSource; 
      this.$nextTick(() => {
        this.$refs.echartsRadar.setEcharts();
      });
    },

  },
};
</script>
