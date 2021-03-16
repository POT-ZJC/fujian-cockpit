import request from "@/utils/request";

/**/
//http://10.192.34.65:8080/cockpit/getBridgeListByParam


//查询桥梁
export const getBridgeListByParam = (data) => {
  return request("get", "/BMS/cockpit/getBridgeListByParam", data);
};
//查询桥梁详情
// /cockpit/getBridgeDetailInfoById?bridgeId=480670b7-9d11-11e7-93c0-00163e042bbd
export const getBridgeDetailInfoById = (data) => {
  return request("get", "/BMS/cockpit/getBridgeDetailInfoById", data);
};

//查询病害
// http://10.192.34.65:8080/cockpit/getDiseaseListByParam 
export const getDiseaseListByParam = (data) => {
  return request("get", "/BMS/cockpit/getDiseaseListByParam", data);
};
//查询病害详情
//http://10.192.34.65:8080/cockpit/getDiseaseDetailInfoById?id=
export const getDiseaseDetailInfoById = (data) => {
  return request("get", "/BMS/cockpit/getDiseaseDetailInfoById", data);
};