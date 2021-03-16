<template>
  <div class="bridge-overviewbox">
    <div
      class="bridge-total common-wrapper"
      :class="{ active: bridgeIsAllActive }"
      @click="setAll()"
    >
      <div class="total-title">桥梁座数</div>
      <div class="total-number">{{ bridegTotal }}</div>
      <div class="total-year-up">
        <div class="year-txt">年</div>
        <div class="year-up-number">{{numToFixed(bridegTotal*0.01,0)}}</div>
        <div class="year-up">1%</div>
      </div>
    </div>
    <div class="overview-right">
      <div class="overview-type-1">
        <div
          class="type-1-item common-wrapper"
          :class="{ active: item.active }"
          v-for="(item, index) in bridgeScaleTotal"
          @click="setType1Active(item, index)"
          :key="index"
        >
          <div class="item-top">
            <div class="item-name">{{ item.title }}</div>
            <div class="item-up-number">
              {{ numToFixed(item.number * 0.01, 0) }}
            </div>
            <div class="item-up">{{ item.proportion }}</div>
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
          :class="{ active: item.active }"
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
                {{ numToFixed(item.number * 0.01, 0) }}
              </div>
              <div class="desc-up">{{ item.proportion }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import radar from "../charts/radar";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import moduleWrapper from "@/views/cockpit-version-1/components/ui/module-wrapper";

export default {
  components: { radar, moduleWrapper },
  computed: {
    // bridgeIsAllActive() {

    // },
    currentAreaLevelValue() {
      this.bridegTotal = 0;
      return store.currentAreaLevelValue;
    },
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
      handler(data) {
        // console.log("bridgeScaleTotal", val);
        let total = 0;
        data.forEach((val) => (total += Number(val.number)));
        this.bridegTotal = total;
        // this.$nextTick(() => {
        // this.$refs["bridgeScaleTotalRadar"].setEcharts();
        // });
      },
      deep: true,
    },
    bridgeTypeTotal: {
      handler(data) {
        // let total = 0;
        // data.forEach((val) => (total += Number(val.number)));
        // this.bridegTotal += total;
        // // this.$nextTick(() => {
        // // this.$refs["bridgeTypeTotalRadar"].setEcharts();
        // // });
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
      bridgeIsAllActive: true,
    };
  },
  methods: {
    numToFixed(a, b) {
      return window.numToFixed(a, b);
    },
    computedIsAll() {
      for (let i = 0; i < this.bridgeScaleTotal.length; i++) {
        if (this.bridgeScaleTotal[i].active) {
          this.bridgeIsAllActive = false;
          return;
        }
      }
      for (let i = 0; i < this.bridgeTypeTotal.length; i++) {
        if (this.bridgeTypeTotal[i].active) {
          this.bridgeIsAllActive = false;
          return;
        }
      }
      this.bridgeIsAllActive = true;
    },
    setAll() {
      this.bridgeIsAllActive = true;
      const arr1 = this.bridgeScaleTotal;
      const arr2 = this.bridgeTypeTotal;
      arr1.forEach((val) => (val.active = false));
      arr2.forEach((val) => (val.active = false));
      mutationsSet("bridgeScaleTotal", arr1);
      mutationsSet("bridgeTypeTotal", arr2);
    },
    // 规模=type1
    setType1Active(data, index) {
      this.bridgeIsAllActive = false;
      const { title, active } = data;
      const arr = this.bridgeScaleTotal;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
          arr[i].active = !active;
          break;
        }
      }

      mutationsSet("bridgeScaleTotal", arr);
      this.computedIsAll();
      // mutationsSet("bridgeTypeTotal", res.data.bridgeTypeData);
    },
    //形式
    setType2Active(data, index) {
      this.bridgeIsAllActive = false;
      const { title, active } = data;
      const arr = this.bridgeTypeTotal;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
          arr[i].active = !active;
          break;
        }
      }

      mutationsSet("bridgeTypeTotal", arr);
      this.computedIsAll();
      // mutationsSet("bridgeTypeTotal", res.data.bridgeTypeData);
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
    font-family: DINEngschriftStd;
    .total-title {
      font-family: MicrosoftYaHei-Bold;
      font-size: torem(20px);
      color: #f9fafa;
      font-weight: bold;
      margin-top: torem(23px);
      text-align: center;
    }
    .total-number {
      font-size: torem(26px);
      color: #76eefb;
      height: torem(32px);
      text-align: center;
      margin: torem(16px) 0;
      line-height: torem(32px);
    }

    .total-year-up {
      height: torem(16px);
      display: flex;
      justify-content: center;
      align-items: center;
      .year-txt {
        font-family: MicrosoftYaHei-Bold;
        font-size: torem(14px);
        color: #f9fafa;
      }
      .year-up-number {
        font-size: torem(16px);
        color: #76eefb;
        padding-right: torem(3px);
      }
      .year-up {
        font-size: torem(16px);
        color: #76eefb;
        position: relative;
        &::after {
          content: "↑";
          color: red;
          right: torem(-10px);
          top: torem(-3px);
          font-weight: bold;
          position: absolute;
          font-family: MicrosoftYaHei-Bold;
          font-size: torem(18px);
        }
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
        padding: 0 torem(15px);
        font-family: DINEngschriftStd;
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
        font-size: torem(18px);
        color: #f9fafa;
        font-family: MicrosoftYaHei-Bold;
        padding-right: torem(12px);
        font-weight: bold;
      }
      .item-up-number {
        font-size: torem(18px);
        padding-right: torem(8px);
        color: #76eefb;
      }
      .item-up {
        font-size: torem(16px);
        color: #76eefb;
        padding-right: torem(5px);
        position: relative;
        &::after {
          content: "↑";
          color: red;
          right: torem(0px);
          top: torem(-2px);
          font-weight: bold;
          position: absolute;
          font-family: MicrosoftYaHei-Bold;
          font-size: torem(18px);
        }
      }
      .item-number {
        // font-weight: bold;
        font-size: torem(33px);
        color: #76eefb;
        letter-spacing: 3px;
      }
      .item-unit {
        color: #76eefb;
        font-size: torem(16px);
        margin-top: torem(10px);
        font-family: MicrosoftYaHei-Bold;
      }
    }
    .overview-type-2 {
      height: 50%;
      display: flex;
      .type-2-item {
        margin: 1px;
        flex: 1;
        display: flex;
        font-family: DINEngschriftStd;
      }
      .item-name {
        width: torem(16px);
        font-weight: bold;
        padding: 0 torem(15px);
        display: flex;
        flex-wrap: wrap;
        font-family: MicrosoftYaHei-Bold;
        font-size: torem(18px);
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
        }
        .desc-up {
          font-size: torem(18px);
          color: #76eefb;
          position: relative;
          &::after {
            content: "↑";
            color: red;
            right: torem(-10px);
            top: torem(-3px);
            font-weight: bold;
            position: absolute;
            font-family: MicrosoftYaHei-Bold;
            font-size: torem(18px);
          }
        }
      }
    }
  }
}
</style>
