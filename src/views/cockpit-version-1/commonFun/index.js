import {
  getAreaList,
  getRouteList,
  getBridgeScale,
  getBridgeDistribution,
  getBridgeTechnicalStatus,
} from "@/api/cockpit-version-1";
import { mutationsSet, store } from "../cockpitStore";
function getLevelToType(data) {
  let type = "0";
  switch (data) {
    case "company":
      type = "1";
      break;
    case "maintenanceCenter":
      type = "2";
      break;
    case "maintenanceStation":
      type = "3";
      break;
    case "routeName":
      type = "4";
      break;
    case "sectionName":
      type = "5";
      break;
    default:
      null;
  }
  return type;
}
export const ajaxFunObj = {
  // 桥梁总览
  getBridgeScale: () => {
    let data = {};
    data[store.currentAreaLevelType] = store.currentAreaLevelValue;
    getBridgeScale(data).then((res) => {
      // 桥梁规模分类：bridgeScaleStatistics    // bridgeScaleTotal:[],
      // 桥梁形式分类：bridgeTypeData       // bridgeTypeTotal:[],
      // 桥梁技术状况统计：bridgeLevelData         // bridgeLevelCondition:[],
      res.data.bridgeScaleStatistics.forEach((val) => (val.active = false));
      res.data.bridgeTypeData.forEach((val) => (val.active = false));

      mutationsSet("bridgeScaleTotal", res.data.bridgeScaleStatistics);
      mutationsSet("bridgeTypeTotal", res.data.bridgeTypeData);
      // mutationsSet("bridgeLevelCondition", res.data.bridgeLevelData);
    });
  },
  //桥梁分布
  getBridgeDistribution: (data) => {
    data = data || {};
    store.currentAreaLevelType &&
      (data[store.currentAreaLevelType] = store.currentAreaLevelValue);
    getBridgeDistribution({
      ...data,
      type: getLevelToType(store.currentAreaLevelType || ""),
    }).then((res) => {
      mutationsSet("bridgeDistributionData", {
        bridgeDistributionForm: res.data.bridgeDistributionForm || [],
        bridgeDistributionScale: res.data.bridgeDistributionScale || [],
      });
    });
  },
  //桥梁技术状况
  getBridgeTechnicalStatus(data) {
    data = data || {};
    store.currentAreaLevelType &&
      (data[store.currentAreaLevelType] = store.currentAreaLevelValue);
    getBridgeTechnicalStatus({
      ...data,
      type: getLevelToType(store.currentAreaLevelType || ""),
    }).then((res) => {
      mutationsSet("bridgeTechnicalStatus", res.data.bridgeDistributionScale);
    });
  },
};
export function initData() {
  ajaxFunObj.getBridgeScale();
  ajaxFunObj.getBridgeDistribution();
  ajaxFunObj.getBridgeTechnicalStatus();
}
// export function updateData(data) {
//   data={

//   }
//   ajaxFunObj.getBridgeScale();
//   ajaxFunObj.getBridgeDistribution();
// }

// export { initData };
