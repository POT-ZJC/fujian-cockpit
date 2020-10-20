<template>
  <div
    class="charts-util-block"
    :class="isMain?'fff':'util-block'"
    :style="{'height':height-0.3+'rem','width':width-0.2+'rem'}"
  >
    <div class="charts-header">
      <div class="img-title" v-if="headerTitle">
        <!-- <img :src="gdImg" alt /> -->
        <!-- <div class=""></div> -->
        <span class="toh" :title="headerTitle">{{headerTitle}}</span>
      </div>
      <slot name="header-right" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
const gdImg = require("../../../assets/utilImg/gd.png");
export default {
  name: "ChartsUtilBlock",
  props: {
    headerTitle: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    isMain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gdImg: gdImg
    };
  },
  mounted() {
    console.log(this.isMain);
  }
};
</script>

<style lang="scss" scoped>
.fff {
  color: #fff;
}

.charts-util-block {
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;

  .charts-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.14rem;
    // color: #ffffff;

    .img-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.2rem;

      &::before {
        width: 0.04rem;
        height: 0.3rem;
        margin: 0 0.1rem 0 5px;
        font-size: 0;
        background: #091344;
        border-radius: 2px;
        content: "a";
      }
      img {
        width: 0.17rem;
        height: 0.18rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>