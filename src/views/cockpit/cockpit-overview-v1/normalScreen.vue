<template>
  <div class="cockpit-overview">
    <div></div>
    <headEl class="header" />
    <!-- 总览 -->
    <div class="overview-box">
      <facilityOverview ref="facilityOverview" />
    </div>
    <!-- 地图 -->
    <div class="map-box"><myMap /></div>
    <!-- 实时预警信息 -->
    <div class="realTimeWarning-box">
      <realTimeWarning ref="realTimeWarning" />
    </div>
    <!-- 在线监测设施 -->
    <div class="onlineMonitorFacility-box">
      <onlineMonitorFacility ref="onlineMonitorFacility" />
    </div>
    <!-- 预警总数及处理 -->
    <div class="warningTotalHandle-box">
      <warningTotalHandle ref="warningTotalHandle" />
    </div>
    <!-- <div class="bridge-link" @click="linktoBrideg" > -->
    <!-- 路面技术状况 -->
    <div class="roadTechnicCondition-box">
      <roadTechnicCondition ref="roadTechnicCondition" />
    </div>
    <!-- 桥梁技术状况 -->
    <div class="bridgeTechnicCondition-box">
      <bridgeTechnicCondition ref="bridgeTechnicCondition" />
    </div>
    <!-- 隧道技术状况 -->
    <div class="tunnelTechnicCondition-box">
      <tunnelTechnicCondition ref="tunnelTechnicCondition" />
    </div>
    <!-- 边坡安全等级 -->
    <div class="slopeSecurityLevel-box">
      <slopeSecurityLevel ref="slopeSecurityLevel" />
    </div>
    <!-- 其他技术状况 -->
    <div class="otherTechnicCondition-box">
      <otherTechnicCondition ref="otherTechnicCondition" />
    </div>
  </div>
</template>

<script>
import headEl from "./components/header";
import myMap from "./components/myAmap";
import facilityOverview from "./components/facilityOverview";
import realTimeWarning from "./components/realTimeWarning";
import warningTotalHandle from "./components/warningTotalHandle";
import onlineMonitorFacility from "./components/onlineMonitorFacility";
import roadTechnicCondition from "./components/roadTechnicCondition";
import bridgeTechnicCondition from "./components/bridgeTechnicCondition";
import tunnelTechnicCondition from "./components/tunnelTechnicCondition";
import slopeSecurityLevel from "./components/slopeSecurityLevel";
import otherTechnicCondition from "./components/otherTechnicCondition";
import { store } from "../cockpitStore";
export default {
  components: {
    headEl,
    myMap,
    facilityOverview,
    realTimeWarning,
    warningTotalHandle,
    onlineMonitorFacility,
    roadTechnicCondition,
    bridgeTechnicCondition,
    tunnelTechnicCondition,
    slopeSecurityLevel,
    otherTechnicCondition,
  },
  computed: {
    currentAreaLevelValue() {
      return store.currentAreaLevelValue;
    },
  },
  watch: {
    currentAreaLevelValue(val) {
      this.levelChange(val);
    },
  },
  mounted() {},
  methods: {
    linktoBrideg() {
      this.$router.push("/cockpit-normalScreen");
    },
    levelChange(level) {
      this.$refs.facilityOverview.handleDemoData(level); //
      this.$refs.warningTotalHandle.handleDemoData(level); //
      this.$refs.realTimeWarning.handleDemoData(level); //
      this.$refs.onlineMonitorFacility.handleDemoData(level); //
      this.$refs.roadTechnicCondition.handleDemoData(level);
      this.$refs.bridgeTechnicCondition.handleDemoData(level);
      this.$refs.tunnelTechnicCondition.handleDemoData(level);
      this.$refs.slopeSecurityLevel.handleDemoData(level);
      this.$refs.otherTechnicCondition.handleDemoData(level);
    },
  },
};
</script>

<style lang="scss" scoped>
.cockpit-overview {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 1366px;
  min-height: 700px;
  width: 100%;
  height: 100%;
  //   background-image: url("./img/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: #04070a;
  font-family: MicrosoftYaHei;
  overflow: hidden;
  .bridge-link {
    position: absolute;
    cursor: pointer;
    top: tovh(90px);
    left: tovw(150px);
    width: tovw(140px);
    height: tovh(200px);
  }
  .header {
    height: toph(80px);
  }
  .map-box {
    position: absolute;
    top: toph(90px);
    left: topw(297px);
    width: topw(820px);
    height: toph(640px);
  }
  .overview-box {
    position: absolute;
    top: toph(85px);
    left: 0;
    width: topw(290px);
    height: toph(645px);
  }
  //实时预警信息
  .realTimeWarning-box {
    position: absolute;
    top: toph(90px);
    right: topw(5px);
    width: topw(790px);
    height: toph(315px);
  }
  //在线监测设施
  .onlineMonitorFacility-box {
    position: absolute;
    top: toph(415px);
    right: topw(404px);
    width: topw(392px);
    height: toph(316px);
  }
  // 预警总数和处理
  .warningTotalHandle-box {
    position: absolute;
    top: toph(415px);
    right: topw(5px);
    width: topw(392px);
    height: toph(316px);
  }
  //路面
  .roadTechnicCondition-box {
    position: absolute;
    bottom: toph(8px);
    left: topw(10px);
    width: topw(372px);
    height: toph(334px);
  }
  //桥梁技术状况
  .bridgeTechnicCondition-box {
    position: absolute;
    bottom: toph(8px);
    left: topw(392px);
    width: topw(372px);
    height: toph(334px);
  }
  //隧道技术状况-tunnelTechnicCondition
  .tunnelTechnicCondition-box {
    position: absolute;
    bottom: toph(8px);
    left: topw(774px);
    width: topw(372px);
    height: toph(334px);
  }
  //边坡安全等级-slopeSecurityLevel
  .slopeSecurityLevel-box {
    position: absolute;
    bottom: toph(8px);
    right: topw(392px);
    width: topw(372px);
    height: toph(334px);
  }
  //其他技术状况-otherTechnicCondition
  .otherTechnicCondition-box {
    position: absolute;
    bottom: toph(8px);
    right: topw(10px);
    width: topw(372px);
    height: toph(334px);
  }
}
/deep/.tc {
  text-align: center !important;
}
/deep/ .switch-box {
  display: flex;
  // align-items: center;
  padding-top: torem(4px);
  .switch-btn {
    font-size: torem(12px);
    padding: 0 torem(8px);
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #6ff5fe;
    }
  }
  .switch-active {
    color: #6ff5fe;
  }
}

/deep/.module-title {
  font-size: torem(16px);
  font-weight: bold;
  height: torem(30px);
  line-height: torem(30px);
  // color: #fff;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff 60%,  #666666 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  // margin-left: torem(20px);
}
/deep/.div-table {
  box-sizing: border-box;
  padding: 0 torem(10px);
  // overflow-y: hidden;
  padding-top: torem(15px);
  height: 100%;
  font-family: MicrosoftYaHei;
  // background-image: linear-gradient(261deg,
  //     #112038 0%,
  //     #1b2c46 50%,
  //     #263958 100%),
  //   linear-gradient(#2329cb,
  //     #2329cb);

  .scrollbar {
    // position: relative;
    // bottom: -16px;
  }

  .sort-arrow {
    cursor: pointer;

    &:hover {
      color: #69a8f6;
    }
  }

  .th {
    // border-top: 1px solid #ccc;
    // border-bottom: 1px solid #ccc;
    color: #fff;
    // background: #354865;
    background-image: linear-gradient(
        -1deg,
        rgba(7, 16, 25, 0.4) 0%,
        rgba(4, 35, 62, 0.4) 50%,
        rgba(0, 57, 106, 0.4) 100%
      ),
      linear-gradient(rgba(12, 30, 42, 0.4), rgba(12, 30, 42, 0.4));
    background-blend-mode: normal, normal;
    border: solid 1px rgba(0, 46, 104, 0.4);
    .td {
      line-height: torem(40px);
      // text-align: left;
      height: torem(40px);
      padding: 0 torem(10px);
      font-size: torem(14px);
      font-weight: bold;
      background: linear-gradient(
        to bottom,
        #ffffff 70%,
        #666666 100%
      ); //#c1c1c1 70%,
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
  }
  .table-stripe {
    background: #04121f;
  }
  .table-tr {
    // border-bottom: 1px solid #384a67;
    color: #fff;

    .td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: torem(40px);
      font-size: torem(14px);
      // text-align: left;
      height: torem(40px);
      padding: 0 torem(10px);
      font-family: DINEngschriftStd;
      font-weight: bold;
      background: linear-gradient(
        to bottom,
        #ffffff 70%,
        #666666 100%
      ); //#c1c1c1 70%,
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }

    // .td:nth-child(1) {
    //   // text-align: left;

    // }
  }
}
  /deep/.item-block {
    margin-bottom: torem(15px);
    height: torem(34px);
    display: flex;
    align-items: center;
    color: #fff;

    .item-label {
      flex-shrink: 0;
      width: torem(110px);
      text-align: right;
      padding-right: torem(10px);
    }

    .item-content {
      flex: 1;
    }
  }
/deep/.el-scrollbar__wrap {
  // overflow-y: auto;
  overflow-x: hidden;
  // padding-bottom: 17px;
}

/deep/.el-scrollbar__thumb:hover {
  background-color: #76eefb;
}

/deep/.el-scrollbar__thumb {
  background-color: #69a8f6;
}

</style>
