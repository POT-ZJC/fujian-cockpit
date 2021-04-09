<template>
  <div class=" pr" style="width:100%;height:100%">
    <div id="container" class="container" style="width:100%;height:100%;"></div>

    <!-- 区域公司/养护中心/养护站 -->
    <div class="area-level-count">
      <div class="area-level-item" v-if="showLevel.compnayTotal">
        <svg
          t="1616467520893"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3997"
          width="48"
          height="48"
        >
          <path
            d="M928 832 896 832 896 384c0-70.4-57.6-128-128-128L576 256l0 544C576 817.92 561.92 832 544 832S512 817.92 512 800L512 192c0-70.4-57.6-128-128-128L192 64C121.6 64 64 121.6 64 192l0 640L32 832C14.08 832 0 846.08 0 864 0 881.92 14.08 896 32 896l896 0c17.92 0 32-14.08 32-32C960 846.08 945.92 832 928 832zM352 704l-128 0C206.08 704 192 689.92 192 672S206.08 640 224 640l128 0C369.92 640 384 654.08 384 672S369.92 704 352 704zM352 512l-128 0C206.08 512 192 497.92 192 480 192 462.08 206.08 448 224 448l128 0C369.92 448 384 462.08 384 480 384 497.92 369.92 512 352 512zM352 320l-128 0C206.08 320 192 305.92 192 288 192 270.08 206.08 256 224 256l128 0C369.92 256 384 270.08 384 288 384 305.92 369.92 320 352 320zM800 704l-128 0c-17.92 0-32-14.08-32-32s14.08-32 32-32l128 0c17.92 0 32 14.08 32 32S817.92 704 800 704zM800 512l-128 0C654.08 512 640 497.92 640 480 640 462.08 654.08 448 672 448l128 0C817.92 448 832 462.08 832 480 832 497.92 817.92 512 800 512z"
            p-id="3998"
            fill="#56d1ed"
          ></path>
        </svg>

        <div class="count">{{ mapLBNumber.compnayTotal }}个</div>
        <div class="name">区域公司</div>
      </div>
      <div class="area-level-item" v-if="showLevel.centerTotal">
        <svg
          t="1616468812658"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="33318"
          width="48"
          height="48"
        >
          <path
            d="M552.362667 101.034667l406.954666 373.034666a34.133333 34.133333 0 0 1-23.04 59.306667L896 533.333333v298.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333v-298.666667h-40.234667a34.133333 34.133333 0 0 1-23.04-59.264l406.912-373.034666a59.733333 59.733333 0 0 1 80.725334 0zM400.896 614.826667a34.901333 34.901333 0 0 0-49.237333 3.541333l-6.357334 7.978667a129.834667 129.834667 0 0 0-25.301333 77.056v46.677333c0 26.453333 21.504 48 48 48h288c26.496 0 48-21.504 48-48v-46.677333c0-30.549333-10.666667-59.349333-29.184-82.005334l-1.92-2.176-2.048-2.048a38.442667 38.442667 0 0 0-54.357333 2.688l-2.389334 2.602667a80.085333 80.085333 0 0 1-5.504 5.674667 152.96 152.96 0 0 1-96.597333 34.176 152.874667 152.874667 0 0 1-111.104-47.488zM512 353.194667a115.2 115.2 0 0 0-115.2 115.2v40.32a115.2 115.2 0 0 0 230.4 0v-40.32a115.2 115.2 0 0 0-115.2-115.2z"
            fill="#76eefb"
            p-id="33319"
          ></path>
        </svg>
        <div class="count">{{ mapLBNumber.centerTotal }}个</div>
        <div class="name">养护中心</div>
      </div>
      <div class="area-level-item" v-if="showLevel.stationTotal">
        <svg
          t="1616468492756"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="23058"
          width="48"
          height="48"
        >
          <path
            d="M84 362.7h109.3c11 0 20 9 20 20V940c0 11-9 20-20 20H84c-11 0-20-9-20-20V382.7c0-11.1 9-20 20-20zM308 64h109.3c11 0 20 9 20 20v856c0 11-9 20-20 20H308c-11 0-20-9-20-20V84c0-11 9-20 20-20zM532 549.3h109.3c11.1 0 20 9 20 20V940c0 11.1-9 20-20 20H532c-11.1 0-20-9-20-20V569.4c0-11.1 9-20.1 20-20.1zM960 586.7c0-47.5-29.9-89.8-74.7-105.6v105.6h-74.7V481c-58.3 20.6-88.9 84.6-68.4 142.9 11.3 31.9 36.4 57.1 68.4 68.4v252.4c0 8.5 6.9 15.4 15.4 15.4h44c8.5 0 15.4-6.9 15.4-15.4V692.3c44.7-15.8 74.6-58.2 74.6-105.6z"
            p-id="23059"
            fill="#76eefb"
          ></path>
        </svg>
        <div class="count">{{ mapLBNumber.stationTotal }}个</div>
        <div class="name">养护站</div>
      </div>
    </div>
    <!-- 路线路段标识 -->
    <div class="map-line-tips">
      <div class="line-tips-route">
        <!-- <svg
          t="1616469056169"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="37942"
          width="48"
          height="48"
        >
          <path
            d="M473.75872 668.16V242.56c0-67.51232-54.7072-122.24-122.17856-122.24-67.47648 0-122.18368 54.72768-122.18368 122.24v680.00256c0 40.448-52.39808 56.41728-74.9568 22.84032L44.78976 782.20288a40.96 40.96 0 0 1 67.99872-45.68576l34.688 51.63008V242.56C147.47648 129.80736 238.85312 38.4 351.58016 38.4c112.72192 0 204.09856 91.40736 204.09856 204.16v544c0 67.51232 54.7072 122.24 122.17856 122.24 67.4816 0 122.18368-54.72768 122.18368-122.24V106.55744c0-40.60672 52.736-56.46336 75.13088-22.5792l107.85792 163.2a40.96 40.96 0 1 1-68.34176 45.16352l-32.72704-49.51552v543.73376c0 112.75264-91.37664 204.16-204.10368 204.16-112.72192 0-204.09856-91.40736-204.09856-204.16V668.16z"
            fill="#76eefb"
            p-id="37943"
          ></path>
        </svg> -->
        <div class="route">
          路线
        </div>
        <div class="route-totalNum">
          {{ mapLBNumber.currentRouteTotalNum }}条
        </div>
      </div>
      <div class="line-tips-road">
        <div class="road">路段</div>
        <div class="road-totalNum">{{ mapLBNumber.currentRoadTotalNum }}条</div>
      </div>
    </div>
    <!-- 桥梁图例颜色 -->
    <div class="bridge-legend" v-show="true">
      <div
        class="legend-item"
        style=""
        v-for="(item, index) in mapActiveBridge"
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
              :fill="`${bridgeLegend[item].color}`"
              p-id="4698"
            ></path>
          </svg> -->
          <img :src="bridgeLegend[item].icon" alt="" class="icon" />
        </div>
        {{ item }}
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
import { bridgeStore } from "@/views/cockpit/cockpit-bridge-v1/bridgeStore";
import { store } from "@/views/cockpit/cockpitStore";
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
    //当前层级类型
    currentAreaLevelType() {
      return bridgeStore.currentAreaLevelType;
    },
    currentAreaLevelValue() {
      return bridgeStore.currentAreaLevelValue;
    },
    // 搜多地图关键字
    searchMapKeyword() {
      return bridgeStore.searchMapKeyword;
    },

    routeLnglatList() {
      return bridgeStore.routeLnglatList;
    },
    //桥梁总览激活
    bridgeOverviewActive() {
      return bridgeStore.bridgeOverviewActive;
    },
  },
  watch: {
    // bridgeOverviewActive: {
    //   handler(val) {
    //     this.reqBridgeListByParam();
    //   },
    //   deep: true,
    // },

    // searchMapKeyword(val) {
    //   this.reqBridgeListByParam();
    // },
    currentAreaLevelType(val) {
      // this.reqBridgeListByParam();
      this.handleShowLevel(val);
    },
    currentAreaLevelValue(val) {
      // this.reqBridgeListByParam();
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
      //桥梁分类图例-颜色值-bridgeTypeDes
      bridgeLegend: {
        梁桥: {
          name: "梁桥",
          color: "#78aff2 d778f2",
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
        特大桥: {
          name: "特大桥",
          color: "#78aff2",
          icon: bridge1Icon,
        },
        大桥: {
          name: "大桥",
          color: "#d778f2",
          icon: bridge2Icon,
        },
        中桥: {
          name: "中桥",
          color: "#f2df78",
          icon: bridge3Icon,
        },
        小桥: {
          name: "小桥",
          color: "#7ef278",
          icon: bridge4Icon,
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
        console.log("districtRes", bounds);

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
        // mapStyle: "amap://styles/f23ce73fdfa7fc0ba5d749281bc4aa3f",//样式-1
        mapStyle: "amap://styles/32ff3e849fa742890c5ac876eebdafd9", // 样式-2
        viewMode: "3D",
        resizeEnable: true,
        features: ["bg", "road", "point", "road"], //'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
        center: [117.997286, 26.379269],
        zoom: 7.5,
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
          strokeColor: "#99ffff",
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
          "province-stroke": "#3a8ff6", //09152A
          "city-stroke": "#3a8ff6", // 中国地级市边界
          // "county-stroke": "#319fb6", // 中国区县边界
        },
      });

      disProvince.setMap(myAmap);
      /*设置区域背景色-结束*/

      this.myAmap = myAmap;
      this.reqRouteLnglatList();
      // this.reqBridgeListByParam();
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

    // 查询桥梁api-规模和形式的传参处理
    handleMapBridgeType() {
      const overviewActive = { ...this.bridgeOverviewActive };

      let structureType = "",
        bridgeSize = "";
      if (!overviewActive.all) {
        const structureTypeSource = overviewActive.structureType;
        const bridgeSizeSource = overviewActive.bridgeSize;
        for (let key in structureTypeSource) {
          if (structureTypeSource[key]) {
            structureType += structureType ? "," + key : key;
          }
        }
        for (let key in bridgeSizeSource) {
          if (bridgeSizeSource[key]) {
            bridgeSize += bridgeSize ? "," + key : key;
          }
        }
      }
      if (bridgeSize) {
        this.mapActiveBridge = bridgeSize.split(",");
      } else if (structureType) {
        this.mapActiveBridge = structureType.split(",");
      } else {
        this.mapActiveBridge = [];
      }
      return { structureType, bridgeSize };
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
        bridgeName: this.searchMapKeyword,
        ...this.handleMapBridgeType(),
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
        // map: this.myAmap,
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
    // 清除桥梁点位，桥梁图列隐藏
    clearBridgePoi() {
      this.mapLocaIconLayer && this.mapLocaIconLayer.setMap(null); //移除桥梁点位图层
      this.mapActiveBridge=[]
    },
    //可视化图层更新点位
    locaUpdateMapPoi(poiData) {
      if (!this.mapLocaIconLayer) {
        this.initLocaIconLayer();
      } else {
        this.mapLocaIconLayer.setMap(null); //移除上一次数据
        // this.mapLocaIconLayer.setMap(this.myAmap)
      }
      this.mapLocaIconLayer.setMap(this.myAmap)
      let poiArr = [];
      // const iconRootPath = window.location.origin;
      poiData.forEach((data) => {
        if (data.latitudeLongitude) {
          try {
            const addr = data.latitudeLongitude.split(",");
            let typeIcon = bridgeAllIcon; //structureType-bridgeSize
            if (this.bridgeOverviewActive.structureType[data.bridgeTypeDes]) {
              typeIcon = this.bridgeLegend[data.bridgeTypeDes].icon;
            } else if (this.bridgeOverviewActive.bridgeSize[data.bridgeSize]) {
              typeIcon = this.bridgeLegend[data.bridgeSize].icon;
            }

            poiArr.push({ ...data, lnglat: addr, icon: typeIcon }); //iconRootPath+'/'+
          } catch (err) {
            console.log(err);
          }
        }
      });
      //设置数据
      this.mapLocaIconLayer.setData(poiArr, {
        // type: "json",
        lnglat: "lnglat",
      });
      // console.log("mapLocaIconLayer", this.mapLocaIconLayer, poiArr);
      this.mapLocaIconLayer.setOptions({
        // source: bridgeAllIcon, // base64 格式图片
        // 可以使用函数回调的形式
        source: function(res) {
          // console.log('source',res)
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
        let typeColor = "#76eefb"; //structureType-bridgeSize
        if (this.bridgeOverviewActive.structureType[data.bridgeTypeDes]) {
          typeColor = this.bridgeLegend[data.bridgeTypeDes].color;
        } else if (this.bridgeOverviewActive.bridgeSize[data.bridgeSize]) {
          typeColor = this.bridgeLegend[data.bridgeSize].color;
        }
        let iconColor = typeColor;
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
}
// 地图-区域个层级单位数量
.area-level-count {
  position: absolute;
  left: torem(15px);
  bottom: torem(65px);
  font-family: MicrosoftYaHei-Bold;
  // display: flex;
  .area-level-item {
    display: flex;
    align-items: center;
    height: torem(42px);
    .icon {
      width: 0.28rem;
      height: 0.28rem;
      padding-right: torem(15px);
    }
    .name {
      color: #76eefb;
      font-size: torem(18px);
      font-weight: bold;
      width: torem(76px);
      margin-right: torem(15px);
      margin-top: 0.1rem;
    }
    .count {
      font-size: torem(30px);
      font-weight: bold;
      color: #76eefb;
      // width: torem(76px);
      font-family: DINEngschriftStd;
      // margin-right: torem(15px);
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
// 地图线覆盖物-提示
.map-line-tips {
  position: absolute;
  left: torem(15px);
  // right: 0;
  bottom: torem(20px);
  display: flex;
  justify-content: center;
  font-family: MicrosoftYaHei-Bold;
  .line-tips-route {
    display: flex;
    margin-right: torem(30px);
    padding: 0 torem(0px);
    .icon {
      width: 0.28rem;
      height: 0.28rem;
      padding-right: torem(5px);
    }
    .route {
      cursor: pointer;
      font-size: torem(20px);
      font-weight: bold;
      color: #76eefb;
      position: relative;
      margin-right: torem(15px);
      width: torem(76px);
      &::before {
        position: absolute;
        content: "";
        width: torem(60px);
        height: torem(5px);
        bottom: torem(-2px);
        left: -2px;
        background-color: #f1827e;
      }
    }
    .route-totalNum {
      // margin-left: torem(20px);
      font-size: torem(30px);
      letter-spacing: 2px;
      font-weight: bold;
      color: #76eefb;
      font-family: DINEngschriftStd;
    }
  }
  .line-tips-road {
    display: flex;
    // margin-left: torem(30px);
    // padding: 0 torem(10px);
    .road {
      cursor: pointer;
      font-size: torem(18px);
      font-weight: bold;
      color: #76eefb;
      width: torem(76px);
      margin-right: torem(15px);
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: torem(60px);
        height: torem(5px);
        bottom: torem(-2px);
        left: torem(-2px);
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
      // margin-left: torem(20px);
      font-size: torem(30px);
      letter-spacing: 2px;
      font-weight: bold;
      color: #76eefb;
      font-family: DINEngschriftStd;
    }
  }
}
/*地图点位详情弹框*/
.marker-detail {
  position: absolute;
  z-index: 112;
  top: torem(200px);
  left: torem(60px);
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
