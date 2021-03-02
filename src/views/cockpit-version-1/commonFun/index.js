import {
  getAreaList,
  getRouteList,
  getBridgeScale,
} from "@/api/cockpit-version-1";
import { mutationsSet, store } from "../cockpitStore";
export const ajaxFunObj = {
  getBridgeScale: () => {
    getBridgeScale().then((res) => {
      // 桥梁规模分类：bridgeScaleStatistics    // bridgeScaleTotal:[],
      // 桥梁形式分类：bridgeTypeData       // bridgeTypeTotal:[],
      // 桥梁技术状况统计：bridgeLevelData         // bridgeLevelCondition:[],
      mutationsSet("bridgeScaleTotal", res.data.bridgeScaleStatistics);
      mutationsSet("bridgeTypeTotal", res.data.bridgeTypeData);
      mutationsSet("bridgeLevelCondition", res.data.bridgeLevelData);
    });
  },
};
export function initData() {
  ajaxFunObj.getBridgeScale();
}

// export { initData };
