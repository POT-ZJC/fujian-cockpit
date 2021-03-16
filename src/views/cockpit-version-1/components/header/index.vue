<template>
  <div class="header">
    <div class="head-left">
      <div class="head-title">福建省桥梁技术状况驾驶舱</div>
      <div class="area-select">
        <div class="pa angle-tl"></div>
        <div class="pa angle-tr"></div>
        <div class="pa angle-bl"></div>
        <div class="pa angle-br"></div>

        <div
          class="cascader-open-btn"
          @click="dialogVisible = !dialogVisible"
          @click.stop
        >
          {{ areaSelectBtnTxt }}
        </div>
        <!-- 结构层级选择面板 -->
        <div class="area-select-dialog" v-if="dialogVisible" @click.stop>
          <el-cascader-panel
            ref="area-select"
            class="area-select-panel"
            :options="cascader_options"
            :props="{ checkStrictly: true, emitPath: false }"
            v-model="areaModel"
          ></el-cascader-panel>
          <div class="dialog-footer">
            <el-button plain size="mini" @click="dialogVisible = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="confirmArea"
              >确定</el-button
            >
          </div>
        </div>
      </div>

      <!-- 选中的名称 -->
      <div class="selected-area">
        {{ this.areaModelShow === "福建省" ? "" : this.areaModelShow }}
      </div>
    </div>
    <div class="head-right">
      <!-- 年度选择 -->
      <div class="year-box">
        <cockpit-select
          class="year-select"
          :hasClear="false"
          v-model="nowYear"
          :optionData="yearOptions"
          placeholder="请选择"
        />

        <div class="year-label">
          年度
        </div>
      </div>
      <div class="map-search">
        <input
          @keyup.enter="searchMap"
          v-model="searchMapKeyword"
          placeholder="请输入桥梁名称搜索地图"
        />
        <div class="search-btn" @click="searchMap">
          <svg
            t="1615451899457"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3108"
            width="32"
            height="32"
          >
            <path
              d="M938.176 832.512l-214.336-214.4c-2.496-2.496-5.248-4.352-7.872-6.528 36.16-55.552 57.344-121.728 57.344-193.024C773.312 222.72 614.592 64 418.688 64 222.848 64 64 222.72 64 418.624s158.848 354.624 354.688 354.624c71.232 0 137.472-21.248 193.216-57.344 1.984 2.752 3.904 5.376 6.336 7.744l214.4 214.528C847.232 952.768 866.24 960 885.376 960s38.208-7.232 52.8-21.888C967.296 908.992 967.296 861.76 938.176 832.512M418.688 661.248c-133.76 0-242.688-108.864-242.688-242.624 0-133.76 108.928-242.688 242.688-242.688s242.624 108.928 242.624 242.688C661.312 552.384 552.448 661.248 418.688 661.248"
              p-id="3109"
              fill="#69a8f6"
            ></path>
          </svg>
        </div>
      </div>
      <div class="link-outurl">检测</div>
      <div class="divide-line"></div>
      <div class="link-outurl">监测</div>
    </div>
  </div>
</template>
<script>
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
import cockpitSelect from "@/views/cockpit-version-1/components/ui/select";
const commonFun = require("@/views/cockpit-version-1/commonFun");
export default {
  components: {
    cockpitSelect,
  },
  computed: {
    areaList() {
      return store.areaList;
    }, //区域
    routeList() {
      return store.routeList;
    }, //路线
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.areaModelShow = this.areaModel;
      }
    },
    routeList(val) {
      if (val) {
        this.handleRoute(val);
      }
    },
    areaList(val) {
      if (val) {
        this.handleArea(val);
      }
    },
  },
  data() {
    return {
      nowYear: "2021",
      areaModel: "福建省",
      areaModelShow: "福建省",
      areaSelectBtnTxt: "福建省",
      // cascaderModel: "",
      dialogVisible: false,
      searchMapKeyword: "",
      yearValue: "2021",
      yearOptions: [
        { value: "2021" },
        { value: "2020" },
        { value: "2019" },
        { value: "2018" },
        { value: "2017" },
        { value: "2016" },
        { value: "2015" },
        // { value: "2014" },
        // { value: "2013" },
        // { value: "2012" },
        // { value: "2011" },
        // { value: "2005" },
        // { value: "2006" },
      ],
      cascader_options: [
        {
          value: "福建省",
          label: "福建省",
          levelName: "福建省",
          children: [
            {
              value: "区域",
              label: "区域",
              levelName: "区域",
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
              levelName: "路线",
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

  mounted() {
    this.areaSelectDialogEvent();
  },
  methods: {
    searchMap() {
      mutationsSet("searchMapKeyword", this.searchMapKeyword);
    },
    handleRoute(data) {
      let currentRouteTotalNum = 0,
        currentRoadTotalNum = 0;
      let cascader_data = this.cascader_options[0];
      let routeChildren = cascader_data.children[1].children;
      try {
        for (let key in data) {
          currentRouteTotalNum++;
          let obj = { children: [], levelName: "路线", type: "routeName" };
          obj.value = key;
          obj.label = key;
          data[key].forEach((val) => {
            currentRoadTotalNum++;
            obj.children.push({
              value: val.sectionName,
              label: val.sectionName,
              levelName: "路段",
              type: "sectionName",
            });
          });
          routeChildren.push(obj);
        }
        this.$set(this.cascader_options, 0, cascader_data);
        mutationsSet("currentRouteTotalNum", currentRouteTotalNum);
        mutationsSet("currentRoadTotalNum", currentRoadTotalNum);
        mutationsSet("currentAreaLevelValue", "福建省");
      } catch (err) {
        console.log(err);
      }
    },
    //区域公司
    handleArea(data) {
      let cascader_data = this.cascader_options[0];
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
        this.$set(this.cascader_options, 0, cascader_data);

        mutationsSet("compnayTotal", compnayTotal);
        mutationsSet("centerTotal", centerTotal);
        mutationsSet("stationTotal", stationTotal);
      } catch (err) {
        console.log(err);
      }
    },
    areaSelectDialogEvent() {
      document.querySelector("body").addEventListener("click", () => {
        this.dialogVisible = false;
      });
    },
    confirmArea() {
      const nodeEl = this.$refs["area-select"].getCheckedNodes();
      console.log(nodeEl);
      const data = nodeEl[0].data;
      this.areaSelectBtnTxt = data.levelName;
      if (this.areaModelShow !== data.label) {
        //   currentAreaLevelType:'',//当前区域/路线层级类型
        // currentAreaLevelTypeName:'',//当前区域/路线层级类型名称
        // currentAreaLevelValue:'',//当前区域/路线层级的值
        // searchMapKeyword:'',//搜索地图关键字
        mutationsSet("currentAreaLevelValue", data.value);
        mutationsSet("currentAreaLevelType", data.type);
        mutationsSet("currentAreaLevelTypeName", data.levelName);
        mutationsSet("searchMapKeyword", this.searchMapKeyword);
        this.areaModelShow = data.value;
        this.areaModel = data.value;
      }

      this.dialogVisible = false;
      commonFun.initData();
      //   console.log(nodeEl);
      // areaSelectBtnTxt
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: tovh(75px);
  display: flex;
  // background-color: rgba(0, 13, 26, 0.7);
  background-color: #112035;
  .year-box {
    // position: absolute;
    right: 0;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    .year-select {
      width: torem(80px);
    }
    /deep/.cockpit-select {
      border: 0;
      background: none;
      font-size: torem(28px);
    }
  }
  .yaer-select {
    width: torem(110px);
  }
  .year-label {
    margin-left: torem(10px);
    color: #fff;
    font-size: torem(20px);
    font-weight: bold;
  }
  .head-left {
    position: relative;
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    .head-title {
      font-size: torem(36px);
      font-family: BDZYJT--GB1-0;
      transform: skewX(-10deg);
      font-weight: bold;
      margin-left: torem(20px);
      width: tovw(560px);
      letter-spacing: 6px;
      // color: #03c0f3;
      background: linear-gradient(
        172deg,
        rgba(53, 224, 220, 0.91) 50%,
        rgba(11, 124, 234, 0.91)
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    .area-select {
      // width: tovw(120px);
      // height: tovh(60px);
      position: relative;
      .angle-tl {
        top: torem(-7px);
        width: torem(18px);
        height: torem(12px);
        left: torem(-10px);
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
      }
      .angle-tr {
        top: torem(-7px);
        right: torem(-10px);
        width: torem(18px);
        height: torem(12px);
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
      }
      .angle-bl {
        bottom: torem(-7px);
        left: torem(-10px);
        width: torem(18px);
        height: torem(12px);
        border-bottom: 1px solid #fff;
        border-left: 1px solid #fff;
      }
      .angle-br {
        bottom: torem(-7px);
        right: torem(-10px);
        width: torem(18px);
        height: torem(12px);
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
      }
      .cascader-open-btn {
        cursor: pointer;
        width: torem(130px);
        height: torem(40px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: torem(26px);
        font-weight: bold;
        background-color: rgba(24, 33, 47, 0.8);
        color: #d0c383;
      }
      .area-select-dialog {
        z-index: 999;
        position: absolute;
        padding: torem(10px);
        top: tovh(45px);
        left: 0;
        background-color: rgba(0, 13, 26, 1);
        .dialog-footer {
          text-align: right;
          margin-top: torem(10px);
        }
      }
    }
    .selected-area {
      margin-left: torem(40px);
      color: #deb610;
      font-size: torem(22px);
      font-weight: bold;
    }
  }

  //   右边
  .head-right {
    width: 45%;
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: tovw(30px);
    .map-search {
      margin-left: torem(30px);
      width: torem(420px);
      border: solid 1px #69a8f6;
      display: flex;
      align-items: center;
      height: torem(40px);
      margin-right: torem(70px);
      padding-left: torem(12px);
      input {
        width: torem(375px);
        height: torem(36px);
        font-size: torem(16px);
        color: #fff;
        border: none;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
      }
      .search-btn {
        cursor: pointer;
        width: torem(36px);
        height: torem(36px);
      }
    }
  }
  .divide-line {
    height: 0.2rem;
    margin: 0 torem(8px);
    border-left: 1px solid #5178c4;
  }
  .link-outurl {
    position: relative;
    padding: 0 torem(10px);
    cursor: pointer;
    font-size: torem(16px);
    color: #ffffff;
    text-shadow: rgba(255, 255, 255, 0.8) 0 0 0.3rem;
    // inset 0px torem(4px) torem(13px) 0px rgba(175, 204, 247, 0.53);
    &::after {
      position: absolute;
      top: torem(26px);
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        68deg,
        rgba(2, 5, 42, 0) 0%,
        #fff 50%,
        rgba(2, 5, 42, 0) 100%
      );
      content: "";
    }
  }
}
</style>
