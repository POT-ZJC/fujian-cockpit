<template>
  <div class="header">
    <div class="head-left">
      <!-- <div class="head-title">福建省桥梁技术状况驾驶舱</div> -->
      <div class="area-select">
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
            :options="areaLevelCascader"
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

      <!-- 选中的区域名称 -->
      <div class="selected-area">
        {{ this.areaModelShow === "福建省" ? "全省" : this.areaModelShow }}
      </div>
    </div>
    <div class="head-center">
      <div class="head-title">福建省路网级道路基础设施检养数字化平台</div>
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
    </div>
  </div>
</template>
<script>
import { mutationsSet, store } from "@/views/cockpit/cockpitStore";
import cockpitSelect from "@/views/cockpit/cockpit-bridge-v1/components/ui/select";
// const commonFun = require("@/views/cockpit/cockpit-overview-v1/commonAjaxFun");
export default {
  components: {
    cockpitSelect,
  },
  prop: {
    areaModel: {
      type: String,
      default: "",
    },
    areaLevel: {
      type: String,
      default: "",
    },
  },
  computed: {
    areaList() {
      return store.areaList;
    }, //区域
    routeList() {
      return store.routeList;
    }, //路线
    //区域级别选择
    areaLevelCascader() {
      return store.areaLevelCascader;
    },
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.areaModelShow = this.areaModel;
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
      ],
    };
  },

  mounted() {
    this.areaSelectDialogEvent();
  },
  methods: {
    areaSelectDialogEvent() {
      document.querySelector("body").addEventListener("click", () => {
        this.dialogVisible = false;
      });
    },
    confirmArea() {
      const nodeEl = this.$refs["area-select"].getCheckedNodes();
      console.log(nodeEl);
      const data = nodeEl[0].data;
      this.updatePageInfo(data);
    },
    updatePageInfo(data) {
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
      // commonFun.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  // background-color: rgba(0, 13, 26, 0.7);
  // background-color: #02233e;
  background-image: url("./img/head-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  .year-box {
    // position: absolute;
    right: 0;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    margin-right: torem(40px);
    .year-select {
      width: torem(50px);
    }
    /deep/.cockpit-select {
      border: 0;
      background: none;
      font-size: torem(28px);
      .el-scrollbar__wrap {
        padding-bottom: 17px;
      }
    }
  }
  /deep/.select-txt {
    font-family: DINENGSCHRIFTSTD;
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
    width: topw(480px);
    height: 100%;
    display: flex;
    align-items: center;
    // .head-title {
    //   font-size: torem(36px);
    //   font-family: 百度综艺简体;
    //   transform: skewX(-10deg);
    //   // font-weight: bold;
    //   margin-left: torem(20px);
    //   width: tovw(560px);
    //   letter-spacing: 6px;
    //   // color: #03c0f3;
    //   background: linear-gradient(
    //     175deg,
    //     rgba(53, 224, 220, 1) 0%,
    //     rgba(11, 124, 234, 1)
    //   );
    //   -webkit-background-clip: text;
    //   background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   text-fill-color: transparent;
    // }
    .area-select {
      // width: tovw(120px);
      // height: tovh(60px);
      position: relative;
      margin-left: torem(22px);
      .cascader-open-btn {
        cursor: pointer;
        width: torem(130px);
        height: torem(50px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: torem(20px);
        font-weight: bold;
        // background-color: rgba(24, 33, 47, 0.8);
        color: #fff;
        background-image: linear-gradient(
            -1deg,
            #071019 0%,
            #04233e 50%,
            #00396a 100%
          ),
          linear-gradient(#2c506a, #2c506a);
        background-blend-mode: normal, normal;
        border: solid 2px #003868;
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
      margin-left: torem(20px);
      color: #6ff5fe;
      font-size: torem(18px);
      font-weight: bold;
    }
  }
  .head-center {
    width: topw(960px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .head-title {
      font-family: 百度综艺简体;
      font-size: torem(40px);
      // font-weight: normal;
      // font-stretch: normal;
      // line-height: 30px;
      letter-spacing: 1px;
      // color: #ffffff;
      background: linear-gradient(
        to bottom,
        #ffffff 0%,
        #c1c1c1 50%,
        #666666 90%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
  }
  //   右边
  .head-right {
    width: topw(480px);
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: topw(20px);
    justify-content: flex-end;
    .map-search {
      margin-left: torem(20px);
      margin-right: torem(20px);
      width: torem(420px);
      border: solid 1px #69a8f6;
      display: flex;
      align-items: center;
      height: torem(40px);
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
    &:hover {
      color: #3a8ff6;
      &::after {
        background: linear-gradient(
          68deg,
          rgba(2, 5, 42, 0) 0%,
          #3a8ff6 50%,
          rgba(2, 5, 42, 0) 100%
        );
      }
    }
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
