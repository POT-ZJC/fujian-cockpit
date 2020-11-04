<template>
  <div class="map-box">
    <!--地图 查询框 -->
    <div class="module-pub map-query-box">
      <el-row class="map-search-head">
        <el-col :span="20">
          <el-input
            v-model="queryBridge.bridgeName"
            size="medium "
            placeholder="搜索名称"
             @keyup.enter.native="reqBridgeListByParam"
          />
        </el-col>
        <el-col :span="3">
          <el-divider direction="vertical" style="height:55%"></el-divider>
          <i class="el-icon-search search-btn" @click="reqBridgeListByParam"></i
        ></el-col>
      </el-row>
      <div class="map-search-body">
        <el-row>
          <el-col :span="11" class="item-block">
            <div class="item-label">桥梁名称：</div>
            <div class="item-content">
              <el-select
                clearable
                style="width:1.2rem"
                v-model="queryBridge.bridgeId"
                placeholder="选择桥梁"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in allBridgeList"
                  :key="item.bridgeName"
                  :label="item.bridgeName"
                  :value="item.bridgeId"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="11" class="item-block">
            <div class="item-label">左/右幅：</div>
            <div class="item-content">
              <el-select
                clearable
                style="width:1.2rem"
                v-model="queryBridge.leftRight"
                placeholder="下一级"
              >
                <el-option :label="'无'" value=""></el-option>
                <el-option :label="'左幅'" value="左幅"></el-option>
                <el-option :label="'右幅'" value="右幅"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" class="item-block">
            <div class="item-label">桥梁类型：</div>
            <div class="item-content">
              <el-checkbox-group v-model="queryBridge.bridgeTypeId">
                <el-checkbox
                  v-for="item in bridgeTypeOptions"
                  :key="item.bridgeName"
                  :label="item.id"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" class="item-block">
            <div class="item-label">技术状况等级：</div>
            <div class="item-content">
              <el-checkbox-group v-model="queryBridge.technologyLevel">
                <el-checkbox
                  v-for="item in ['1', '2', '3', '4', '5']"
                  :key="item"
                  :label="item"
                  >{{ item + "类" }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" class="item-block">
            <div class="item-label">建设年限</div>
            <div class="item-content">
              <el-date-picker
                v-model="queryBridge.times"
                type="daterange"
                popper-class="daterange-wrapper"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div id="container" class="container"></div>
    <!-- 地图点-颜色说明 -->
    <div class="poi-desc">
      <img :src="map_poi_desc" alt="" />
    </div>
    <!-- 桥梁详情 -->
    <div class="marker-detail" v-show="isOpenBridgeDetail">
      <div class="detail-header">
        <div class="header-title">桥梁管理</div>
        <i class="el-icon-circle-close" @click="isOpenBridgeDetail = false" />
      </div>
      <div class="detail-body">
        <div class="body-left">
          <el-image
            v-show="bridgeCompPhotoList.length > 0"
            class="img"
            :src="bridgeCompPhotoList[0]"
            :preview-src-list="bridgeCompPhotoList"
          >
          </el-image>
          <div v-show="bridgeCompPhotoList.length < 1">暂无桥梁图片</div>
          <!-- <img :src="detailData.imgUrl" alt="桥梁图片" /> -->
        </div>
        <div class="body-right">
          <div class="right-title">{{ detailData.bridgeName }}</div>

          <div class="item-block" v-for="item in detailFormat" :key="item.key">
            <div class="item-label">{{ item.name + "：" }}</div>
            <div class="item-content" :title="detailData[item.key] || '-'">
              {{ detailData[item.key] || "-" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 桥梁详情结束 -->
  </div>
  <!-- <div id="container" class="container"></div> -->
</template>
<script>
import poi_red from "./img/point-red.png";
import poi_type_1 from "./img/poi-type-1.svg";
import poi_type_2 from "./img/poi-type-2.svg";
import poi_type_3 from "./img/poi-type-3.svg";
import poi_type_4 from "./img/poi-type-4.svg";
import poi_type_5 from "./img/poi-type-5.svg";
import tip_bg from "./img/tip-bg.svg";
import map_poi_desc from "./img/map-poi-desc.png";
import moment from "moment";
import {
  getBridgeListByParam,
  getBridgeDetailInfoById,
} from "@/api/bridge-cockpit";
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

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  watch: {
    id(val) {
      this.$nextTick(() => {
        // this.loopPlayMarkers();
      });
    },
  },
  data() {
    const bridgeList_demo = [
      {
        bridgeId: "480670b7-9d11-11e7-93c0-00163e042bbd",
        bridgeName: "北汊北引桥（左幅）",
        addr: [117.956972, 24.458801],
      },
      {
        bridgeId: "1527244b-9d14-11e7-93c0-00163e042bbd",
        bridgeName: "北汊北引桥（右幅）",
        addr: [117.953882, 24.459505],
      },
      {
        bridgeId: "ccf1871f-9d15-11e7-93c0-00163e042bbd",
        bridgeName: "北汊南引桥（左幅）",
        addr: [117.953625, 24.444816],
      },

      {
        bridgeId: "7d7ea66e-9d17-11e7-93c0-00163e042bbd",
        bridgeName: "北汊南引桥（右幅）",
        addr: [117.950706, 24.44505],
      },
      {
        bridgeId: "2103b393-9d15-11e7-93c0-00163e042bbd",
        bridgeName: "北汊主桥",
        addr: [117.954311, 24.453567],
      },

      {
        bridgeId: "9e5c45a9-9d1c-11e7-93c0-00163e042bbd",
        bridgeName: "南汊南引桥（左幅）",
        addr: [117.965641, 24.417543],
      },
      {
        bridgeId: "14df6da3-9d1c-11e7-93c0-00163e042bbd",
        bridgeName: "南汊主桥",
        addr: [117.959726, 24.424457],
      },

      {
        bridgeId: "4c4d9f55-9d1b-11e7-93c0-00163e042bbd",
        bridgeName: "南汊北引桥（右幅）",
        addr: [117.951736, 24.436142],
      },

      {
        bridgeId: "7f976dee-9d1a-11e7-93c0-00163e042bbd",
        bridgeName: "南汊北引桥（左幅）",
        addr: [117.955256, 24.438799],
      },
      {
        bridgeId: "1f27bff0-9d1d-11e7-93c0-00163e042bbd",
        bridgeName: "南汊南引桥（右幅）",
        addr: [117.961779, 24.416996],
      },
      // {
      //   bridgeId: "1588a917-2018-11e8-94b6-5cb901893af4",
      //   bridgeName: "海门岛互通（A匝道）",
      //   addr: [117.966673, 24.41088],
      // },
      // {
      //   bridgeId: "77707707-ce8f-11e7-93c0-00163e042bbd",
      //   bridgeName: "海门岛互通（C匝道）",
      //   addr: [117.968425, 24.410022],
      // },
    ];
    return {
      map_poi_desc,
      map: null,
      bridgeList_demo, // 用来过滤桥梁数据-携带坐标
      isOpenBridgeDetail: false,
      //桥梁详情-格式
      detailFormat: [
        { name: "桥梁编码", key: "bridgeNumber" },
        { name: "桥长", key: "length" },
        { name: "桥型", key: "bridgeType" },
        { name: "建设年限", key: "buildDate" },
        { name: "技术状况", key: "technologyLevel" },
        { name: "建设单位", key: "constructionDepart" },
        { name: "设计单位", key: "designDepart" },
        { name: "施工单位", key: "buildDepart" },
        { name: "养护单位", key: "maintenanceDepart" },
      ],
      //桥梁详情
      detailData: { name: "大桥" },
      bridgeCompPhotoList: [],
      //搜索桥梁
      queryBridge: {
        bridgeId: "", // 桥梁id
        bridgeName: "", //桥梁名称
        bridgeTypeId: [], //桥梁类型
        technologyLevel: [], //技术状况等级
        leftRight: "", //左右幅
        times: [],
        buildDateStart: "", //建设年份开始
        buildDateEnd: "", //建设年份结束\
      },
      allBridgeList: [], //全部的桥梁
      mapBridgeList: [], //地图上的桥梁
      //桥梁类型选项
      bridgeTypeOptions: [
        {
          paramNumber: "bridgeType",
          name: "斜拉桥",
          id: "7831c401-9c3f-11e7-93c0-00163e042bbd",
        },
        {
          paramNumber: "bridgeType",
          name: "梁式桥",
          id: "ed71ed5c-9c3e-11e7-93c0-00163e042bbd",
        },
        {
          paramNumber: "bridgeType",
          name: "钢-混组合梁",
          id: "fcd8b1ab-9c3e-11e7-93c0-00163e042bbd",
        },
      ],
      //演示用数据
      poi_Arr: [
        {
          name: "厦漳大桥",
          addr: [117.953236, 24.437039],
        },
        {
          name: "厦门大桥",
          addr: [118.102497, 24.557011],
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

      markers_Arr: [], //地图上的点标记对象
      currentMarkerIndex: -1, //轮播用-当前点标记索引
    };
  },
  mounted() {
    this.initMap();
    getBridgeListByParam().then((res) => {
      console.log(res);
      const { attachObj } = res;
      this.allBridgeList = this.bridgeData_filter(attachObj);
      // this.allBridgeList=allBridgeList

      this.mapBridgeList = this.bridgeData_filter(attachObj);
      this.updateMapPoi(this.mapBridgeList);
    });
  },
  methods: {
    //查询桥梁
    reqBridgeListByParam() {
      const queryData = {
        ...this.queryBridge,
      };

      queryData.bridgeTypeId = queryData.bridgeTypeId.join(",");
      queryData.technologyLevel = queryData.technologyLevel.join(",");
      queryData.times = queryData.times ? ["", ""] : queryData.times;
      queryData.buildDateStart = queryData.times[0]; //建设年份开始
      queryData.buildDateEnd = queryData.times[1]; //建设年份结束\
      delete queryData.times;
      getBridgeListByParam(queryData).then((res) => {
        console.log(res);
        const { attachObj } = res;
        this.mapBridgeList = this.bridgeData_filter(attachObj);
        this.updateMapPoi(this.mapBridgeList);
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
    //更新点图点标记
    updateMapPoi(poiArr) {
      this.map.remove(this.markers_Arr);
      let markers = poiArr.map((data) => {
        let icon = poi_type_1;
        // poi_type_1
        switch (data.technologyLevel) {
          case "1类":
            icon = poi_type_1;
            break;
          case "2类":
            icon = poi_type_2;
            break;

          case "3类":
            icon = poi_type_3;
            break;
          case "4类":
            icon = poi_type_4;
            break;
          case "5类":
            icon = poi_type_5;
            break;
          default:
            break;
        }

        let temp = new AMap.Marker({
          map: this.map,
          name: data.bridgeName,
          icon: new AMap.Icon({
            image: icon,
            // size: new AMap.Size(22, 22), //图标大小
            imageSize: new AMap.Size(26, 26),
          }),
          position: [data.addr[0], data.addr[1]],
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
        return temp;
      });
      this.markers_Arr = markers;
    },

    //打开地图点标记桥梁详情
    openPoiDetail(data) {
      getBridgeDetailInfoById({ bridgeId: data.bridgeId }).then((res) => {
        console.log(res);
        let { attachObj } = res;

        const { bridgeCompPhotoList } = attachObj;
        // attachObj.imgUrl = bridgeCompPhotoList.length
        //   ? bridgeCompPhotoList[0].filePath
        //   : "";
        this.bridgeCompPhotoList = bridgeCompPhotoList || [];
        attachObj.buildDate = moment(attachObj.buildDate).format("yyyy-MM-DD");

        //   this.detail_imgs_1 = this.diseaseDetail.attList
        // ? this.diseaseDetail.attList.map((a) => a.attPath)
        // : [];
        this.detailData = attachObj;
        this.isOpenBridgeDetail = true;
      });
    },
    initMap() {
      let map = new AMap.Map("container", {
        mapStyle: "amap://styles/f546773a54957542ed38579c54b84d16",
        // viewMode: "3D",
        resizeEnable: true,
        // features: ["bg", "road"],
        center: this.poi_Arr[0].addr,
        zoom: 10,
      });
      /*设置福建区域背景色*/
      let areaItemTotal = 0;
      let backColorArr = [
        "#002e38",
        "#016b83",
        "#014655",
        "#016b83",
        "rgba(76,245,246,0.53)",
      ];
      let getColorByAdcode = function(adcode) {
        ++areaItemTotal;
        const randomNIndex =
          areaItemTotal -
          Math.floor(areaItemTotal / backColorArr.length) * backColorArr.length;

        return backColorArr[randomNIndex];
      };
      //350000 =350000福建省
      let disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [350000],
        depth: 1,
        // opacity: 0.7,
        // styles: {
        //   // height: [0, 300000],
        //   // opacity: 0.86
        //   // fill: function(properties, b, c, d) {
        //   //   let adcode = properties.adcode;
        //   //   return getColorByAdcode();
        //   // },
        //   "province-stroke": "#319fb6",
        //   "city-stroke": "#319fb6", // 中国地级市边界
        //   "county-stroke": "#319fb6", // 中国区县边界
        // },
      });

      // disProvince.setMap(map);
      /*设置区域背景色-结束*/

      this.map = map;
    },
    //
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.poi-desc {
  position: absolute;
  z-index: 111;
  right: 30px;
  bottom: 70px;
  width: 110px;
  height: 200px;
  background: #093d51;
  border-radius: 10px;
  img {
    width: 80px;
    margin-top: 20px;
    height: 160px;
    margin-left: 24px;
  }
}
.map-box {
  position: relative;
  width: 100%;
  height: 100%;
  /*地图搜索*/
  .map-query-box {
    z-index: 111;
    position: absolute;
    top: 120px;
    left: 35px;
    width: 540px;
    height: auto;
  }
}
/*地图点位详情弹框*/
.marker-detail {
  position: absolute;
  z-index: 112;
  top: 190px;
  left: 35%;
  // background-image: url("~./img/tip-bg.svg");
  background: linear-gradient(to bottom, #003639 4%, #001d29 89%);
  //   padding: 15px 15px 10px 10px;
  box-shadow: 0 10px 30px 0 #12334b inset;
  width: 690px;
  height: 510px;

  .detail-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    align-items: center;
    .header-title {
      height: 22px;
      font-size: 16px;
      font-weight: 700;
      color: #04caf0;
      position: relative;
      padding-left: 10px;
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
      font-size: 22px;
      cursor: pointer;
    }
  }
  .detail-body {
    border-top: 1px solid #284d6a; /*no */
    margin: 0 20px;
    padding: 20px 5px;
    display: flex;

    .body-left {
      width: 290px;
      height: 396px;
      flex-shrink: 0;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .body-right {
      width: calc(100% - 290px);
      padding-left: 20px;
      .right-title {
        margin: 17px 0 30px 0;
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        line-height: 24px;
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
<style>
.daterange-wrapper {
  /* //时间范围选择器下拉-样式 */
  background: #0f283b;
}
.amap-info-content.amap-info-outer {
  background-color: #27272b;
  color: #f0f2ff;
  width: 100px;
}
.bottom-center .amap-info-sharp {
  border-top: 8px solid #27272b;
}
.bottom-center button {
  border: none;
  color: #2181ff;
  float: right;
  background: transparent;
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
