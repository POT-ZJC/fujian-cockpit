import Vue from "vue";
const obj = {
  fontSize:86,
  // areaList: [], //区域
  // routeList: null, //路线
  currentAreaLevelType: "", //当前区域/路线层级类型 // "routeName": "" "sectionName": "路段名称","company": "区域名称", "maintenanceCenter": "养护中心", "maintenanceStation": "养护站"
  currentAreaLevelTypeName: "", //当前区域/路线层级类型名称  路线名称,路段名称,区域名称,养护中心,养护站,
  currentAreaLevelValue: "福建省", //当前区域/路线层级的值
  searchMapKeyword: "", //搜索地图关键字
  currentRouteTotalNum: 0, //当前路线总数
  currentRoadTotalNum: 0, //当前路段总数
  compnayTotal: 0,//区域公司总数
  centerTotal: 0,//养护中心总数
  stationTotal: 0,//养护站总数
  bridgeScaleTotal: [], //桥梁规模总览
  bridgeTypeTotal: [], //桥梁形式总览
  bridgeOverviewActive: {
    all: true,
    bridgeSize: {}, //桥长/规模
    structureType: {}, //桥型/形式
  },
  bridgeLevelCondition: [], //桥梁技术状况
  //     桥梁规模分类：bridgeScaleStatistics
  // 桥梁形式分类：bridgeTypeData
  // 桥梁技术状况统计：bridgeLevelData
 bridgeDistributionData: {
    //桥梁分布
    bridgeDistributionForm: [], //规模
    bridgeDistributionScale: [], //形式
  },
  bridgeTechnicalStatus: { //桥梁技术状况
    bridgeDistributionScale:[],//规模
    bridgeDistributionForm:[] //形式
  },
};
export const bridgeStore = Vue.observable(obj);
export const mutations = {};
export const bridgeMutationsSet = (key, data) => {
  bridgeStore[key] = data;
};
