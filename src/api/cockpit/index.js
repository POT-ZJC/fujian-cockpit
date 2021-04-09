
import request from "@/utils/request";

//区域
export const getAreaList = (data) => {
    return request("get", "/cmct-bridge-demo/login/getAreaList", data);
  };
//路线
export const getRouteList = (data) => {
    return request("get", "/cmct-bridge-demo/login/getLineList", data);
  };