<template>
  <moduleWrapper>
    <template slot="head">
      <div class="module-title">桥梁总览</div>
    </template>
    <div class="charts-left">
      <radar
        ref="bridgeScaleTotalRadar"
        moduleName="规模分类"
        class="charts-radar"
        :dataList="bridgeScaleTotal"
      />
    </div>
    <div class="charts-right">
      <radar
        ref="bridgeTypeTotalRadar"
        moduleName="形式分类"
        class="charts-radar"
        :dataList="bridgeTypeTotal"
      />
    </div>
  </moduleWrapper>
  <!-- <div class="cockpit-module">
    <div class="module-head">
    
    </div>

   
  </div> -->
</template>
<script>
import radar from "../charts/radar";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";

export default {
  components: { radar, moduleWrapper },
  computed: {
    bridgeScaleTotal() {
      //桥梁规模总览
      return store.bridgeScaleTotal;
    },
    bridgeTypeTotal() {
      //桥梁形式总览
      return store.bridgeTypeTotal;
    },
  },
  watch: {
    bridgeScaleTotal: {
      handler(val) {
        console.log('bridgeScaleTotal',val);
        this.$nextTick(() => {
          this.$refs["bridgeScaleTotalRadar"].setEcharts();
        });
      },
      deep: true,
    },
    bridgeTypeTotal: {
      handler(val) {
          console.log('bridgeTypeTotal',val);
        this.$nextTick(() => {
          this.$refs["bridgeTypeTotalRadar"].setEcharts();
        });
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.charts-left {
  float: left;
  height: 100%;
  width: 50%;
  .charts-radar {
    height: 100%;
  }
}
.charts-right {
  float: right;
  height: 100%;
  width: 50%;
  .charts-radar {
    height: 100%;
  }
}
</style>
