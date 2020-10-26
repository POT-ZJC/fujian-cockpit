<template>
  <!-- -检查计数 -->

  <el-row class="check-layout">
    <el-col
      :span="12"
      class="check-item"
      v-for="(item, index) in dataList"
      :key="item.name"
    >
      <div class="check-left">
        <img class="icon" :src="imgUrl[index]" />
      </div>
      <div class="check-right">
        <div class="">{{ item.name }}</div>
        <div class="countNum">{{ item.countNum }}</div>
        <div>
          年同比<span class="ratioNum ratioUp"> {{ item.ratioNum }}次</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
export default {
  components: {
    moduleTitle,
  },
  props: {
    dataList: {
      type: Array,
      default() {
        [
          {
            name: "日巡察（次）",
            countNum: 788,
            ratioNum: 45,
          },
          {
            name: "夜巡查（次）",
            countNum: 211,
            ratioNum: 12,
          },
          {
            name: "经常检查（次）",
            countNum: 356,
            ratioNum: 56,
          },
          {
            name: "定期检查（次）",
            countNum: 412,
            ratioNum: 78,
          },
        ];
      },
    },
  },
  data() {
    return {
      imgUrl: [
        require("./img/bhjc_icon.svg"),
        require("./img/fx_icon.svg"),
        require("./img/sjxf_icon.svg"),
        require("./img/fcwxf_icon.svg"),
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.check-layout {
  width: 100%;
  padding-top: 38px;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding-left: 26px;
}
.check-item {
  height: 80px;
  margin-bottom: 30px;
  display: flex;
  .check-left {
    width: 38%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .icon {
      width: 45%;
      height: 40%;
    }
  }
  .check-right {
    flex: 1;
    color: #8291a9;
    font-size: 12px;
    .countNum {
      font-size: 40px;
      font-family: DINEngschriftStd;
      color: #03cef0;
      line-height: 46px;
    }
    .ratioNum {
      color: #df3141;
      position: relative;
      padding-left: 15px;
    }
    .ratioUp {
      &::before {
        content: "↑";
        position: absolute;
        top: -2px; /*no*/
        left: 10px;
      }
    }
    .ratioDown {
      &::before {
        content: "↓";
        position: absolute;
        top: -2px; /*no*/
        left: 10px;
      }
    }
  }
}
</style>
