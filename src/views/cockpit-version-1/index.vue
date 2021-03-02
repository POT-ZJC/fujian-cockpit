<template>
  <div class="cockpit-version-1">
    <!-- <div class="header"></div> -->
    <headerEl />
    <div class="main-layout">
      <div class="main-left">
        <div class="map-container">
          <myAmap />
        </div>
      </div>
      <div class="main-right"></div>
    </div>
  </div>
</template>
<script>
import { computedFontSize } from "./utils/htmlFontSize";
import myAmap from "./components/myAmap";
import { mutationsSet, store } from "./cockpitStore";
import headerEl from "./components/header";
import {
  getAreaList,
  getRouteList, 
} from "@/api/cockpit-version-1";
export default {
  components: { headerEl, myAmap },
  data() {
    return {
      // areaList: [],
      // routeList: [],
    };
  },
  mounted() {
    this.windowResize;
  },
  computed: {
    wideScreenLevel() {
      return store.wideScreenLevel;
    },
  },
  mounted() {
    this.windowResize();
    this.initData();
  },
  methods: {
    //初始化页面数据
    initData() {
      this.reqAreaList();
      this.reqRouteList(); 
    }, 
    //获取区域
    reqAreaList() {
      getAreaList().then((areaListRes) => {
        if (areaListRes) {
          console.log(areaListRes);
          let areaList = areaListRes.data;
          areaList.forEach((val) => {
            val.company = this.filterStr(val.company);
          });
          mutationsSet("areaList", areaList);
        } else {
          mutationsSet("areaList", []);
        }
      });
    },
    // 获取路线
    reqRouteList() {
      getRouteList().then((routeListRes) => {
        if (routeListRes) {
          console.log(routeListRes);
          let routeList = routeListRes.data;
          mutationsSet("routeList", routeList);
        } else {
          mutationsSet("routeList", []);
        }
      });
    },
    //过滤分公司和公司字符串
    filterStr(data) {
      const strs = ["分公司", "公司"];
      strs.forEach((val) => {
        // data.replace(/ /g,'')
        data = data.replace(new RegExp(`[${val}]`, "g"), "");
      });

      return data;
    },
    windowResize() {
      // 监听屏幕
      function watchClien() {
        computedFontSize(document.querySelector("html"));
        const _w = document.body.clientWidth,
          _h = document.body.clientHeight;
        const clientRatio = _w / _h;
        //设置宽屏等级
        if (clientRatio >= 3.4) {
          //特宽
          mutationsSet("wideScreenLevel", 3);
        } else if (clientRatio >= 2.6) {
          //宽
          mutationsSet("wideScreenLevel", 2);
        } else {
          //普通
          mutationsSet("wideScreenLevel", 1);
        }
      }
      watchClien();
      window.onresize = () => {
        watchClien();
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.cockpit-version-1 {
  // min-width: 1800px;
  // min-height: 900px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(147, 190, 199, 1);
  .main-layout {
    height: tovh(990px);
    width: 100%;
    .main-left {
      width: 50%;
      // height: tovh(760px);
      height: 100%;
      .map-container {
        overflow: hidden;
        border-radius: torem(6px);
        width: 100%;
        height: tovh(760px);
      }
    }
  }
}
</style>
