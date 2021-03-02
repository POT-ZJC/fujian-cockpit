import request from "@/utils/request";

// http://10.192.34.65:8555/cmct-bridge-demo/login/getAreaList
//区域
export const getAreaList = (data) => {
    return request("get", "/login/getAreaList", data);
  };
//路线
export const getRouteList = (data) => {
    return request("get", "/login/getLineList", data);
  };
  //路线路段坐标 -
  export const getRouteLnglatList = (data) => {
    return request("get", "/login/getRouteBaseInfoList", data);
  };
//查询桥梁规模/形式/技术状况统计-http://10.192.34.65:8555/cmct-bridge-demo/login/getBridgeScaleStatistics/1
export const getBridgeScale = (data) => {
  return request("get", "/login/getBridgeScaleStatistics", data);
};