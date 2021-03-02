<template>
  <div class=" pr" style="width:100%;height:100%">
    <div id="container" class="container" style="width:100%;height:100%"></div>
   
    <!-- 区域公司/养护中心/养护站 -->
    <div class="area-level-count">
      <div class="area-level-item">
        <div class="name">区域公司</div>
        <div class="count">11个</div>
      </div>
      <div class="area-level-item">
        <div class="name">养护中心</div>
        <div class="count">111个</div>
      </div>
      <div class="area-level-item">
        <div class="name">养护站</div>
        <div class="count">13个</div>
      </div>
    </div>
    <!-- 路线路段标识 -->
    <div class="map-line-tips">
      <div class="line-tips-route">
        <div class="route">路线</div>
        <div class="route-totalNum">{{ currentRouteTotalNum }}条</div>
      </div>
      <div class="line-tips-road">
        <div class="road">路段</div>
        <div class="road-totalNum">{{ currentRoadTotalNum }}条</div>
      </div>
    </div>
  </div>
</template>
<script>
// import poi_red from "./img/point-red.png";
// import poi_green from "./img/point-green.png";
// import poi_yellow from "./img/point-yellow.png";
// import tip_bg from "./img/tip-bg.svg";
// import {
// projectNumberByProvince,
// structureNumberByType,
// deviceNumberByType,
// facilityEarlyWarningQuantityStatistics,
// statisticsOfEquipmentLayout,
// todaySWarningStatistics,
// websocketUrl,
// getGis
// } from '@api/home'
import { getRouteLnglatList } from "@/api/cockpit-version-1";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    routeLnglatList() {
      return store.routeLnglatList;
    },
    currentRouteTotalNum() {
      //当前路线总数
      return store.currentRouteTotalNum;
    },
    currentRoadTotalNum() {
      //当前路段总数
      return store.currentRoadTotalNum;
    },
  },
  watch: {
    id(val) {
      this.$nextTick(() => {
        this.loopPlayMarkers();
      });
    },
    routeLnglatList() {},
  },
  data() {
    return {
      myAmap: null,
      poi_Arr: [
        {
          name: "厦门大桥",
          addr: [118.102497, 24.557011],
        },
        {
          name: "厦漳大桥",
          addr: [117.953236, 24.437039],
        },
        {
          name: "泉州湾大桥",
          addr: [118.695328, 24.813429],
        },
        {
          name: "集美大桥",
          addr: [118.133139, 24.566769],
        },
        {
          name: "杏林大桥",
          addr: [118.087691, 24.557753],
        },
      ],
      markers_Arr: [],
      currentMarkerIndex: -1,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    //轮播坐标点
    loopPlayMarkers() {
      if (this.currentMarkerIndex !== -1) {
        this.markers_Arr[this.currentMarkerIndex].setLabel(null); // 关闭当前的点标记，打开下一个点标记
        if (this.currentMarkerIndex >= this.markers_Arr.length - 1) {
          this.currentMarkerIndex = 0;
        } else {
          ++this.currentMarkerIndex;
        }
      } else {
        this.currentMarkerIndex = 0;
      }

      this.openPoiLabel(this.markers_Arr[this.currentMarkerIndex]);
      this.$nextTick(() => {
        setTimeout(() => {
          this.myAmap.setCenter(this.poi_Arr[this.currentMarkerIndex].addr);
        }, 200);
      });
    },
    initMap() {
      // let map = new AMap.Map("container", {
      // 	mapStyle: "amap://styles/1de318cbb8d12c02303a22c550b9ccc9",
      // 	pitch: 0,
      // 	features: ["bg", "road"],
      // 	zoom: 9,
      // 	viewMode: "3D"
      // });

      let myAmap = new AMap.Map("container", {
        mapStyle: "amap://styles/f23ce73fdfa7fc0ba5d749281bc4aa3f",
        viewMode: "3D",
        resizeEnable: true,
        // features: ["bg", "road"],
        center: this.poi_Arr[0].addr,
        zoom: 7.5,
      });
      const scale = new window.AMap.Scale({ position: "RB" });
      const toolBar = new window.AMap.ToolBar({
        position: "RB",
        locate: false, // 定位按钮
        offset: new window.AMap.Pixel(20, 0),
        // ruler:true,//标尺键盘
        // liteStyle:true,//精简模式
        // direction:false,//方向盘
      });
      myAmap.addControl(scale);
      myAmap.addControl(toolBar);
      /*设置云南区域背景色*/
      let areaItemTotal = 0;
      let backColorArr = [
        // "#a2bff3",
        // "#a2a9b6",
        "rgba(162,184,222,0.4)",
        // "#014655",
        // "#016b83",
        // "rgba(76,245,246,0.53)",
      ];
      let getColorByAdcode = function(adcode) {
        ++areaItemTotal;
        const randomNIndex =
          areaItemTotal -
          Math.floor(areaItemTotal / backColorArr.length) * backColorArr.length;

        return backColorArr[randomNIndex];
      };
      // 给国家的省市区域添加背景色
      const disCountryLayer = new window.AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: "CHN",
        depth: 1,
        styles: {
          // 'nation-stroke': '#15fdfe',
          // "coastline-stroke": [0.85, 0.63, 0.94, 1],//海岸线颜色
          // 'province-stroke': '#15fdfe',
          // 'city-stroke': '#15fdfe', // 中国特有字段
          fill: function(props) {
            if (props.adcode === 350000) {
              return "";
            } else {
              return "#3a4758";
            }
          },
        },
      });
      disCountryLayer.setMap(myAmap);
      //350000 =350000福建省
      let disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [350000],
        depth: 1,
        opacity: 0.7,
        styles: {
          // height: [0, 300000],
          // opacity: 0.86
          fill: function(properties, b, c, d) {
            let adcode = properties.adcode;
            return getColorByAdcode();
          },
          "province-stroke": "#d8f7ff",
          "city-stroke": "#d8f7ff", // 中国地级市边界
          // "county-stroke": "#319fb6", // 中国区县边界
        },
      });

      disProvince.setMap(myAmap);
      /*设置区域背景色-结束*/

      this.myAmap = myAmap;
      this.reqRouteLnglatList();
    },
    //获取路线路段坐标
    reqRouteLnglatList() {
      getRouteLnglatList().then((res) => {
        mutationsSet("routeLnglatList", res.data || []);
        this.renderRouteToMap(res.data || []);
      });
    },
    //渲染地图路线
    renderRouteToMap(routeData) {
      let routeLanlat = [];
      routeData = routeData.splice(1, routeData.length / 2 + 70);
      routeData.forEach((val) => {
        routeLanlat.push(
          new window.AMap.LngLat(Number(val.longitude), Number(val.latitude))
        );
      });
      console.log(routeLanlat);

      let mapRouteObj = new window.AMap.Polyline({
        //   //  zIndex:10,//默认10 路线覆盖物层级
        path: routeLanlat,
        borderWeight: 1, // 线条描边宽度，默认为 1
        isOutline: true, //是否描边
        strokeWeight: 4,
        strokeColor: "#E30C9C", // 线条颜色
        lineJoin: "round", // 折线拐点连接处样式
      });

      mapRouteObj.setMap(this.myAmap);
    },

    //渲染地图坐标点
    renderMarkerToMap() {
      /*生成坐标点-开始 */

      // let markers = this.poi_Arr.map((data) => {
      //   let temp = new AMap.Marker({
      //     map: myAmap,
      //     name: data.name,
      //     icon: poi_red,
      //     position: [data.addr[0], data.addr[1]],
      //     offset: new AMap.Pixel(-20, -30),
      //     // content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
      //     direction: "right", // 设置文本标注方位
      //   });
      //   temp.on("mouseover", (e) => {
      //     this.openPoiLabel(temp);
      //   });
      //   temp.on("mouseout", (e) => {
      //     // temp.setLabel(null);
      //   });
      //   temp.on("click", (e) => {
      //     temp.setLabel(null);
      //     return null;
      //     // _this.$router.push({
      //     //   path: "/monitorView/structure",
      //     //   query: {
      //     //     id: marker.weather.id,
      //     //   },
      //     // });
      //   });
      //   temp.name = data.name;
      //   return temp;
      // });
      // this.markers_Arr = markers;
      console.log(markers);
      /*设置坐标点-结束 */
    },
    openPoiLabel(temp) {
      temp.setLabel({
        offset: new AMap.Pixel(153, -28), // 设置文本标注偏移量
        // <p>${setIcon}项目状态：${status}</p>
        // style ="color: ${color}"
        content: `
				<div  class="poi-content" >
				<div  class="poi-titel" >${temp.name}</div>
				<div class="txt">发布了任务单详情</div>
				<div class="link">查看详情>></div>
				</div> 
				<div class="map-poi-line-1" ></div>
				<div class="map-poi-line-2" ></div>
												`, // 设置文本标注内容
        direction: "right", // 设置文本标注方位
      });
    },
  },
};
</script>
<style lang="scss" scoped>

// 地图-区域个层级单位数量
.area-level-count {
  position: absolute;
  left: torem(15px);
  bottom: torem(80px);
  .area-level-item {
    display: flex;
    align-items: center;
    height: 32px;
    .name {
      color: #eac922;
      font-size: 16px;
      font-weight: bold;
      width: 70px;
    }
    .count {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }
}
// 地图线覆盖物-提示
.map-line-tips {
  position: absolute;
  left: torem(15px);
  // right: 0;
  bottom: torem(30px);
  display: flex;
  justify-content: center;
  .line-tips-route {
    display: flex;
    // margin-left: torem(30px);
    padding: 0 torem(10px);
    .route {
      cursor: pointer;
      font-size: torem(16px);
      font-weight: bold;
      color: #fff;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 140%;
        height: torem(5px);
        bottom: -2px;
        left: -20%;
        background-color: #e30c9c;
      }
    }
    .route-totalNum {
      margin-left: torem(10px);
      font-size: (18px);
      font-weight: bold;
      color: #fff;
    }
  }
  .line-tips-road {
    display: flex;
    // margin-left: torem(30px);
    padding: 0 torem(10px);
    .road {
      cursor: pointer;
      font-size: torem(16px);
      font-weight: bold;
      color: #fff;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 140%;
        height: torem(5px);
        bottom: -2px;
        left: -20%;
        background: linear-gradient(
          to right,
          #e30c0c 0%,
          #eabe0a 25%,
          #0aea0f 50%,
          #0acbea 75%,
          #3b0aea 100%
        );
      }
    }
    .road-totalNum {
      margin-left: torem(10px);
      font-size: (18px);
      font-weight: bold;
      color: #fff;
    }
  }
}
/deep/ .amap-marker-label {
  background-image: url("~./img/tip-bg.svg");
  background-color: rgba(255, 255, 255, 0);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  //   padding: 15px 15px 10px 10px;
  width: 198px; /*no */
  height: 138px; /*no */
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  position: relative;
  cursor: pointer;
  .map-poi-line-1 {
    position: absolute;
    width: 100px; /*no */
    height: 1px; /*no */
    background: red;
    top: 123px; /*no */
    z-index: 1111;
    left: -186px; /*no */
  }
  .map-poi-line-2 {
    position: absolute;
    width: 150px; /*no */
    height: 1px; /*no */
    background: red;
    top: 71px; /*no */
    z-index: 1111;
    left: -110px; /*no */
    transform: rotate(-45deg);
  }
  .poi-content {
    padding: 30px; /*no */
  }
  .poi-titel {
    height: 30px; /*no */
    font-size: 18px; /*no */
    font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
    font-weight: 700;
    text-align: left;
    line-height: 24px; /*no */
    letter-spacing: 1px; /*no */
    color: #fb5a7a;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .txt {
    height: 19px; /*no */
    font-size: 16px; /*no */
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #eeeeee;
    line-height: 19px; /*no */
    letter-spacing: 1px; /*no */
  }
  .link {
    margin-top: 16px; /*no */
    height: 15px; /*no */
    font-size: 12px; /*no */
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #00ffde;
    line-height: 14px; /*no */
    letter-spacing: 1px; /*no */
  }
  svg {
    width: 16px; /*no */
    height: 16px; /*no */
    margin-right: 5px; /*no */
    vertical-align: bottom;
  }
}
</style>
<style lang="scss">
.amap-info-content.amap-info-outer {
  background-color: #27272b;
  color: #f0f2ff;
  width: 100px;
}
/* 地图缩放条 */
.amap-zoom-ruler {
  height: tovh(100px);
}
/* 地图比例尺 */
.amap-scalecontrol {
  color: #fff;
  margin-right: torem(70px);
}
.amap-info-close {
  color: #606166;
}
.amap-logo {
  display: none !important;
}
.amap-copyright {
  opacity: 0;
}
</style>
