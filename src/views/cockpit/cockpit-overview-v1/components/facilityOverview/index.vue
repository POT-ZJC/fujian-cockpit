<template>
  <div class="facility-overview">
    <div
      class="overview-item"
      v-for="(item, index) in dataList"
      :key="index"
      @click="activeType(item.name)"
      :class="{ 'item-active': item.name === activeName}"
    >
      <svg
        @click.stop="linkToUrl(item.url)"
        t="1617779478605"
        class="link-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3554"
        width="32"
        height="32"
      >
        <path
          d="M66.953846 571.076923h653.784616a19.692308 19.692308 0 0 1 13.784615 33.476923l-189.046154 189.046154a28.553846 28.553846 0 0 0 0 41.353846l43.323077 43.323077a28.553846 28.553846 0 0 0 41.353846 0l344.615385-346.584615a28.553846 28.553846 0 0 0 0-41.353846L630.153846 145.723077a28.553846 28.553846 0 0 0-41.353846 0L547.446154 187.076923a28.553846 28.553846 0 0 0 0 41.353846l189.046154 189.046154a20.913231 20.913231 0 0 1-13.784616 35.446154H68.923077a28.593231 28.593231 0 0 0-29.538462 27.569231v59.076923a30.444308 30.444308 0 0 0 27.569231 31.507692z"
          fill="#6ff5fe"
          p-id="3555"
        ></path>
      </svg>
      <div class="item-icon"><img :src="iconObj[item.name]" alt="" /></div>
      <div class="item-name">{{ item.name }}</div>
      <div class="item-number">
        <span class="number-value">{{ currentLevelData[item.name] }}</span>
        <span class="number-unit">{{ item.unit }}</span>
      </div>
      <div class="item-divide-line"></div>
      <div class="item-year">
        年<span class="year-number up-arrow">15</span>
        <span class="year-percent up-arrow">5%</span>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from "./img/路面.png";
import icon2 from "./img/桥梁.png";
import icon3 from "./img/隧道.png";
import icon4 from "./img/边坡.png";
import icon5 from "./img/涵洞.png";
import icon6 from "./img/机电.png";
import { demoData } from "./设施统计总览";
import {mutationsSet,store}  from '@/views/cockpit/cockpitStore'
export default {
  data() {
    return {
      iconObj: {
        路面: icon1,
        桥梁: icon2,
        隧道: icon3,
        边坡: icon4,
        涵洞: icon5,
        机电: icon6,
      },
      currentLevelData: {},
      activeName:'',
      dataList: [
        {
          name: "路面",
          unit: "km",
        },
        {
          name: "桥梁",
          unit: "座",
          url: "/cockpit-bridge",
        },
        {
          name: "隧道",
          unit: "座",
        },
        {
          name: "边坡",
          unit: "处",
        },
        {
          name: "涵洞",
          unit: "个",
        },
        {
          name: "机电",
          unit: "个",
        },
      ],
    };
  },
  mounted() {
    this.handleDemoData();
  },
  methods: {
    activeType(type){ 
      mutationsSet('overviewActiveType',type)
      this.activeName=type
    },
    linkToUrl(url) {
      if (url) {
        // this.$router.push(url);store.areaModel=currentAreaLevelValue  store.areaLevel=currentAreaLevelType
        const areaModel=store.currentAreaLevelValue
        const areaLevel=store.currentAreaLevelType
        window.open(`#${url}?areaModel=${areaModel}&areaLevel=${areaLevel}`)
      }
    },
    handleDemoData(levelValue) {
      const obj = demoData[levelValue || "福建省"] || {};
      this.currentLevelData = { ...obj };
    },
  },
};
</script>

<style lang="scss" scoped>
.facility-overview {
  position: relative;
  //   left: -0.05rem;
  //   top: -0.05rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  // width: 142px;
  // 	height: 210px;
}
.item-active {
  position: relative;
  background-image: linear-gradient(
      -1deg,
      #071019 0%,
      #04233e 50%,
      #00396a 100%
    ),
    linear-gradient(#022243, #022243);
  &::before {
    content: "";
    position: absolute;
    top: torem(4px);
    left: 0;
    width: calc(100% - 2px);
    height: torem(10px);
    height: torem(11px);
    background-repeat: no-repeat;
    background-image: linear-gradient(135deg, #0085f7 50%, rgba(0, 0, 0, 0) 50%),
      //右上角
        linear-gradient(-135deg, #0085f7 50%, rgba(0, 0, 0, 0) 50%);
    background-size: torem(10px) torem(10px), torem(10px) torem(10px);
    background-position: 2px 0, 100% 0;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: torem(4px);
    left: 0;
    width: calc(100% - 2px);
    height: torem(10px);
    height: torem(11px);
    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, #0085f7 50%, rgba(0, 0, 0, 0) 50%),
      //右上角
        linear-gradient(-45deg, #0085f7 50%, rgba(0, 0, 0, 0) 50%);
    background-size: torem(10px) torem(10px), torem(10px) torem(10px);
    background-position: 2px 0, 100% 0;
  }
}
.overview-item {
  width: calc(50% - 0.05rem);
  height: calc(33.3% - 0.05rem);
  box-sizing: border-box;
  margin-top: 0.05rem;
  margin-left: 0.05rem;
  cursor: pointer;
  background-color: #00152a;
  border-radius: torem(4px);
  //   border: solid 1px #396078;
  box-shadow: inset 0px 0px torem(12px) 0px rgba(255, 255, 255, 0.3);
  position: relative;
  &:hover {
    background-image: linear-gradient(
        -1deg,
        #071019 0%,
        #04233e 50%,
        #00396a 100%
      ),
      linear-gradient(#022243, #022243);
  }
  .link-icon {
    position: absolute;
    cursor: pointer;
    top: torem(5px);
    right: torem(10px);
    width: torem(26px);
    height: torem(18px);
    &:hover {
      width: torem(32px);
      height: torem(22px);
    }
  }
  .item-icon {
    height: torem(44px);
    margin-top: 17%; //
    text-align: center;
    img {
      height: torem(54px);
      position: relative;
      left: 0.04rem;
    }
  }
  .item-name {
    text-align: center;
    margin-top: 9%; //26px
    font-size: torem(18px);
    font-weight: bold;
    color: #ffffff;
    // box-shadow: 3px 7px 12px 1px rgba(0, 0, 0, 0.44);
    background: linear-gradient(
      to bottom,
      #ffffff 60%,
      #666666 100%
    ); //    #c1c1c1 90%,
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }
  .item-number {
    margin-top: 4.7%; //10px/210px
    display: flex;
    justify-content: center;
    align-items: center;
    height: torem(27px);
    .number-value {
      position: relative;
      left: torem(6px);
      font-family: DINENGSCHRIFTSTD;
      font-size: torem(36px);
      color: #ffffff;
      background: linear-gradient(to bottom, #ffffff 40%, #666666 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    .number-unit {
      position: relative;
      left: torem(10px);
      align-self: flex-end;
      color: #ffffff;
      font-size: torem(12px);
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
  .item-divide-line {
    position: relative;
    margin: torem(10px);
    height: 2px;
    background-color: #144576;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 50%;
      width: 5px;
      height: 2px;
      background-color: #4376a9;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 5px;
      height: 2px;
      background-color: #4376a9;
    }
  }
  .item-year {
    color: #76e3e1;
    font-size: torem(12px);
    text-align: center;
  }
  .year-number {
    position: relative;
    margin-left: 3px;
    font-family: DINENGSCHRIFTSTD;
    font-size: torem(16px);
    padding-right: 0.08rem;
  }
  .year-percent {
    position: relative;
    margin-left: 3px;
    font-family: DINENGSCHRIFTSTD;
    font-size: torem(16px);
    padding-right: 0.08rem;
  }
  .up-arrow {
    &::after {
      content: "↑";
      position: absolute;
      right: 0;
      top: 0;
      font-size: torem(14px);
    }
  }
}
</style>
