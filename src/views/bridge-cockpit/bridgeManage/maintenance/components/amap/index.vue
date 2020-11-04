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
            @keyup.enter.native="reqDiseaseListByParam"
          />
        </el-col>
        <el-col :span="3">
          <el-divider direction="vertical" style="height:55%"></el-divider>
          <i
            class="el-icon-search search-btn"
            @click="reqDiseaseListByParam"
          ></i
        ></el-col>
      </el-row>
      <div class="map-search-body">
        <el-row>
          <el-col :span="11" class="item-block">
            <div class="item-label">桥梁名称：</div>
            <div class="item-content">
              <el-select
                clearable
                v-model="queryBridge.bridgeId"
                placeholder="桥梁选择"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in allBridgeList"
                  :key="item.bridgeId"
                  :label="item.bridgeName"
                  :value="item.bridgeId"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" class="item-block">
            <div class="item-label">巡查类型：</div>
            <div class="item-content">
              <el-select
                clearable
                v-model="queryBridge.paramId"
                placeholder="巡查类型选择"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in patrolTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" class="item-block">
            <div class="item-label">巡查项：</div>
            <div class="item-content">
              <el-select
                clearable
                v-model="queryBridge.inspId"
                placeholder="巡查项选择"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in patrolItemList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" class="item-block">
            <div class="item-label">病害类型：</div>
            <div class="item-content">
              <el-select
                clearable
                v-model="queryBridge.diseaseId"
                placeholder="病害类型选择"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in diseasesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" class="item-block">
            <div class="item-label">审核状态：</div>
            <div class="item-content">
              <el-select
                clearable
                v-model="queryBridge.signStatus"
                placeholder="审核状态选择"
              >
                <el-option value="">全部</el-option>
                <el-option
                  v-for="item in auditStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21" class="item-block">
            <div class="item-label">起始时间</div>
            <div class="item-content">
              <el-date-picker
                v-model="queryBridge.times"
                value-format="yyyy-MM-dd"
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

    <div class="marker-detail" v-show="isOpenBridgeDetail">
      <div class="detail-header">
        <div class="header-title">内容详情</div>
        <i class="el-icon-circle-close" @click="isOpenBridgeDetail = false" />
      </div>

      <div class="detail-body">
        <div class="body-contentBlock">
          <div class="contentBlock-title">病害发现</div>

          <div class="contentBlock-item">
            <div class="show-imgs">
              <!-- <img
                v-for="item in detail_imgs_1"
                :src="item.attPath"
                alt=""
                :key="item.attPath"
              /> -->
              <el-image
                class="img"
                v-show="detail_imgs_1.length > 0"
                :src="detail_imgs_1[0]"
                :preview-src-list="detail_imgs_1"
              >
              </el-image>
              <el-image
                v-show="detail_imgs_1.length > 1"
                class="img"
                :src="detail_imgs_1[1]"
                :preview-src-list="detail_imgs_1"
              >
              </el-image>
              <span v-show="detail_imgs_1.length < 1">暂无图片</span>
            </div>
            <div
              class="item-block"
              v-for="item in detailFormat_1"
              :key="item.key"
            >
              <div class="item-label">{{ item.name + ":" }}</div>
              <div class="item-content" :title="diseaseDetail[item.key] || '-'">
                {{ diseaseDetail[item.key] || "-" }}
              </div>
            </div>
          </div>
        </div>
        <div class="body-contentBlock">
          <div class="contentBlock-title">养护维修</div>
          <div class="contentBlock-item">
            <div class="show-imgs">
              <img
                v-for="item in detail_imgs_2"
                :src="item.attPath"
                alt=""
                :key="item.attPath"
              />

              <span v-if="detail_imgs_2.length < 1">暂无图片</span>
            </div>
            <div
              class="item-block"
              v-for="item in detailFormat_2"
              :key="item.key"
            >
              <div class="item-label">{{ item.name + ":" }}</div>
              <div class="item-content" :title="maintenance[item.key] || '-'">
                {{ maintenance[item.key] || "-" }}
              </div>
            </div>
          </div>
        </div>
        <div class="body-contentBlock">
          <div class="contentBlock-title">验收记录</div>

          <div class="contentBlock-item">
            <div class="show-imgs">
              <img
                v-for="item in detail_imgs_3"
                :src="item.attPath"
                alt=""
                :key="item.attPath"
              />
              <span v-if="detail_imgs_3.length < 1">暂无图片</span>
            </div>
            <div
              class="item-block"
              v-for="item in detailFormat_3"
              :key="item.key"
            >
              <div class="item-label">{{ item.name + ":" }}</div>
              <div class="item-content" :title="acceptance[item.key] || '-'">
                {{ acceptance[item.key] || "-" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="container" class="container"></div> -->
</template>
<script>
import poi_type_1 from "./img/poi-type-1.svg";
import poi_red from "./img/point-red.png";
import poi_green from "./img/point-green.png";
import poi_yellow from "./img/point-yellow.png";
import tip_bg from "./img/tip-bg.svg";

import {
  getDiseaseListByParam,
  getDiseaseDetailInfoById,
} from "@/api/bridge-cockpit";
import {
  patrolTypeList /*检查类型*/,
  auditStatusList /*审核状态*/,
  patrolItemList /*巡查项*/,
  diseasesList /*病害类型*/,
} from "./selectOptions";

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
        this.loopPlayMarkers();
      });
    },
  },
  data() {
    return {
      patrolTypeList /*检查类型*/,
      auditStatusList /*审核状态*/,
      patrolItemList /*巡查项*/,
      diseasesList /*病害类型*/,
      map: null,
      isOpenBridgeDetail: false,
      detailFormat_1: [
        { name: "结构物名称", key: "bridgeName" },
        { name: "检查类型", key: "paramId" },
        { name: "巡查项", key: "inspName" },
        { name: "病害类型", key: "diseaseName" },
        { name: "病害位置", key: "diseasePosition" },
        { name: "病害参数", key: "diseaseParam" },
        { name: "巡查员", key: "checkPersonName" },
        { name: "巡查时间", key: "gmtCreate" },
        { name: "审核状态", key: "signStatus" },
      ],
      detailFormat_2: [
        { name: "预估工程量", key: "expectWorkloadVaule" }, //expectWorkloadCompany
        { name: "实际工程量", key: "realWorkload" },
        { name: "维护信息", key: "bridgeType" },
        { name: "维修人", key: "createByName" },
        { name: "维修时间", key: "gmtCreate" },
      ],
      detailFormat_3: [
        { name: "验收结果", key: "diseaseRemark" },
        { name: "验收人", key: "createByName" },
        { name: "验收时间", key: "gmtCreate" },
      ],
      queryBridge: {
        bridgeId: "", // 桥梁id
        bridgeName: "", //桥梁名称
        paramId: "", //检查类型
        inspId: "", //巡查项
        diseaseId: "", //病害类型
        signStatus: "", //审核状态
        times: [],
        beginDate: "", //开始
        endDate: "", //结束\
      },
      allBridgeList: [], //全部的桥梁
      mapBridgeList: [], //地图上的桥梁
      diseaseDetail: {}, //病害
      maintenance: {}, //养护
      acceptance: {}, //验收
      detail_imgs_1: [], //
      detail_imgs_2: [], //
      detail_imgs_3: [], //
      //
      poi_Arr: [
        {
          name: "厦漳大桥",
          addr: [117.953236, 24.437039],
        },
      ],
      markers_Arr: [], //地图点标记对象
      currentMarkerIndex: -1, //轮播用-当前的点索引
    };
  },
  mounted() {
    this.initMap();
    getDiseaseListByParam().then((res) => {
      const { attachObj } = res;
      this.allBridgeList = this.unique(attachObj || []);
       this.mapBridgeList = this.bridgeData_filter(attachObj||[]); 
        this.updateMapPoi(this.mapBridgeList);
    });
  },
  methods: {
    unique(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        // bridgeId;
        if (newArr.findIndex((a) => a.bridgeId === arr[i].bridgeId) === -1) {
          newArr.push(arr[i]);
        }
      }
      console.log(newArr);
      return newArr;
    },

    reqDiseaseListByParam() {
      const queryData = {
        ...this.queryBridge,
      };

      queryData.times = queryData.times ? queryData.times : ["", ""];
      queryData.beginDate = queryData.times[0]; //建设年份开始
      queryData.endDate = queryData.times[1]; //建设年份结束\
      delete queryData.times;
      getDiseaseListByParam(queryData).then((res) => {
        console.log(res);
        const { attachObj } = res;
        this.mapBridgeList = this.bridgeData_filter(attachObj); 
        this.updateMapPoi(this.mapBridgeList);
      });
    },
    // 桥梁数据过滤-去掉没有坐标点的数据-并去重
    bridgeData_filter(list) {
      let arrs = [];
      list.forEach((item) => {
        if (item.longitude && item.latitude) {
          const data = {
            ...item,
            addr: [item.longitude, item.latitude],
          };
          arrs.push(data);
        }
      });

      return arrs;
    },
    //更新点图点标记
    updateMapPoi(poiArr) {
      this.map.remove(this.markers_Arr);
      let markers = poiArr.map((data) => {
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
        //   default:
        //     break;
        // }

        let temp = new AMap.Marker({
          map: this.map,
          name: data.bridgeName,
          icon: new AMap.Icon({
            image: icon,
            // size: new AMap.Size(22, 22), //图标大小
            imageSize: new AMap.Size(26, 26),
          }),
          position: data.addr,
          offset: new AMap.Pixel(-13, -13),
          // content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
          direction: "right", // 设置文本标注方位
        });
        temp.on("click", (e) => {
          this.openPoiDetail(data);
        });
        temp.name = data.bridgeName;
        return temp;
      });
      this.markers_Arr = markers;
    },
    //打开地图点标记-病害详情
    openPoiDetail(data) {
      getDiseaseDetailInfoById({ id: data.recordId }).then((res) => {
        let {
          diseaseDetail, //病害详情
          maintenance, //养护维修
          acceptance, //验收信息
        } = res.attachObj;
        //病害-数据处理
        diseaseDetail = diseaseDetail || {};
        //检查类型
        const paramIdObj = this.patrolTypeList.find(
          (a) => a.id === diseaseDetail.paramId
        );
        diseaseDetail.paramId = paramIdObj.name;
        //审核状态
        const signStatusObj = this.auditStatusList.find(
          (a) => a.id === diseaseDetail.signStatus
        );
        diseaseDetail.signStatus = signStatusObj.name;
     
        this.diseaseDetail = diseaseDetail;
        // console.log(this.diseaseDetail.attList)
        // this.diseaseDetail.attList.map((a) => a.attPath)
        this.detail_imgs_1 = this.diseaseDetail.attList
          ? this.diseaseDetail.attList.map((a) => a.attPath)
          : [];

        //养护-数据处理
        this.maintenance = maintenance || {};
   //预估工程量
         this.maintenance.expectWorkloadVaule =  this.maintenance.expectWorkloadVaule
          ?  this.maintenance.expectWorkloadVaule +
            ( this.maintenance.expectWorkloadCompany || "")
          : "";
        //实际工程量
         this.maintenance.realWorkload =  this.maintenance.realWorkload
          ?  this.maintenance.realWorkload +
            ( this.maintenance.expectWorkloadCompany || "")
          : "";




        this.detail_imgs_2 = this.maintenance.attList
          ? this.maintenance.attList.map((a) => a.attPath)
          : [];
        //验收-数据处理
        this.acceptance = acceptance || {};
        this.detail_imgs_3 = this.acceptance.attList
          ? this.acceptance.attList.map((a) => a.attPath)
          : [];

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
        opacity: 0.7,
        styles: {
          // height: [0, 300000],
          // opacity: 0.86
          fill: function(properties, b, c, d) {
            let adcode = properties.adcode;
            return getColorByAdcode();
          },
          "province-stroke": "#319fb6",
          "city-stroke": "#319fb6", // 中国地级市边界
          "county-stroke": "#319fb6", // 中国区县边界
        },
      });

      // disProvince.setMap(map);
      /*设置区域背景色-结束*/

      this.map = map;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
  // background: linear-gradient(to bottom, #003639 4%, #001d29 89%);
  background: rgba(11, 19, 27, 0.8);
  //   padding: 15px 15px 10px 10px;
  box-shadow: 0 10px 30px 0 #12334b inset;
  width: 620px;
  height: 540px;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  white-space: nowrap;

  .detail-header {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 10px 30px 0 #12334b inset;
    background: rgba(0, 29, 41, 1);
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
    .body-contentBlock {
      width: 33%;
      .contentBlock-title {
        color: #00f7d7;
        height: 26px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        line-height: 26px;
        letter-spacing: 2px;
      }
      .contentBlock-item {
        height: 370px;
        margin-top: 15px;
        padding: 10px;
        padding-left: 15px;
        border-left: 1px solid #00ffde;
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
      .show-imgs {
        height: 49px;
        .img {
          width: 72px;
          height: 49px;
          margin-right: 15px;
        }
      }
    }
    .body-contentBlock:nth-child(1) {
      .contentBlock-item {
        border-left: none;
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
