import Vue from "vue";
const obj = {
  areaList: [], //区域
  routeList: null, //路线
  currentRouteTotalNum: 0, //当前路线总数
  currentRoadTotalNum: 0, //当前路段总数
  routeLnglatList: [], //路线坐标
  bridgeScaleTotal: [], //桥梁规模总览
  bridgeTypeTotal: [], //桥梁形式总览
  bridgeLevelCondition: [], //桥梁技术状况
  //     桥梁规模分类：bridgeScaleStatistics
  // 桥梁形式分类：bridgeTypeData
  // 桥梁技术状况统计：bridgeLevelData
  wideScreenLevel: 1, //宽屏等级 0  1  2  ; 当屏幕宽高比大于2.85时 =2  当屏幕宽高比大于等于3.4时=3  否则默认为1
};
export const store = Vue.observable(obj);
export const mutations = {};
export const mutationsSet = (key, data) => {
  store[key] = data;
};
