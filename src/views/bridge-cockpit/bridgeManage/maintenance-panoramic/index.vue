<template>
  <div class="maintenance-layout">
    <div class="layout-up">
      <div class="up-left">
        <!-- 上左-检查任务 -->
        <jcrwCount :id="id"/>
        <!-- 上左-病害统计 -->
        <bhtjCircle :fontSize="htmlFontSize" :id="id" />
      </div>

      <div class="up-center">
        <navBar />
        <amap :fontSize="htmlFontSize" class="map" :id="id" />
        <!-- 中间-地图 -->
        <!-- <ChinaMap :fontSize="htmlFontSize" /> -->
      </div>

      <div class="up-right">
        <!-- 实时监测 -->
        <ssjcEcharts :fontSize="htmlFontSize" :id="id" />
        <!-- 机电故障 -->
        <jdgzBar :fontSize="htmlFontSize" :id="id" />
      </div>
    </div>
    <div class="layout-down">
      <!-- 桥梁信息 -->
      <qlxxCircle :fontSize="htmlFontSize" class="down-left" :id="id"/>
      <!-- 技术状况评定 -->
      <jszkpdBar :fontSize="htmlFontSize" class="down-center" :id="id" />
      <!-- 机电设备 -->
      <jdsbBar :fontSize="htmlFontSize" class="down-right" :id="id" />
    </div>
    <!-- <ChartsUtilBlock width="15.06" isMain> -->

    <!-- </ChartsUtilBlock> -->
  </div>
</template>
<script>
// import ChartsUtilBlock from '../components/chartComponents/ChartsUtilBlock'
// import ChinaMap from '@/views/bridge-cockpit/components/chartComponents/ChinaMap'
import jcssPie from "./components/jcssPie";
import bhtjCircle from "./components/bhtjCircle";
import amap from "../components/amap";
import { mapState } from "vuex";
export default {
  components: {
    amap,
    // ChartsUtilBlock,
    jcrwCount: () => import("./components/jcrwCount"),
    navBar: () => import("@/views/bridge-cockpit/components/navBar"),
    bhtjCircle,
    jcssPie,
    jszkpdBar: () => import("./components/jszkpdBar"),
    jdsbBar: () => import("./components/jdsbBar"),
    qlxxCircle: () => import("./components/qlxxCircle"),
    ssjcEcharts: () => import("./components/ssjcEcharts"),
    jdgzBar: () => import("./components/jdgzBar"),
  },
  computed: {
    ...mapState(["htmlFontSize"]),
  },
  data() {
    return {
      id: "",
    };
  },
  watch: {
    htmlFontSize(val) {
      // console.log(val)
    },
  },
  mounted() {
      this.loopPlay();
  },
  methods: {
    loopPlay() {
      this.id = "id_" + new Date().getTime();
      setTimeout(() => {
        this.loopPlay();
      }, 3000);
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
  margin: 0 auto;
  .layout-up {
    display: flex;
    width: 100%;
    height: 6.6rem;
    // justify-content: space-between;
    .up-left {
      width: 3.8958rem;
      flex-shrink: 0;
    }
    .up-center {
      position: relative;
      width: 11.7708rem;
      height: 100%;
      margin: 0 0.125rem;
      flex-shrink: 0;
      .map {
        height: 100%;
        width: 100%;
      }
    }
    .up-right {
      width: 3.8958rem;
      flex-shrink: 0;
    }
  }
  .layout-down {
    display: flex;
    width: 100%;
    height: 3.2708rem;
    margin-top: 0.1875rem;
    .down-left {
      flex-shrink: 0;
    }
    .down-center {
      margin: 0 0.125rem;
      flex-shrink: 0;
    }
    .down-right {
      flex-shrink: 0;
    }
  }
}
</style>
