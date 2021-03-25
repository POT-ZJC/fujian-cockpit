<template>
  <div class="normal-screen">
    <!-- <div class="header"></div> -->
    <headerEl />
    <div class="main-layout">
      <!-- 桥梁分布统计 -->
      <div class="bridge-distribution">
        <bridgeDistribution />
      </div>
      <!-- 桥梁技术状况 -->
      <div class="bridge-levelCondition">
        <levelCondition />
      </div>
      <!-- 实时监测/检测信息 -->
      <div class="realtimeMonitor">
        <realtimeMonitor />
      </div>
      <!-- 地图 -->
      <div class="map-container">
        <myAmap />
      </div>
      <!-- 实时监测设备 -->
      <div class="monitorDevice">
        <monitorDevice />
      </div>
      <!-- 实时监测桥梁分布 -->
      <div class="realtime-bridge">
        <realtimeBridge />
      </div>
      <!-- 技术状况走势 -->
      <div class="brideg-conditionsTrend">
        <conditionsTrend />
      </div>
      <!-- 病害TOP -->
      <div class="brideg-diseaseTop">
        <diseaseTop />
      </div>
      <!-- 桥梁总览 -->
      <div class="bridge-overview">
        <bridgeOverview />
      </div>
      <!-- 养护绩效TOP -->
      <div class="maintainKpiTop">
        <maintainKpiTop />
      </div>
    </div>
  </div>
</template>
<script>
import "./normalScreen.scss";
import bridgeDistribution from "./components/bridgeDistribution";
import levelCondition from "./components/levelCondition";
import realtimeBridge from "./components/realtimeBridge";
import conditionsTrend from "./components/conditionsTrend";
import maintainKpiTop from "./components/maintainKpiTop";
import diseaseTop from "./components/diseaseTop";
import realtimeMonitor from "./components/realtimeMonitor";
import monitorDevice from "./components/monitorDevice";
import { computedFontSize } from "./utils/htmlFontSize";
import myAmap from "./components/myAmap";
import { mutationsSet, store } from "./cockpitStore";
import "./utils/commonFn";
import headerEl from "./components/header";
import { getAreaList, getRouteList } from "@/api/cockpit-version-1";
import bridgeOverview from "./components/bridgeOverview";
const commonFun = require("./commonFun");
export default {
  components: {
    headerEl,
    myAmap,
    bridgeOverview,
    levelCondition,
    bridgeDistribution,
    realtimeBridge,
    conditionsTrend,
    maintainKpiTop,
    diseaseTop,
    realtimeMonitor,
    monitorDevice,
  },
  data() {
    return {
      // areaList: [],
      // routeList: [],
    };
  },

  computed: {
    wideScreenLevel() {
      return store.wideScreenLevel;
    },
    currentAreaLevelValue() {
      return store.currentAreaLevelValue;
    },
    currentAreaLevelType() {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    // currentAreaLevelValue(val) {},
    // currentAreaLevelType(val) {},
  },
  mounted() {
    this.windowResize();
    commonFun.initData();
    this.initData();
  },
  methods: {
    //初始化页面数据
    initData() {
      this.reqAreaList();
      this.reqRouteList();
    },
    //获取区域
    reqAreaList() {
      getAreaList().then((areaListRes) => {
        if (areaListRes) {
          console.log(areaListRes);
          let areaList = areaListRes.data;
          areaList.forEach((val) => {
            if (
              val.company.indexOf("厦门百城金安") === -1 ||
              val.company.indexOf("福州市交建") === -1
            ) {
              val.companyStr = val.company;
              val.company = this.filterStr(val.company);
            }
          });
          mutationsSet("areaList", areaList);
        } else {
          mutationsSet("areaList", []);
        }
      });
    },
    // 获取路线
    reqRouteList() {
      getRouteList().then((routeListRes) => {
        if (routeListRes) {
          console.log(routeListRes);
          let routeList = routeListRes.data;
          mutationsSet("routeList", routeList);
        } else {
          mutationsSet("routeList", []);
        }
      });
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
    windowResize() {
      // 监听屏幕
      function watchClien() {
        const fontSize = computedFontSize(document.querySelector("html"));
        mutationsSet("fontSize", fontSize);
        // debugger
        const _w = window.innerWidt || document.body.clientWidth,
          _h = window.innerHeight || document.body.clientHeight;
        const clientRatio = _w / _h;
        //设置宽屏等级
        if (clientRatio >= 3.4) {
          //特宽
          mutationsSet("wideScreenLevel", 3);
        } else if (clientRatio >= 2.6) {
          //宽
          mutationsSet("wideScreenLevel", 2);
        } else {
          //普通
          mutationsSet("wideScreenLevel", 1);
        }
      }
      watchClien();
      window.onresize = () => {
        watchClien();
      };
    },
  },
};
</script>
<style lang="scss">
// @import "./normalScreen.scss";
</style>
<style lang="scss" scoped>
.normal-screen {
  // min-width: 1800px;
  // min-height: 900px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(147, 190, 199, 1);
  .main-layout {
    overflow: hidden;
    box-sizing: border-box;
    height: tovh(1000px);
    padding: tovh(10px) 0;
    width: 100%;
    display: flex;
    position: relative;
    .main-left {
      //   width: 50%;
      // height: tovh(760px);
      height: 100%;
      width: tovw(360px);
      margin-left: tovw(10px);
    }
    .main-right {
      height: 100%;
      width: tovw(360px);
      margin-right: tovw(10px);
    }
    //地图容器布局
    .map-container {
      overflow: hidden;
      position: absolute;
      top: tovh(10px);
      left: tovw(10px);
      border-radius: torem(6px);
      width: tovw(790px);
      height: tovh(980px);
    }
    //实时监测/检测信息
    .realtimeMonitor {
      // z-index: 9;
      // overflow: hidden;
      position: absolute;
      top: tovh(340px);
      left: tovw(810px);

      border-radius: torem(6px);
      width: tovw(400px);
      height: tovh(320px);
    }
    // 实时监测设备
    .monitorDevice {
      // z-index: 10;
      // overflow: hidden;
      position: absolute;
      top: tovh(340px);
      right: tovw(10px);
      height: torem(320px);
      border-radius: torem(6px);
      width: tovw(320px);
    }
    //桥梁分布统计
    .bridge-distribution {
      position: absolute;
      top: tovh(10px);
      right: tovw(340px);
      width: tovw(360px);
      height: tovh(320px);
    }
    //桥梁技术状况布局
    .bridge-levelCondition {
      position: absolute;
      top: tovh(10px);
      left: tovw(810px);

      width: tovw(400px);
      height: tovh(320px);
    }
    //实时监测桥梁分布
    .realtime-bridge {
      position: absolute;
      top: tovh(340px);
      right: tovw(340px);
      width: tovw(360px);
      height: tovh(320px);
    }
    //桥梁-技术状况走势
    .brideg-conditionsTrend {
      position: absolute;
      top: tovh(10px);
      right: tovw(10px);
      width: tovw(320px);
      height: tovh(320px);
    }
    //病害TOP
    .brideg-diseaseTop {
      position: absolute;
      bottom: tovh(10px);
      left: tovw(810px);
      width: tovw(545px);
      height: tovh(320px);
    }
    //桥梁总览布局
    .bridge-overview {
      // display: none;
      position: absolute;
      top: tovh(20px);
      left: tovw(10px);
      width: tovw(790px);
      height: tovh(160px);
    }
    //养护绩效TOP
    .maintainKpiTop {
      position: absolute;
      bottom: tovh(10px);
      right: tovw(10px);
      width: tovw(545px);
      height: tovh(320px);
    }
  }
}
</style>
