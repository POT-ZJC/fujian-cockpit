<template>
  <div class="show-number">
    <div class="number-item" v-for="item in list" :key="item.name">
      <div class="item-title">{{ item.name }}</div>
      <div class="module-pub item-content">
        <div class="content-up">
          <span class="content-number">{{ item.number }}</span
          >{{ item.unit }}
        </div>
        <div>
          年同比
          <span class="content-compared-up" v-if="item.comparedNumber > 0"
            >{{ item.comparedNumber }}{{ item.comparedUnit }}</span
          >
          <span
            class="content-compared-down"
            v-else-if="item.comparedNumber < 0"
            >{{ item.comparedNumber * -1 }}{{ item.comparedUnit }}</span
          >
          <span v-else>持平</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "桥梁总数",
          number: 578,
          unit: "座",
          comparedNumber: 12, //对比数字
          comparedUnit: "座", //对比单位
        },
        {
          name: "主桥",
          number: 312,
          unit: "座",
          comparedNumber: -11, //对比数字
          comparedUnit: "座", //对比单位
        },
        {
          name: "引桥",
          number: 266,
          unit: "座",
          comparedNumber: 2, //对比数字
          comparedUnit: "座", //对比单位
        },
        {
          name: "分布市区",
          number: 8,
          unit: "个",
          comparedNumber: 3, //对比数字
          comparedUnit: "个", //对比单位
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.show-number {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 1.25rem;
  justify-content: space-between;

  .number-item {
    width: 2.2917rem;
    margin: 0 24px;
    height: 100%;
    border-radius: 0.0625rem;
    display: flex;
    flex-direction: column;
    .item-title {
      font-size: 0.1458rem;
      font-weight: 700;
      flex-shrink: 0;
      line-height: 0.3333rem;
      color: #edf4fb;
      text-align: left;
    }
    .item-content {
      // height: 0.9167rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 0.2083rem;
      font-size: 0.125rem;
      color: #edf4fb;
      border-radius: 0.0625rem;
      .content-up {
        position: relative;
        padding-right: 0.4167rem;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.4167rem;
          height: 0.3125rem;
          background: url("./img/num-file.png") no-repeat;
          background-color: rgba(255, 255, 255, 0.2);
          background-position: center center;
          background-size: 55%;
          border-radius: 0.2083rem;
          content: "";
        }
      }
      .content-number {
        margin-right: 0.125rem;
        // font-family: DINEngschriftStd;
        font-size: 0.3125rem;
        color: #fdce44;
      }
      .content-compared-up {
        font-size: 0.125rem;
        position: relative;
        color: #3dff19;
         padding-left: 15px;
        &::before {
          content: "↑";
          position: absolute;
          left: 5px;
          top: -2px;
        }
      }
      .content-compared-down {
        font-size: 0.125rem;
        color: #df3141;
        position: relative;
        padding-left: 15px;
        &::before {
          content: "↓";
          position: absolute;
          left: 5px;
          top: -2px;
        }
      }
    }
  }
}
</style>
