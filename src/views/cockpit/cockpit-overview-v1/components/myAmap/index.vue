<template>
  <div class=" pr" style="width:100%;height:100%">
    <div id="container" class="container" style="width:100%;height:100%;"></div>
    <!-- 路线路段标识 -->
    <div class="level-count-show level-routeLine">
      <div class="level-item">
        <img class="icon" src="./img/路线.png" alt="" />
        <div class="count">{{ mapLBNumber.currentRouteTotalNum }}条</div>
        <div class="name">
          路线
        </div>
      </div>
      <div class="level-item">
        <img class="icon" src="./img/路段.png" alt="" />
        <div class="count">{{ mapLBNumber.currentRoadTotalNum }}条</div>
        <div class="name">路段</div>
      </div>
    </div>
    <!-- 区域公司/养护中心/养护站 -->
    <div class="level-count-show level-area">
      <div class="level-item" v-if="showLevel.compnayTotal">
        <img class="icon" src="./img/区域公司.png" alt="" />
        <div class="count">{{ mapLBNumber.compnayTotal }}个</div>
        <div class="name">区域公司</div>
      </div>
      <div class="level-item" v-if="showLevel.centerTotal">
        <img class="icon" src="./img/养护中心.png" alt="" />
        <div class="count">{{ mapLBNumber.centerTotal }}个</div>
        <div class="name">养护中心</div>
      </div>
      <div class="level-item" v-if="showLevel.stationTotal">
        <img class="icon" src="./img/养护站.png" alt="" />
        <div class="count">{{ mapLBNumber.stationTotal }}个</div>
        <div class="name">养护站</div>
      </div>
    </div>

    <!-- 桥梁图例颜色 -->
    <div class="bridge-legend" v-show="overviewActiveType === '桥梁'">
      <div
        class="legend-item"
        style=""
        v-for="(item, index) in bridgeLegend"
        :key="index"
      >
        <div class="legend-dot" :style="''">
          <!-- <svg
            t="1615976296444"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4697"
            width="32"
            height="32"
          >
            <path
              d="M712.341 246.982a278.637 278.637 0 0 0-400.682 0c-110.496 114.278-110.496 295.585 0 409.866L512.001 862 712.34 656.848c110.497-114.281 110.497-295.588 0.001-409.866z"
              :fill="`${item.color}`"
              p-id="4698"
            ></path>
          </svg> -->
          <img :src="item.icon" alt="" class="icon" />
        </div>
        {{ item.name }}
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
          <div class="link-sys">
            <div
              class="link-btn"
              v-if="handleXiaZhang(bridgeDetail.bridgeName)"
              @click="
                openNewUrl(
                  'http://120.32.125.113:9010/BMS/common/menu?prjId=EA063603FE7D4315B7D7E3BAE88BE0B6'
                )
              "
            >
              <svg
                t="1616464473366"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2883"
                width="32"
                height="32"
              >
                <path
                  d="M192 344.64H128V192a96 96 0 0 1 96-96h608a96 96 0 0 1 96 96v640a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96v-126.272h64V832a32 32 0 0 0 32 32h608a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H224a32 32 0 0 0-32 32v152.64z"
                  p-id="2884"
                  fill="#ffffff"
                ></path>
                <path
                  d="M538.688 410.848a32 32 0 1 1 39.808-50.112l148.32 117.856c23.744 18.848 10.4 57.056-19.904 57.056H72.832a32 32 0 1 1 0-64h542.368l-76.48-60.8z"
                  p-id="2885"
                  fill="#ffffff"
                ></path>
              </svg>
              BIM模型
            </div>
          </div>
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
import { getRouteLnglatList, getQueryBridge } from "@/api/cockpit/bridge";
import {
  // mutationsSet,
  store,
} from "@/views/cockpit/cockpitStore";
import routeLnglatJson from "@/views/cockpit/cockpit-bridge-v1/utils/路线路段.json";
// import { maskDataStr } from "./mapData/fujianMaskLnglat";
// import moment from "moment";
import bridge1 from "./img/map-bridge-1.jpg";
import bridge2 from "./img/map-bridge-2.jpg";
import bridgeAllIcon from "./img/bridge-all.png";
import bridge1Icon from "./img/bridge-1.png";
import bridge2Icon from "./img/bridge-2.png";
import bridge3Icon from "./img/bridge-3.png";
import bridge4Icon from "./img/bridge-4.png";
import bridge5Icon from "./img/bridge-5.png";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    mapLBNumber() {
      return {
        currentRouteTotalNum: store.currentRouteTotalNum, //当前路线总数
        currentRoadTotalNum: store.currentRouteTotalNum, //当前路段总数
        compnayTotal: store.compnayTotal, //区域公司总数
        centerTotal: store.centerTotal, //养护中心总数
        stationTotal: store.stationTotal, //养护站总数
      };
    },
    overviewActiveType() {
      return store.overviewActiveType;
    },
    // currentAreaLevelValue() {
    //   return store.currentAreaLevelValue;
    // },
    // 搜地图关键字
    // searchMapKeyword() {
    //   return store.searchMapKeyword;
    // },

    routeLnglatList() {
      return store.routeLnglatList;
    },
    //桥梁总览激活
    // bridgeOverviewActive() {
    //   return store.bridgeOverviewActive;
    // },
  },
  watch: {
    overviewActiveType(val, oldVal) {
      console.log(val, oldVal);
      if (val === "桥梁") {
        if (this.locaPoiArr.length) {
          this.locaUpdateMapPoi();
        } else {
          this.reqBridgeListByParam();
        }
      } else {
      }
      if (oldVal === "桥梁") {
        this.mapLocaIconLayer && this.mapLocaIconLayer.setMap(null);
      }
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
      // levelIcon:{route:''}
      //桥梁详情-格式
      detailFormat: [
        { name: "中心桩号", key: "centerLocation" },
        { name: "桥梁全长(m)", key: "bridgeLength" },
        { name: "桥梁跨径组合(孔*米)", key: "combination" },
        { name: "桥梁属性", key: "bridgeSize" },
        { name: "上部结构类型", key: "structureType" },
        { name: "通车时间", key: "startRunCarDate" },
        { name: "技术状况评定", key: "level" },
        { name: "养护单位", key: "curingUnit" },
        { name: "管理单位", key: "managerUnit" },
      ],
      bridgeLegend: {
        梁桥: {
          name: "梁桥",
          color: "#78aff2",
          icon: bridge1Icon,
        },
        拱桥: {
          name: "拱桥",
          color: "#d778f2",
          icon: bridge2Icon,
        },
        悬索桥: {
          name: "悬索桥",
          color: "#f2df78",
          icon: bridge3Icon,
        },
        刚构桥: {
          name: "刚构桥",
          color: "#7ef278",
          icon: bridge4Icon,
        },
        组合桥: {
          name: "组合桥",
          color: "#f27878",
          icon: bridge5Icon,
        },
      },
      mapActiveBridge: [],
      markers_Arr: [],
      currentMarkerIndex: -1,
      showLevel: {
        currentRouteTotalNum: false, //当前路线
        currentRoadTotalNum: false, //当前路段
        compnayTotal: false, //区域公司
        centerTotal: false, //养护中心
        stationTotal: false, //养护站
      },
      mapLocaIconLayer: null, //可视化图标图层
      locaPoiArr: [], // 可视化点位数组
    };
  },
  mounted() {
    this.fujianMaskSearch();
    // this.reqBridgeListByParam();
    this.handleShowLevel();
  },
  methods: {
    handleXiaZhang(name) {
      if (name === "厦漳大桥(北汊主桥)") {
        return true;
      }
      return false;
    },
    openNewUrl(url) {
      window.open(url);
    },
    //显示地图左下角层级统计数量
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
      this.showLevel = showLevel;
    },
    //搜索福建的遮罩边界数据
    fujianMaskSearch() {
      //利用行政区查询获取边界构建mask路径
      //调用地图行政查询

      const opts = {
        subdistrict: 0,
        extensions: "all",
        level: "province",
      };
      const district = new AMap.DistrictSearch(opts);
      let bounds = [];
      //搜索福建省的边界坐标
      district.search("福建省", (status, result) => {
        bounds = result.districtList[0].boundaries;
        // console.log("districtRes", bounds);

        //生成福建省的遮掩边界坐标
        var fujianMask = [];
        for (var i = 0; i < bounds.length; i += 1) {
          fujianMask.push([bounds[i]]);
        }
        this.initMap(fujianMask, bounds);
      });
    },
    initMap(maskData, polylineData) {
      let myAmap = new AMap.Map("container", {
        mask: maskData, // [[117.419188,40.61711]]||
        mapStyle: "amap://styles/15f9c7f3522bfe6cd0cd478ca33a7c08", //
        viewMode: "3D",
        resizeEnable: true,
        features: ["bg", "road", "point", "road"], //'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
        center: [117.467878, 25.617525],
        zoom: 7,
      });
      const scale = new window.AMap.Scale({ position: "RB" });
      const toolBar = new window.AMap.ToolBar({
        position: "RB",
        locate: false, // 定位按钮
        offset: new window.AMap.Pixel(20, 0),
        // ruler:true,//标尺键盘
        // liteStyle:true,//精简模式
        direction: false, //方向盘
      });
      myAmap.addControl(scale);
      myAmap.addControl(toolBar);
      /*设置区域背景色*/
      let areaItemTotal = 0;
      let backColorArr = [
        "#012761",
        "#113771",
        // "rgba(162,184,222,0.6)",
        "#355b95",
        // "#014655",
        // "#016b83",
        // "rgba(76,245,246,0.53)",
      ];
      let getColorByAdcode = function(adcode) {
        ++areaItemTotal;
        if (areaItemTotal === backColorArr.length) {
          areaItemTotal = 0;
        }
        // const randomNIndex =
        // areaItemTotal -
        // Math.floor(areaItemTotal / backColorArr.length) * backColorArr.length;
        // return "#023c82";
        return backColorArr[areaItemTotal];
        // return backColorArr[0];
      };

      // maskData.forEach((val,index) => {
      // val = [Number(val[0]), Number(val[1])];
      // val = {
      //   lng:val[0],
      //   lat:val[1]
      // };
      //      const lng=val[0],lat=val[1]
      //      if(index===0){
      //  console.log(lng,lat)
      //      }

      //         // val=new window.AMap.LngLat(Number(lng),Number(lat))
      //         val=new window.AMap.LngLat(lng,lat)
      //       });
      // 添加描边
      for (let i = 0; i < polylineData.length; i += 1) {
        new AMap.Polyline({
          path: polylineData[i],
          strokeColor: "#78aff2",
          strokeWeight: 8,
          map: myAmap,
        });
      }

      // // 给国家的省市区域添加背景色-暂未使用
      // const disCountryLayer = new window.AMap.DistrictLayer.Country({
      //   zIndex: 10,
      //   SOC: "CHN",
      //     // opacity: 0.4,
      //   depth: 1,
      //   styles: {
      //     // 'nation-stroke': '#15fdfe',
      //     // "coastline-stroke": [0.85, 0.63, 0.94, 1],//海岸线颜色
      //     // 'province-stroke': '#15fdfe',
      //     // 'city-stroke': '#15fdfe', // 中国特有字段
      //     fill: function(props) {
      //       if (props.adcode === 350000) {
      //         return "";
      //       } else {
      //         return "#09152A"; //042E4F-122246-023c82-09152A
      //       }
      //     },
      //   },
      // });
      // disCountryLayer.setMap(myAmap);
      //给福建省下的区域添加图层描边
      //350000 =350000福建省
      let disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [350000],
        depth: 1,
        opacity: 0.6,
        styles: {
          // height: [0, 300000],
          // opacity: 0.86
          fill: function(properties, b, c, d) {
            let adcode = properties.adcode;
            // return getColorByAdcode();
            // return "rgba(118,238,251,0.7)";
            // return "#355b95";
            return "";
          },
          "province-stroke": "#2e72ae", //09152A
          "city-stroke": "#2e72ae", // 中国地级市边界
          "county-stroke": "#2e72ae", // 中国区县边界
        },
      });

      disProvince.setMap(myAmap);
      /*设置区域背景色-结束*/

      this.myAmap = myAmap;
      // this.reqRouteLnglatList();
    },
    //获取路线路段坐标
    reqRouteLnglatList() {
      // getRouteLnglatList().then((res) => {
      // mutationsSet("routeLnglatList", res.data || []);
      // this.renderRouteToMap(res.data || []);
      // });
      this.renderRouteToMap(routeLnglatJson);
    },
    //渲染地图路线
    renderRouteToMap(jsondata) {
      let routeLanlat = [],
        routeData = [];
      routeData = jsondata.sort((a, b) => a.id - b.id);
      routeData.forEach((val, index) => {
        if (val.direction === 1) {
          if (val.is_deleted === 0) {
            routeLanlat.push(
              new window.AMap.LngLat(val.longitude, val.latitude)
              // new window.AMap.LngLat(Number(val.longitude), Number(val.latitude))
            );
          }
        }
      });
      // console.log(routeLanlat);
      let mapRouteObj = new window.AMap.Polyline({
        //   //  zIndex:10,//默认10 路线覆盖物层级
        path: routeLanlat,
        borderWeight: 1, // 线条描边宽度，默认为 1
        isOutline: true, //是否描边
        strokeWeight: 4,
        strokeColor: "#f1827e", // 线条颜色
        // strokeColor: "#E30C9C", // 线条颜色
        lineJoin: "round", // 折线拐点连接处样式
      });
      mapRouteObj.setMap(this.myAmap);
    },

    //查询桥梁
    reqBridgeListByParam() {
      this.isOpenBridgeDetail = false;
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
        bridgeName: "",
        structureType: "",
        bridgeSize: "",
      };

      this.currentAreaLevelType &&
        (queryData[this.currentAreaLevelType] = this.currentAreaLevelValue);
      //桥梁搜索
      getQueryBridge(queryData).then((res) => {
        console.log(res);
        const { data } = res;
        // this.myAmapBridgeList = this.bridgeData_filter(data);
        // this.updateMapPoi(data); //普通的点标记渲染
        //可视化点标记渲染
        this.locaUpdateMapPoi(data);
      });
    },
    //初始可视化图标图层
    initLocaIconLayer() {
      // 点类型图层
      this.mapLocaIconLayer = new Loca.IconLayer({
        map: this.myAmap,
        eventSupport: true,
      });

      // 绑定事件
      this.mapLocaIconLayer.on("click", (event) => {
        // console.log('Click target: ', event.target) // 触发click事件的元素
        // console.log('Event type: ', event.type) // 事件名称
        // console.log('Raw Event: ', event.originalEvent) // 原始DomEvent事件
        // console.log('Raw data: ', event.rawData) // 触发元素对应的原始数据
        // console.log('LngLat: ', event.lnglat) // 元素所在经纬度
        console.log("event.rawData", event.rawData);
        this.openPoiDetail(event.rawData);
      });
    },
    //可视化图层更新点位
    locaUpdateMapPoi(poiData) {
      if (!this.mapLocaIconLayer) {
        this.initLocaIconLayer();
      } else {
        this.mapLocaIconLayer.setMap(null); //移除上一次数据
      }
      let poiArr = [];
      // const iconRootPath = window.location.origin;

      if (this.locaPoiArr.length) {
        this.mapLocaIconLayer.setMap(this.myAmap);
        poiArr = this.locaPoiArr;
      } else {
        poiData.forEach((data) => {
          if (data.latitudeLongitude) {
            try {
              const addr = data.latitudeLongitude.split(",");
              let typeIcon = this.bridgeLegend[data.bridgeTypeDes].icon;
              poiArr.push({ ...data, lnglat: addr, icon: typeIcon }); //iconRootPath+'/'+
            } catch (err) {
              console.log(err);
            }
          }
        });
        this.locaPoiArr = poiArr;
      }

      //设置数据
      this.mapLocaIconLayer.setData(this.locaPoiArr, {
        // type: "json",
        lnglat: "lnglat",
      });
      this.mapLocaIconLayer.setOptions({
        // source: bridgeAllIcon, // base64 格式图片
        // 可以使用函数回调的形式
        source: function(res) {
          // console.log("source", res);
          return res.value.icon;
        },
        style: {
          // 默认半径单位为像素
          size: 30,
          // opacity: 0.9,
        },
      });

      //渲染
      this.mapLocaIconLayer.render();
      // layer.hide()  //  图层隐藏
      // layer.show() // 图层显示
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
        let iconColor = "#76eefb";
        let contentStr = `<svg
            t="1615976296444"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4697"
            width="26"
            height="26"
          >
            <path
              d="M712.341 246.982a278.637 278.637 0 0 0-400.682 0c-110.496 114.278-110.496 295.585 0 409.866L512.001 862 712.34 656.848c110.497-114.281 110.497-295.588 0.001-409.866z"
              fill="${iconColor}"
              p-id="4698"
            ></path>
          </svg>`;

        if (data.latitudeLongitude) {
          const addr = data.latitudeLongitude.split(",");
          // console.log("addr", addr);
          let temp = new AMap.Marker({
            map: this.myAmap,
            name: data.bridgeName,
            content: contentStr,
            // icon: new AMap.Icon({
            //   image: icon,
            //   // size: new AMap.Size(22, 22), //图标大小
            //   imageSize: new AMap.Size(26, 26),
            // }),
            position: [addr[0], addr[1]],
            offset: new AMap.Pixel(-13, -13),
            // content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
            direction: "right", // 设置文本标注方位
          });
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

    //打开地图点标记-桥梁详情
    openPoiDetail(data) {
      const newData = {
        ...data,
        // startRunCarDate: moment(Number(data.startRunCarDate)).format(
        //   "yyyy-MM-DD"
        // ),
      };
      this.bridgeDetail = newData;
      this.isOpenBridgeDetail = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: rgba(0, 0, 0, 0) !important;
  background-image: url("./img/big-bg.png") !important;
}
// 层级区域数量样式
.level-area {
  position: absolute;
  left: torem(15px);
  bottom: torem(10px);
  padding: 0 torem(35px);
}
// 层级路线数量样式
.level-routeLine {
  position: absolute;
  left: torem(25px);
  bottom: torem(80px);
  padding: 0 torem(25px);
}
// 地图-层级单位数量
.level-count-show {
  z-index: 99;
  display: flex;
  height: torem(55px);
  font-family: MicrosoftYaHei;
  &::before {
    content: "";
    z-index: 1;
    position: absolute;
    transform: skewX(-10deg);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        -49deg,
        #0b2137 0%,
        #072847 50%,
        #01315a 100%
      ),
      linear-gradient(#1f516d, #1f516d);
    background-blend-mode: normal, normal;
  }

  // display: flex;
  .level-item {
    display: flex;
    align-items: center;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: torem(10px);
    z-index: 2;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      padding-top: torem(5px);
    }
    .name {
      // color: #76eefb;
      font-size: torem(14px);
      font-weight: bold;
      min-width: torem(26px);
      margin-right: torem(10px);
      margin-top: 0.1rem;
      background: linear-gradient(
        to bottom,
        #ffffff 0%,
        #c1c1c1 90%,
        #666666 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    .count {
      font-size: torem(30px);
      font-weight: bold;
      font-family: DINEngschriftStd;
      background: linear-gradient(
        to bottom,
        #ffffff 0%,
        #c1c1c1 50%,
        #666666 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
  }
}
//地图桥梁-图例
.bridge-legend {
  position: absolute;
  right: 0;
  bottom: 125px;
  width: 75px;
  z-index: 1;
  color: #fff;
  text-align: right;
  .legend-item {
    display: flex;
    font-size: 14px;
    align-items: center;
    .legend-dot {
      .icon {
        width: 22px;
        height: 22px;
      }
    }
  }
}

/*地图点位详情弹框*/
.marker-detail {
  position: absolute;
  z-index: 112;
  top: torem(50px);
  left: torem(120px);
  // background-image: url("~./img/tip-bg.svg");
  // background: linear-gradient(to bottom, #003639 4%, #001d29 89%);
  //   padding: 15px 15px 10px 10px;
  // box-shadow: 0 torem(10px) torem(30px) 0 #12334b inset;
  background-image: linear-gradient(
      to top,
      #112038 0%,
      #1b2c46 50%,
      #263958 100%
    ),
    linear-gradient(#64cebf, #64cebf);
  background-blend-mode: normal, normal;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
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
        margin: torem(17px) 0 torem(5px) 0;
        font-size: torem(18px);
        font-weight: 700;
        color: #ffffff;
        line-height: (24px);
        letter-spacing: 1px; /*no */
      }
      .link-sys {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #04caf0;
        font-size: torem(18px);
        height: torem(18px);
        padding-right: torem(50px);
        padding-bottom: torem(10px);
        line-height: torem(18px);
        .link-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        svg {
          height: torem(20px);
          width: torem(20px);
          padding-right: torem(10px);
        }
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
/* 地图移动方向盘 */
// .amap-pancontrol{
//   display: none;
// }
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
