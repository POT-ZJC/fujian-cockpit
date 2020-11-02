<template>
  <div class="maintenance-layout">
    <div class="layout-left">
      <navBar />
      <amap :fontSize="htmlFontSize" class="map" />
    </div>
    <div class="layout-right">
      <!-- 桥梁信息 -->
      <qlxxCircle :fontSize="htmlFontSize" />
      <!-- 桥梁技术状况 -->
      <qljszkBar :fontSize="htmlFontSize" />
      <!-- 桥上机电设备 -->
      <qsjdsbBar :fontSize="htmlFontSize" />
    </div>
  </div>
</template>
<script>
// import ChartsUtilBlock from '../components/chartComponents/ChartsUtilBlock'
// import ChinaMap from "@/views/bridge-cockpit/components/chartComponents/ChinaMap";
import qsjdsbBar from "./components/qsjdsbBar";
import amap from "../components/amap";
import { mapState } from "vuex";
export default {
  components: {
    qsjdsbBar,
    amap,
    navBar: () => import("@/views/bridge-cockpit/components/navBar"),
    qlxxCircle: () => import("./components/qlxxCircle"),
    qljszkBar: () => import("./components/qljszkBar"),
  },
  computed: {
    ...mapState(["htmlFontSize"]),
  },
  watch: {
    htmlFontSize(val) {
      console.log(val);
    },
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
