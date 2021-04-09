import {
  getBridgeScale,
  getBridgeDistribution,
  getBridgeTechnicalStatus,
} from "@/api/cockpit/bridge";
import { bridgeMutationsSet, bridgeStore } from "../bridgeStore";
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
    data[bridgeStore.currentAreaLevelType] = bridgeStore.currentAreaLevelValue;
    getBridgeScale(data).then((res) => {
      // 桥梁规模分类：bridgeScaleStatistics    // bridgeScaleTotal:[],
      // 桥梁形式分类：bridgeTypeData       // bridgeTypeTotal:[],
      // 桥梁技术状况统计：bridgeLevelData         // bridgeLevelCondition:[],
      res.data.bridgeScaleStatistics.forEach((val) => (val.active = false));
      res.data.bridgeTypeData.forEach((val) => (val.active = false));

      bridgeMutationsSet("bridgeScaleTotal", res.data.bridgeScaleStatistics);
      bridgeMutationsSet("bridgeTypeTotal", res.data.bridgeTypeData);
      // mutationsSet("bridgeLevelCondition", res.data.bridgeLevelData);
    });
  },
  //桥梁分布
  getBridgeDistribution: (data) => {
    data = data || {};
    /* 传参
    {
      层级类型(currentAreaLevelType):层级值(currentAreaLevelValue),
      类型(type):类型值(getLevelToType('层级类型'))
    }
    */
    bridgeStore.currentAreaLevelType &&
      (data[bridgeStore.currentAreaLevelType] = bridgeStore.currentAreaLevelValue);
    getBridgeDistribution({
      ...data,
      type: getLevelToType(bridgeStore.currentAreaLevelType || ""),
    }).then((res) => {
      bridgeMutationsSet("bridgeDistributionData", {
        bridgeDistributionForm: res.data.bridgeDistributionForm || [],
        bridgeDistributionScale: res.data.bridgeDistributionScale || [],
      });
    });
  },
  //桥梁技术状况
  getBridgeTechnicalStatus(data) {
    data = data || {};
    bridgeStore.currentAreaLevelType &&
      (data[bridgeStore.currentAreaLevelType] = bridgeStore.currentAreaLevelValue);
    getBridgeTechnicalStatus({
      ...data,
      type: getLevelToType(bridgeStore.currentAreaLevelType || ""),
    }).then((res) => {
      bridgeMutationsSet("bridgeTechnicalStatus", res.data);
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
