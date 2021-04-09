<template>
  <div class="bridge-overviewbox">
    <div
      class="bridge-total common-wrapper"
      :class="{ active: activeBridge.all }"
      @click="setAll()"
    >
      <div class="total-title">桥梁座数</div>
      <div class="total-number">{{ bridegTotal }}</div>
      <div class="total-year-up">
        <div class="year-txt">年</div>
        <div class="year-up-number after-up">
          {{ numToFixed(bridegTotal * 0.01, 0) }}
        </div>
        <div class="year-up after-up">1%</div>
      </div>
    </div>
    <div class="overview-right">
      <div class="overview-type-1">
        <div
          class="type-1-item common-wrapper"
          :class="{ active: activeBridge.bridgeSize[item.title] }"
          v-for="(item, index) in bridgeScaleTotal"
          @click="setType1Active(item, index)"
          :key="index"
        >
          <div class="item-top">
            <div class="item-name">{{ item.title }}</div>
            <div class="item-up-number  ">
              {{ item.proportion }}
            </div>
            <div class="item-up after-up">{{ "5.5%" }}</div>
          </div>
          <div class="item-bottom">
            <div class="item-number">
              {{ item.number }}
            </div>
            <div class="item-unit">座</div>
          </div>
        </div>
      </div>
      <div class="overview-type-2">
        <div
          class="type-2-item common-wrapper"
          :class="{ active: activeBridge.structureType[item.title] }"
          v-for="(item, index) in bridgeTypeTotal"
          @click="setType2Active(item, index)"
          :key="index"
        >
          <div class="item-name">{{ item.title }}</div>
          <div class="item-desc">
            <div class="desc-top">
              <div class="desc-number">{{ item.number }}</div>
              <div class="desc-unit">{{ "座" }}</div>
            </div>
            <div class="desc-bottom">
              <div class="desc-up-number">
                {{ item.proportion }}
              </div>
              <div class="desc-up after-up">{{ "6.5%" }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import radar from "../charts/radar";
import {
  bridgeMutationsSet,
  bridgeStore,
} from "@/views/cockpit/cockpit-bridge-v1/bridgeStore";
import moduleWrapper from "@/views/cockpit/cockpit-bridge-v1/components/ui/module-wrapper";

export default {
  components: { moduleWrapper },
  computed: {
    currentAreaLevelValue() {
      this.bridegTotal = 0;
      return bridgeStore.currentAreaLevelValue;
    },
    bridgeScaleTotal() {
      //桥梁规模总览
      return bridgeStore.bridgeScaleTotal;
    },
    bridgeTypeTotal() {
      //桥梁形式总览
      return bridgeStore.bridgeTypeTotal;
    },
  },
  watch: {
    bridgeScaleTotal: {
      handler(data) {
        // console.log("bridgeScaleTotal", val);
        let total = 0;
        data.forEach((val) => (total += Number(val.number)));
        this.bridegTotal = total;
      },
      deep: true,
    },
  },
  data() {
    return {
      bridegTotal: 0,
      bridegTotalYearUpNum: 0,
      bridegTotalYearUp: 0,
      total: false,
      activeBridge: {
        all: false,
        bridgeSize: {}, //桥长/规模
        structureType: {}, //桥型/形式
      },
    };
  },
  methods: {
    numToFixed(a, b) {
      return window.numToFixed(a, b);
    }, 
    computedHasActive(isActive) {
      let { bridgeSize, structureType } = this.activeBridge,
        hasActive = false;
      // debugger
      for (let key in bridgeSize) {
        if (bridgeSize[key]) {
          hasActive = true;
          break;
        }
      }

      for (let key in structureType) {
        if (structureType[key]) {
          hasActive = true;
          break;
        }
      }
      //如果有激活，且无激活类型 就激活全部
      if (isActive && !hasActive) {
        this.activeBridge.all = true;
      } else {
        //否则都默认全部不激活
        this.activeBridge.all = false;
      }
      this.$set(this.activeBridge, "bridgeSize", { ...bridgeSize });
      this.$set(this.activeBridge, "structureType", { ...structureType });
      bridgeMutationsSet("bridgeOverviewActive", { ...this.activeBridge });
      this.$nextTick(() => {
        this.$emit("activeBridgeType",isActive|| hasActive);
      });
    },
    setAll() {
      let { bridgeSize, structureType, all } = this.activeBridge;
      for (let key in bridgeSize) {
        bridgeSize[key] = false;
      }
      for (let key in structureType) {
        structureType[key] = false;
      }
      this.activeBridge.all = !all;
      this.$set(this.activeBridge, "bridgeSize", { ...bridgeSize });
      this.$set(this.activeBridge, "structureType", { ...structureType });
      bridgeMutationsSet("bridgeOverviewActive", this.activeBridge);
      this.$nextTick(() => {
        this.$emit("activeBridgeType", !all);
      });
    },
    // 规模=type1
    setType1Active(data, index) {
      const { title, active } = data;
      const isActive = this.activeBridge.bridgeSize[title];
      let { structureType } = this.activeBridge;
      for (let key in structureType) {
        structureType[key] = false;
        // break
      }
      this.activeBridge.bridgeSize[data.title] = !isActive;
      this.computedHasActive();
    },
    //形式
    setType2Active(data, index) {
      const { title, active } = data;
      const isActive = this.activeBridge.structureType[title];
      let { bridgeSize } = this.activeBridge;
      for (let key in bridgeSize) {
        bridgeSize[key] = false;
        // break
      }
      this.activeBridge.structureType[data.title] = !isActive;
      this.computedHasActive();
    },
  },
};
</script>
<style lang="scss" scoped>
.bridge-overviewbox {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;

  .common-wrapper {
    cursor: pointer;
    background-image: linear-gradient(
        -49deg,
        #112038 0%,
        #1b2c46 50%,
        #263958 100%
      ),
      linear-gradient(#64cebf, #64cebf);

    background-blend-mode: normal, normal;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    border: solid 1px #6d86ac;
  }
  .after-up {
    &::after {
      content: "↑";
      color: red;
      right: torem(-2px);
      top: torem(-3px);
      font-weight: bold;
      // position: absolute;
      font-size: torem(14px);
    }
  }
  .active {
    background-image: linear-gradient(
        -49deg,
        #112038 0%,
        #133459 50%,
        #144b81 100%
      ),
      linear-gradient(#64cebf, #64cebf);
  }
  .bridge-total {
    box-sizing: border-box;
    position: absolute;
    left: torem(10px);
    top: 0;
    width: torem(110px);
    height: 100%;
    .total-title {
      font-size: torem(20px);
      color: #f9fafa;
      font-weight: bold;
      margin-top: torem(23px);
      text-align: center;
    }
    .total-number {
      font-size: torem(36px);
      color: #76eefb;
      height: torem(32px);
      text-align: center;
      margin: torem(16px) 0;
      line-height: torem(32px);
      font-family: DINENGSCHRIFTSTD;
    }

    .total-year-up {
      height: torem(16px);
      display: flex;
      justify-content: center;
      align-items: center;
      .year-txt {
        font-size: torem(16px);
        color: #f9fafa;
      }
      .year-up-number {
        font-size: torem(18px);
        color: #76eefb;
        padding-right: torem(3px);
        font-family: DINENGSCHRIFTSTD;
        position: relative;
      }
      .year-up {
        font-size: torem(18px);
        color: #76eefb;
        position: relative;
        font-family: DINENGSCHRIFTSTD;
      }
    }
  }
  .overview-right {
    margin-left: torem(121px);
    height: 100%;
    .overview-type-1 {
      height: 50%;
      display: flex;
      .type-1-item {
        margin: 1px;
        flex: 1;
        padding: 0 torem(12px);
      }
      .item-top {
        padding-top: torem(5px);
        height: 42%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .item-bottom {
        display: flex;
        align-items: center;
        height: 58%;
        box-sizing: border-box;
        padding-bottom: torem(10px);
      }
      .item-name {
        font-size: torem(16px);
        color: #f9fafa;
        padding-right: torem(12px);
        font-weight: bold;
      }
      .item-up-number {
        font-size: torem(16px);
        padding-right: torem(5px);
        color: #76eefb;
        position: relative;
        font-family: DINENGSCHRIFTSTD;
      }
      .item-up {
        font-size: torem(16px);
        color: #76eefb;
        // padding-right: torem(5px);
        position: relative;
        font-family: DINENGSCHRIFTSTD;
      }
      .item-number {
        // font-weight: bold;
        font-size: torem(30px);
        color: #76eefb;
        letter-spacing: 2px;
        font-family: DINENGSCHRIFTSTD;
      }
      .item-unit {
        color: #76eefb;
        font-size: torem(16px);
        margin-top: torem(10px);
      }
    }
    .overview-type-2 {
      height: 50%;
      display: flex;
      .type-2-item {
        margin: 1px;
        flex: 1;
        display: flex;
      }
      .item-name {
        width: torem(16px);
        font-weight: bold;
        padding: 0 torem(12px);
        display: flex;
        flex-wrap: wrap;
        font-size: torem(16px);
        color: #f9fafa;
        align-items: center;
      }
      .item-desc {
        width: calc(100% - 0.45rem);

        padding-right: torem(5px);
        box-sizing: border-box;
        height: 100%;
        .desc-top {
          display: flex;
          align-items: center;
          padding: torem(10px) 0;
          height: 50%;
          box-sizing: border-box;
        }
        .desc-bottom {
          padding: torem(10px) 0;
          display: flex;
          align-items: center;
          height: 50%;
          box-sizing: border-box;
        }
        .desc-number {
          font-size: torem(28px);
          color: #76eefb;
          font-family: DINENGSCHRIFTSTD;
        }
        .desc-unit {
          font-size: torem(16px);
          color: #76eefb;
          margin-top: torem(5px);
          margin-left: torem(5px);
        }
        .desc-up-number {
          font-size: torem(18px);
          color: #76eefb;
          max-width: 48%;
          padding-right: torem(8px);
          position: relative;
          font-family: DINENGSCHRIFTSTD;
        }
        .desc-up {
          font-size: torem(18px);
          color: #76eefb;
          position: relative;
          font-family: DINENGSCHRIFTSTD;
        }
      }
    }
  }
}
</style>
