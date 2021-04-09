import Vue from "vue";
const obj = {
  fontSize:86,
  areaList: [], //区域
  routeList: null, //路线
  areaLevelCascader:[],//区域级别选择
  currentAreaLevelType: "福建省", //当前区域/路线层级类型 // "routeName": "" "sectionName": "路段名称","company": "区域名称", "maintenanceCenter": "养护中心", "maintenanceStation": "养护站"
  currentAreaLevelTypeName: "福建省", //当前区域/路线层级类型名称  路线名称,路段名称,区域名称,养护中心,养护站,
  currentAreaLevelValue: "福建省", //当前区域/路线层级的值
  // searchMapKeyword: "", //搜索地图关键字
  currentRouteTotalNum: 0, //当前路线总数
  currentRoadTotalNum: 0, //当前路段总数
  // compnayTotal: 0,//区域公司总数
  // centerTotal: 0,//养护中心总数
  // stationTotal: 0,//养护站总数
  routeLnglatList: [], //路线坐标
  overviewActiveType:'',//当前激活得类型//  路面\桥梁\隧道\边坡\涵洞\机电  
  
  
  wideScreenLevel: 1, //宽屏等级 0  1  2  ; 当屏幕宽高比大于2.85时 =2  当屏幕宽高比大于等于3.4时=3  否则默认为1
  
};
export const store = Vue.observable(obj);
export const mutations = {};
export const mutationsSet = (key, data) => {
  store[key] = data;
};
