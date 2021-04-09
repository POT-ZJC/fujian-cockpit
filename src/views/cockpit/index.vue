<template>
  <router-view></router-view>
</template>
<script>
import {getAreaList,getRouteList} from '@/api/cockpit'
import {mutationsSet,store} from './cockpitStore'
import { resizeLoad, resizeRemove } from "./utils/onresize";
import './utils/commonFn' 
export default {
  watch: {
    count(val) {
      if (val > 1) {
        const areaLevelCascaderStr = JSON.stringify(this.areaLevelCascader);
        mutationsSet("areaLevelCascader", JSON.parse(areaLevelCascaderStr));
      }
    },
  },
  data() {
    return {
      count: 0,
      areaLevelCascader: [
        {
          value: "福建省",
          label: "福建省",
          levelName: "福建省",
          children: [
            {
              value: "区域",
              label: "区域",
              levelName: "区域L",
              disabled: true,
              children: [
                // {
                //   value: "福泉公司",
                //   label: "福泉公司",
                //   levelName: "区域公司",
                // },
              ],
            },
            {
              value: "路线",
              label: "路线",
              levelName: "路线L",
              disabled: true,
              children: [
                // {
                //   value: "高速1231",
                //   levelName: "路线",
                //   label: "高速123",
                // },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    resizeLoad();
  },
  destroyed() {
    resizeRemove();
  },
  mounted() {
    this.reqAreaList();
    this.reqRouteList();
  },
  methods: {
    //获取区域
    reqAreaList() {
      getAreaList().then((areaListRes) => {
        if (areaListRes) {
          console.log(areaListRes);
          let areaList = areaListRes.data;
          areaList.forEach((val) => {
            if (
              val.company.indexOf("厦门百城金安") === -1 ||
              val.company.indexOf("福州市交建") === -1
            ) {
              val.companyStr = val.company;
              val.company = this.filterStr(val.company);
            }
          });
          mutationsSet("areaList", areaList);
          this.handleArea(areaList);
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
          this.handleRoute(routeList);
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
    //
    handleRoute(data) {
      let currentRouteTotalNum = 0,
        currentRoadTotalNum = 0;
      let cascader_data = this.areaLevelCascader[0];
      let routeChildren = cascader_data.children[1].children;
      try {
        data.forEach((val) => {
          currentRouteTotalNum++;
          let obj = {
            children: [],
            levelName: "路线",
            type: "routeName",
            value: val.name,
            label: val.name,
          };

          const arr = val.sectionList || [];
          arr.forEach((item) => {
            currentRoadTotalNum++;
            obj.children.push({
              value: item.name,
              label: item.name,
              levelName: "路段",
              type: "sectionName",
            });
          });

          routeChildren.push(obj);
        });

        this.$set(this.areaLevelCascader, 0, cascader_data);
        mutationsSet("currentRouteTotalNum", currentRouteTotalNum);
        mutationsSet("currentRoadTotalNum", currentRoadTotalNum);
        // mutationsSet("currentAreaLevelValue", "福建省");
      } catch (err) {
        console.log(err);
      }
      this.count++;
    },
    //区域公司
    handleArea(data) {
      let cascader_data = this.areaLevelCascader[0];
      let compnayTotal = 0,
        centerTotal = 0,
        stationTotal = 0;
      try {
        //  debugger
        function didArea(arr, level) {
          let levelName = "",
            type = "";
          if (level === 0) {
            levelName = "区域公司";
            type = "company";
          } else if (level === 1) {
            levelName = "养护中心";
            type = "maintenanceCenter";
          } else if (level === 2) {
            levelName = "养护站";
            type = "maintenanceStation";
          }
          let newArr = [];
          arr.forEach((val) => {
            if (level === 0) {
              compnayTotal++;
            } else if (level === 1) {
              centerTotal++;
            } else if (level === 2) {
              stationTotal++;
            }
            newArr.push({
              value: level === 0 ? val.companyStr : val.name,
              label: level === 0 ? val.companyStr : val.name,
              levelName,
              type,
              children:
                val.childrenList && val.childrenList.length
                  ? didArea(val.childrenList, level + 1)
                  : null,
            });
          });
          return newArr;
        }
        cascader_data.children[0].children = didArea(data, 0);
        // console.log('areaChildren',areaChildren)
        this.$set(this.areaLevelCascader, 0, cascader_data);
        mutationsSet("compnayTotal", compnayTotal);
        mutationsSet("centerTotal", centerTotal);
        mutationsSet("stationTotal", stationTotal);
      } catch (err) {
        console.log(err);
      }
      this.count++;
    },
  },
};
</script>
