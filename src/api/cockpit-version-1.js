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
//桥梁总览-规模/形式-http://10.192.34.65:8555/cmct-bridge-demo/login/getBridgeScaleStatistics/1
export const getBridgeScale = (data) => {
  return request("get", "/login/getBridgeScaleStatistics", data);
};
//桥梁模糊查询
export const getQueryBridge = (data) => {
  return request("get", "/login/queryBridgeBaseInfo", data);
};
//桥梁分布查询-login/getBridgeDistribution 
export const getBridgeDistribution = (data) => {
  return request("get", "/login/getBridgeDistribution", data);
};
//桥梁技术状况- 
export const getBridgeTechnicalStatus = (data) => {
  return request("get", "/login/getBridgeTechnicalStatus", data);
};