<template>
  <div class=" pr" style="width:100%;height:100%">
    <div id="container" class="container" style="width:100%;height:100%"></div>

    <!-- 区域公司/养护中心/养护站 -->
    <div class="area-level-count">
      <div class="area-level-item" v-if="showLevel.compnayTotal">
        <div class="name">区域公司</div>
        <div class="count">{{ mapLBNumber.compnayTotal }}个</div>
      </div>
      <div class="area-level-item" v-if="showLevel.centerTotal">
        <div class="name">养护中心</div>
        <div class="count">{{ mapLBNumber.centerTotal }}个</div>
      </div>
      <div class="area-level-item" v-if="showLevel.stationTotal">
        <div class="name">养护站</div>
        <div class="count">{{ mapLBNumber.stationTotal }}个</div>
      </div>
    </div>
    <!-- 路线路段标识 -->
    <div class="map-line-tips">
      <div class="line-tips-route">
        <div class="route">路线</div>
        <div class="route-totalNum">{{ mapLBNumber.currentRouteTotalNum }}条</div>
      </div>
      <div class="line-tips-road">
        <div class="road">路段</div>
        <div class="road-totalNum">{{ mapLBNumber.currentRoadTotalNum }}条</div>
      </div>
    </div>

    <!-- 桥梁详情 -->
    <div class="marker-detail" v-show="isOpenBridgeDetail">
      <div class="detail-header">
        <div class="header-title">桥梁管理</div>
        <i class="el-icon-circle-close" @click="isOpenBridgeDetail = false" />
      </div>
      <div class="detail-body">
        <div class="body-left">
          <el-carousel
            :interval="5000"
            class="img"
            v-show="bridgeCompPhotoList.length > 0"
          >
            <el-carousel-item
              v-for="item in bridgeCompPhotoList"
              :key="item"
              class="img"
            >
              <!-- v-show="bridgeCompPhotoList.length > 0" -->
              <img class="img" :src="item" alt="桥梁图片" />
            </el-carousel-item>
          </el-carousel>
          <!-- <el-image
            v-show="bridgeCompPhotoList.length > 0"
            class="img"
            :src="item"
            :preview-src-list="bridgeCompPhotoList[0]"
          >
          </el-image> -->
          <p v-show="bridgeCompPhotoList.length < 1">暂无桥梁图片</p>
          <!-- <img :src="bridgeDetail.imgUrl" alt="桥梁图片" /> -->
        </div>
        <div class="body-right">
          <div class="right-title">{{ bridgeDetail.bridgeName }}</div>

          <div class="item-block" v-for="item in detailFormat" :key="item.key">
            <div class="item-label">{{ item.name + "：" }}</div>
            <div class="item-content" :title="bridgeDetail[item.key] || '-'">
              {{ bridgeDetail[item.key] || "-" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 桥梁详情结束 -->
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
import { getRouteLnglatList, getQueryBridge } from "@/api/cockpit-version-1";
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import moment from "moment";
import bridge1 from "./img/map-bridge-1.jpg";
import bridge2 from "./img/map-bridge-2.jpg";
import poi_type_1 from "./img/poi-type-1.svg";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    //   currentAreaLevelType:'',//当前区域/路线层级类型
    // currentAreaLevelTypeName:'',//当前区域/路线层级类型名称
    // currentAreaLevelValue:'',//当前区域/路线层级的值
    // searchMapKeyword:'',//搜索地图关键字
    mapLBNumber() {
      return {
        currentRouteTotalNum: store.currentRouteTotalNum, //当前路线总数
        currentRoadTotalNum: store.currentRouteTotalNum, //当前路段总数
        compnayTotal: store.compnayTotal, //区域公司总数
        centerTotal: store.centerTotal, //养护中心总数
        stationTotal: store.stationTotal, //养护站总数
      };
    },
    //当前层级类型
    currentAreaLevelType() {
      return store.currentAreaLevelType;
    },
    currentAreaLevelValue() {
      return store.currentAreaLevelValue;
    },
    // 搜多地图关键字
    searchMapKeyword() {
      return store.searchMapKeyword;
    },

    routeLnglatList() {
      return store.routeLnglatList;
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
      handler(val) {
        this.reqBridgeListByParam();
      },
      deep: true,
    },
    bridgeTypeTotal: {
      handler(val) {
        this.reqBridgeListByParam();
      },
      deep: true,
    },

    // id(val) {
    //   this.$nextTick(() => {
    //     this.loopPlayMarkers();
    //   });
    // },
    searchMapKeyword(val) {
      this.reqBridgeListByParam();
    },
    currentAreaLevelType(val) {
      // this.reqBridgeListByParam();
      this.handleShowLevel(val);
    },
    currentAreaLevelValue(val) {
      this.reqBridgeListByParam();
    },
    routeLnglatList() {},
  },
  data() {
    return {
      myAmap: null,
      markers: [],
      bridgeDetail: {}, //桥梁详情
      bridgeCompPhotoList: [bridge1, bridge2],
      isOpenBridgeDetail: false,
      //桥梁详情-格式
      detailFormat: [
        { name: "中心桩号", key: "centerLocation" },
        { name: "桥梁全长(m)", key: "bridgeLength" },
        { name: "桥梁跨径组合(孔*米)", key: "combination" },
        { name: "桥梁属性", key: "bridgeType" },
        { name: "上部结构类型", key: "structureType" },
        { name: "通车时间", key: "startRunCarDate" },
        { name: "技术状况评定", key: "level" },
        { name: "养护单位", key: "curingUnit" },
        { name: "管理单位", key: "managerUnit" },
      ],
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
      showLevel: {
        currentRouteTotalNum: false, //当前路线
        currentRoadTotalNum: false, //当前路段
        compnayTotal: false, //区域公司
        centerTotal: false, //养护中心
        stationTotal: false, //养护站
      },
    };
  },
  mounted() {
    this.initMap();
    // this.reqBridgeListByParam();
    this.handleShowLevel()
  },
  methods: {
    handleShowLevel(str) {
      let showLevel = {
        currentRouteTotalNum: true, //当前路线
        currentRoadTotalNum: true, //当前路段
        compnayTotal: true, //区域公司
        centerTotal: true, //养护中心
        stationTotal: true, //养护站
      };
      switch (str) {
        case "company":
          // showLevel.currentRouteTotalNum = false;
          showLevel.currentRoadTotalNum = false;
          break;
        case "centerTotal":
          showLevel.company = false;
          showLevel.centerTotal = false;
          break;
        case "stationTotal":
          showLevel.company = false;
          showLevel.centerTotal = false;
          showLevel.stationTotal = false;
          break; 
        default:
          null;
      }
      this.showLevel=showLevel
    },
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
      // // 给国家的省市区域添加背景色
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
              return "#042E4F"; //042E4F-122246
            }
          },
        },
      });
      disCountryLayer.setMap(myAmap);
      //给福建省添加背景色
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
      this.reqBridgeListByParam();
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
    //处理地图上需要展示的桥梁规模和形式
    handleMapBridgeType() {
      const bridgeScaleTotal = this.bridgeScaleTotal,
        bridgeTypeTotal = this.bridgeTypeTotal;
      let bridgeSize = "", //规模
        structureType = ""; //形式
      bridgeScaleTotal.forEach((val, index) => {
        if (val.active) {
          bridgeSize += (bridgeSize ? "," : "") + val.title;
        }
      });
      bridgeTypeTotal.forEach((val, index) => {
        if (val.active) {
          structureType += (structureType ? "," : "") + val.title;
        }
      });
      return { structureType, bridgeSize };
    },
    //查询桥梁
    reqBridgeListByParam() {
      //currentAreaLevelType

      // "bridgeId": "桥梁id"
      // "bridgeName": "桥梁名称"
      // "company": "区域公司"
      // "maintenanceCenter": "养护中心"
      // "maintenanceStation": "养护站"
      // "routeName": "路线名称"
      // "sectionName": "路段名称"
      // "bridgeSize": "桥梁类型（大桥、小桥），多个用,切割"
      // "structureType": "桥梁结构（拱桥、刚构桥），多个用,切割"

      let queryData = {
        bridgeName: this.searchMapKeyword,
        ...this.handleMapBridgeType(),
      };

      this.currentAreaLevelType &&
        (queryData[this.currentAreaLevelType] = this.currentAreaLevelValue);
      //桥梁搜索
      // getQueryBridge({
      //   bridgeName: "", //关键词
      //   bridgeId: "", //桥梁id
      // }).then(res=>{

      // })

      getQueryBridge(queryData).then((res) => {
        console.log(res);
        const { data } = res;
        // this.myAmapBridgeList = this.bridgeData_filter(data);
        this.updateMapPoi(data);
      });
    },
    // 桥梁数据过滤-去掉没有坐标点的数据
    bridgeData_filter(list) {
      let arr = [];
      list.forEach((item) => {
        const { bridgeId, technologyLevel } = item;
        const index = this.bridgeList_demo.findIndex(
          (a) => a.bridgeId === bridgeId
        );
        if (index !== -1) {
          const data = {
            ...this.bridgeList_demo[index],
            technologyLevel,
          };
          arr.push(data);
        }
      });
      return arr;
    },
    //更新地图点标记
    updateMapPoi(poiArr) {
      // this.myAmap.remove(this.markers_Arr);
      // console
      this.markers_Arr.forEach((val) => val.setMap(null));
      // this.myAmap.clearMap();
      let markers = [];
      poiArr.forEach((data) => {
        let icon = poi_type_1;
        // poi_type_1
        // switch (data.technologyLevel) {
        //   case "1类":
        //     icon = poi_type_1;
        //     break;
        //   case "2类":
        //     icon = poi_type_2;
        //     break;

        //   case "3类":
        //     icon = poi_type_3;
        //     break;
        //   case "4类":
        //     icon = poi_type_4;
        //     break;
        //   case "5类":
        //     icon = poi_type_5;
        //     break;
        //   default:
        //     break;
        // }
        if (data.latitudeLongitude) {
          const addr = data.latitudeLongitude.split(",");
          // console.log("addr", addr);
          let temp = new AMap.Marker({
            map: this.myAmap,
            name: data.bridgeName,
            icon: new AMap.Icon({
              image: icon,
              // size: new AMap.Size(22, 22), //图标大小
              imageSize: new AMap.Size(26, 26),
            }),
            position: [addr[0], addr[1]],
            offset: new AMap.Pixel(-13, -13),
            // content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
            direction: "right", // 设置文本标注方位
          });
          // temp.on("mouseover", (e) => {
          //   this.openPoiLabel(temp);
          // });
          // temp.on("mouseout", (e) => {
          //   temp.setLabel(null);
          // });
          temp.on("click", (e) => {
            console.log(e);
            this.openPoiDetail(data);
          });
          temp.name = data.bridgeName;
          markers.push(temp);
        }
      });
      this.markers_Arr = markers;
    },

    //打开地图点标记桥梁详情
    openPoiDetail(data) {
      const newData = {
        ...data,
        startRunCarDate: moment(Number(data.startRunCarDate)).format(
          "yyyy-MM-DD"
        ),
      };
      this.bridgeDetail = newData;
      this.isOpenBridgeDetail = true;
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
/*地图点位详情弹框*/
.marker-detail {
  position: absolute;
  z-index: 112;
  top: torem(200px);
  left: torem(100px);
  // background-image: url("~./img/tip-bg.svg");
  background: linear-gradient(to bottom, #003639 4%, #001d29 89%);
  //   padding: 15px 15px 10px 10px;
  box-shadow: 0 torem(10px) torem(30px) 0 #12334b inset;
  width: torem(690px);
  height: torem(510px);

  .detail-header {
    display: flex;
    justify-content: space-between;
    height: torem(60px);
    padding: 0 torem(20px);
    align-items: center;
    .header-title {
      height: torem(22px);
      font-size: torem(16px);
      font-weight: 700;
      color: #04caf0;
      position: relative;
      padding-left: torem(10px);
      &::after {
        content: "";
        height: 80%;
        position: absolute;
        top: 10%;
        left: 0;
        width: 2px; /*no */
        background: #04caf0;
      }
    }
    .el-icon-circle-close {
      color: #fff;
      font-size: torem(22px);
      cursor: pointer;
    }
  }
  .detail-body {
    border-top: 1px solid #284d6a; /*no */
    margin: 0 torem(20px);
    padding: torem(20px) torem(5px);
    display: flex;

    .body-left {
      width: torem(290px);
      height: torem(396px);
      flex-shrink: 0;
      /deep/.el-carousel__container {
        height: 100%;
      }
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .body-right {
      width: calc(100% - 2.9rem);
      padding-left: (20px);
      .right-title {
        margin: torem(17px) 0 torem(30px) 0;
        font-size: torem(18px);
        font-weight: 700;
        color: #ffffff;
        line-height: (24px);
        letter-spacing: 1px; /*no */
      }
      .item-block {
        margin: 0;
      }
      .item-label {
        width: auto;
        text-align: left;
      }
      .item-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
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
