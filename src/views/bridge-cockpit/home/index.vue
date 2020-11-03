<template>
  <div class="home-layout">
    <div class="layout-up">
      <div class="up-left">
        <!-- 上左-检查任务模块 -->
        <jcrwCount :fontSize="htmlFontSize" />
        <!-- 上左-养护维修模块 -->
        <yhwxCircle :fontSize="htmlFontSize" />
      </div>

      <div class="up-center">
        <showNumber :fontSize="htmlFontSize" />

        <!-- 中间-地图 -->
        <amap :fontSize="htmlFontSize" />
      </div>

      <div class="up-right">
        <!-- 实时监测 -->
        <ssjcEcharts :fontSize="htmlFontSize" />
        <!-- 通报预警统计 -->
        <tbyjBar :fontSize="htmlFontSize" />
      </div>
    </div>
    <div class="layout-down">
      <!-- 桥梁信息 -->
      <qlxxCircle :fontSize="htmlFontSize" class="down-left" />
      <!-- 技术状况评定 -->
      <jszkpdBar :fontSize="htmlFontSize" class="down-center" />
      <!-- 机电设备 -->
      <jdsbBar :fontSize="htmlFontSize" class="down-right" />
    </div>
    <!-- <ChartsUtilBlock width="15.06" isMain> -->

    <!-- </ChartsUtilBlock> -->
  </div>
</template>
<script> 
import amap from "./components/amap";
import { mapState } from "vuex";
export default {
  components: {
    // ChartsUtilBlock,
    amap,
    jszkpdBar: () => import("./components/jszkpdBar"),
    showNumber: () => import("./components/showNumber"),
    jcrwCount: () => import("./components/jcrwCount"),
    jdsbBar: () => import("./components/jdsbBar"),
    qlxxCircle: () => import("./components/qlxxCircle"),
    yhwxCircle: () => import("./components/yhwxCircle"),
    ssjcEcharts: () => import("./components/ssjcEcharts"),
    tbyjBar: () => import("./components/tbyjBar"),
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
.home-layout {
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
      width: 375px;
      flex-shrink: 0;
    }
    .up-center {
      position: relative;
      width: 11.7708rem;
      height: 100%;
      margin: 0 auto;
      flex-shrink: 0;
    }
    .up-right {
       width: 375px;
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
