<template>
  <div class="bridge-normal-screen">
    <!-- <div class="header"></div> -->
    <headerEl @areaLevelChange="updatePageInfo" @searchMap="headerElSearch" />
    <div class="main-layout">
      <!-- 桥梁总览 -->
      <div class="bridge-overview">
        <bridgeOverview
          ref="bridgeOverview"
          @activeBridgeType="activeBridgeType"
          :key="bridgeOverviewKey"
        />
      </div>
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
        <myAmap ref="myAmap" />
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
// import { computedFontSize } from "./utils/htmlFontSize";
import myAmap from "./components/myAmap";
import { bridgeMutationsSet, bridgeStore } from "./bridgeStore";
import "./utils/commonFn";
import headerEl from "./components/header";
import bridgeOverview from "./components/bridgeOverview";
const commonFun = require("@/views/cockpit/cockpit-bridge-v1/commonFun");
// const commonFun = require("./commonFun");
const getLevelToLable = (data) => {
  let type = "福建省";
  switch (data) {
    case "company":
      type = "区域公司";
      break;
    case "maintenanceCenter":
      type = "养护中心";
      break;
    case "maintenanceStation":
      type = "养护站";
      break;
    case "routeName":
      type = "路线";
      break;
    case "sectionName":
      type = "路段";
      break;
    default:
      null;
  }
  return type;
};
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
      areaModel: "",
      areaLevel: "",
      bridgeOverviewKey: "",
      // areaList: [],
      // routeList: [],
    };
  },
  created() {
    // console.log("beforeRouteEnter", to);
    // console.log("bridgeStore", bridgeStore);
    let data = {
      value: "",
      type: "",
      levelName: "",
    };
    const areaModel = this.$route.query.areaModel;
    const areaLevel = this.$route.query.areaLevel;
    if (areaModel && areaLevel) {
      data.value = areaModel;
      data.type = areaLevel;
    }
    data.levelName = getLevelToLable(areaLevel);
    this.updatePageInfo(data);
    // next();
  },
  computed: {
    // currentAreaLevelValue() {
    //   return bridgeStore.currentAreaLevelValue;
    // },
    // currentAreaLevelType() {
    //   return bridgeStore.currentAreaLevelType;
    // },
  },
  watch: {
    // currentAreaLevelValue(val) {},
    // currentAreaLevelType(val) {},
  },
  mounted() {
    // commonFun.initData();
  },
  methods: {
    updatePageInfo(data) {
      //   currentAreaLevelType:'',//当前区域/路线层级类型
      // currentAreaLevelTypeName:'',//当前区域/路线层级类型名称
      // currentAreaLevelValue:'',//当前区域/路线层级的值
      // searchMapKeyword:'',//搜索地图关键字
      bridgeMutationsSet("currentAreaLevelValue", data.value);
      bridgeMutationsSet("currentAreaLevelType", data.type);
      bridgeMutationsSet("currentAreaLevelTypeName", data.levelName);
      bridgeMutationsSet("searchMapKeyword", "");
      bridgeMutationsSet("bridgeOverviewActive", {
        all: false,
        bridgeSize: {}, //桥长/规模
        structureType: {}, //桥型/形式
      });
      commonFun.initData();
      this.bridgeOverviewKey = "random" + Math.random();
      this.$refs.myAmap?.clearBridgePoi();
    },
    activeBridgeType(hasActive) {
      if (hasActive) {
        this.searchMap();
      } else {
        this.$refs.myAmap?.clearBridgePoi();
      }
    },
    headerElSearch() {
      this.$refs.bridgeOverview.computedHasActive(true);
      // this.searchMap();
    },
    searchMap() {
      this.$refs.myAmap.reqBridgeListByParam();
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
  },
};
</script>
<style lang="scss">
// @import "./normalScreen.scss";
</style>
<style lang="scss" scoped>
.bridge-normal-screen {
  // min-width: 1800px;
  // min-height: 900px;
  // overflow: hidden;
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
      // overflow: hidden;
      position: absolute;
      top: tovh(10px);
      left: tovw(10px);
      border-radius: torem(6px);
      width: tovw(718px);
      height: tovh(980px);
    }
    //实时监测/检测信息
    .realtimeMonitor {
      // z-index: 9;
      // overflow: hidden;
      position: absolute;
      top: tovh(340px);
      right: tovw(10px);
      border-radius: torem(6px);
      width: tovw(384px);
      height: tovh(320px);
    }
    // 实时监测设备
    .monitorDevice {
      // z-index: 10;
      // overflow: hidden;
      position: absolute;
      top: tovh(340px);
      right: tovw(404px);
      height: tovh(320px);
      border-radius: torem(6px);
      width: tovw(384px);
    }
    //桥梁分布统计
    .bridge-distribution {
      position: absolute;
      top: tovh(10px);
      left: tovw(738px);
      width: tovw(384px);
      height: tovh(320px);
    }
    //桥梁技术状况布局
    .bridge-levelCondition {
      position: absolute;
      top: tovh(10px);
      right: tovw(404px);
      width: tovw(384px);
      height: tovh(320px);
    }
    //实时监测桥梁分布
    .realtime-bridge {
      position: absolute;
      top: tovh(340px);
      left: tovw(738px);
      width: tovw(384px);
      height: tovh(320px);
    }
    //桥梁-技术状况走势
    .brideg-conditionsTrend {
      position: absolute;
      top: tovh(10px);
      right: tovw(10px);
      width: tovw(384px);
      height: tovh(320px);
    }
    //病害TOP
    .brideg-diseaseTop {
      position: absolute;
      bottom: tovh(10px);
      left: tovw(738px);
      width: tovw(581px);
      height: tovh(320px);
    }
    //桥梁总览布局
    .bridge-overview {
      // display: none;
      z-index: 1;
      position: absolute;
      top: tovh(20px);
      left: tovw(10px);
      width: tovw(708px);
      height: tovh(160px);
    }
    //养护绩效TOP
    .maintainKpiTop {
      position: absolute;
      bottom: tovh(10px);
      right: tovw(10px);
      width: tovw(581px);
      height: tovh(320px);
    }
  }
}
</style>
