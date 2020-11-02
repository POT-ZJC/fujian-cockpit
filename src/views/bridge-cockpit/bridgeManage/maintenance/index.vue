<template>
  <div class="maintenance-layout">
    <div class="layout-left">
      <navBar />
      <amap :fontSize="htmlFontSize" class="map" />
    </div>
    <div class="layout-right">
      <!-- 检查任务 -->
      <jcrwCount :fontSize="htmlFontSize" />
      <!-- 病害统计 -->
      <bhtjCircle :fontSize="htmlFontSize" />
      <!-- 养护维修 -->
      <yhwxCircle :fontSize="htmlFontSize" />
    </div>
  </div>
</template>
<script>  
import bhtjCircle from "./components/bhtjCircle";
import { mapState } from "vuex"; 
import amap from "../components/amap";
export default {
  components: {
    amap,
    bhtjCircle,
    jcrwCount: () => import("./components/jcrwCount"),
    yhwxCircle: () => import("./components/yhwxCircle"),
    navBar: () => import("@/views/bridge-cockpit/components/navBar"),
  },
  computed: {
    ...mapState(["htmlFontSize"]),
  }, 
};
</script>
<style lang="scss" scoped>
.maintenance-layout {
  // min-width: 100%;
  min-height: 100%;
  // padding: 0.0938rem;
  padding: 10px 8px 18px 8px;
  height: 960px;
  margin: 0 auto;
  display: flex;
  .layout-left {
    position: relative;
    flex-shrink: 0;
    width: 1510px;
    height: 100%;
     margin-right: 15px;
    .map{
      height: 100%;
      width: 100%;
    }
  }
  .layout-right {
    position: relative;
    flex-shrink: 0;
    width: 374px;
    height: 100%;
  }
}
</style>
