import axios from "axios";
import { Loading, MessageBox, Message } from "element-ui";
import store from "@/store";
// import { getToken } from '@/utils/auth'

const api_root =
  process.env.NODE_ENV == "development" ? "/api" : "http://10.192.34.65:8080";
// const api_root = process.env.NODE_ENV == "development" ? "http://10.192.34.65:8080" : "/api";

let requestCount = 0;
let loadingInstance;

function addGlobalLoading(config) {
  if (!config || config.globalLoading === false) {
    return;
  }
  requestCount++;
  loadingInstance = Loading.service({
    background: "rgba(0,0,0,0.4)",
  });
}

function closeGlobalLoading(config) {
  if (!config || config.globalLoading === false) {
    return;
  }
  if (--requestCount < 1) {
    loadingInstance.close();
  }
}

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30 * 1000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.url = api_root + config.url;
    // do something before request is sent
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    config.timeout = 30 * 1000;
    //   const token = getToken()
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    //   if (token) {
    // 	  config.headers['token'] = token
    //   }
    config.headers["scope"] = "web";

    console.log(config);
    addGlobalLoading(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   
   */
  (response) => {
    const { config, data: res } = response;
    closeGlobalLoading(config);

    // if the custom code is not 0, it is judged as an error.
    if (res.statusCode !== "200") {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008) {
        // to re-login
        // MessageBox.confirm('会话已过期，请重新登录', {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        // }).then(() => {
        //     store.dispatch('user/resetToken').then(() => {
        //         location.reload()
        //     })
        // })
        // Message.error('用户登陆已过期，请重新登录')
        // this.$router.push('/login')
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    closeGlobalLoading(error);
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

async function request(type, url, data, other) {
  // ("/cockpit/getBridgeListByParam", {
  //     params
  //   }
  // service
  if (type === "get") {
    return await service[type](url, { params: data });
  } else {
    return await service[type](url, data);
  }
}

export default request;
