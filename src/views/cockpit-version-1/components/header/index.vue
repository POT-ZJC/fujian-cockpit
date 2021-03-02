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
            v-model="cascaderModel"
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
        {{ this.areaModel === "福建省" ? "" : this.areaModel }}
      </div>
      <!-- 年度选择 -->
      <div class="year-box">
        <el-select v-model="yearValue" placeholder="请选择" class="yaer-select">
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="year-label">
          年度
        </div>
      </div>
    </div>
    <div class="head-right">
      <el-button plain size="mini" round @click="dialogVisible = false"
        >检测</el-button
      >
      <el-button plain size="mini" round @click="dialogVisible = false"
        >监测</el-button
      >
      <el-input
        class="map-search"
        size="medium"
        v-model="mapModel"
        placeholder="请输入桥梁名称搜索地图"
      ></el-input>
    </div>
  </div>
</template>
<script>
import { mutationsSet, store } from "@/views/cockpit-version-1/cockpitStore";
export default {
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
        this.cascaderModel = this.areaModel;
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
      areaModel: "福建省",
      areaModelShow: "",
      areaSelectBtnTxt: "福建省",
      cascaderModel: "",
      dialogVisible: false,
      mapModel: "",
      yearValue: "2021",
      yearOptions: [
        { value: "2015" },
        { value: "2016" },
        { value: "2017" },
        { value: "2018" },
        { value: "2019" },
        { value: "2020" },
        { value: "2021" },
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
    handleRoute(data) {
      let currentRouteTotalNum=0,currentRoadTotalNum=0;
      let cascader_data = this.cascader_options[0];
      let routeChildren = cascader_data.children[1].children;
      try {
        for (let key in data) {
          currentRouteTotalNum++
          let obj = { children: [], levelName: "路线" };
          obj.value = key;
          obj.label = key;
          data[key].forEach((val) => {
            currentRoadTotalNum++
            obj.children.push({
              value: val.sectionName,
              label: val.sectionName,
              levelName: "路段",
            });
          });
          routeChildren.push(obj);
        }
        this.$set(this.cascader_options, 0, cascader_data);
        mutationsSet('currentRouteTotalNum',currentRouteTotalNum)
        mutationsSet('currentRoadTotalNum',currentRoadTotalNum)
        mutationsSet('currentLevelName','福建省')
      } catch (err) {
        console.log(err);
      }
    },
    //区域公司
    handleArea(data) {
      let cascader_data = this.cascader_options[0];
      let areaChildren = cascader_data.children[0].children;
      try {
        // areaChildren

        data.forEach((val) => {
          areaChildren.push({
            value: val.company,
            label: val.company,
            levelName: "区域公司",
          });
        });

        this.$set(this.cascader_options, 0, cascader_data);
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
      this.areaSelectBtnTxt = nodeEl[0].data.levelName;
      mutationsSet('currentLevelName', this.areaSelectBtnTxt)
      this.areaModel = this.cascaderModel;
      this.dialogVisible = false;
      //   console.log(nodeEl);
      // areaSelectBtnTxt
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  height: tovh(85px);
  display: flex;
  background-color: rgba(0, 13, 26, 0.7);
  .head-left {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    .head-title {
      color: #9dd2f7;
      font-size: torem(30px);
      font-weight: bold;
      margin-left: torem(20px);
      width: tovw(390px);
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
        z-index:999;
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
  .year-box {
    position: absolute;
    right: 0;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
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
  //   右边
  .head-right {
    width: 50%;
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: tovw(30px);
    .map-search {
      margin-left: tovw(30px);
      width: torem(450px);
      font-size: torem(16px);
    }
  }
}
</style>
