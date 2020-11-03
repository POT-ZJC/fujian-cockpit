<template>
  <!-- jcrw-检查任务 -->
  <div class="module-jcrw module-pub">
    <moduleTitle title="检查任务" />
    <checkCountNum  :dataList="dataList" />
  </div>
</template>
<script>
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
import checkCountNum from "@/views/bridge-cockpit/components/checkCountNum"
export default {
  components: {
    moduleTitle,
    checkCountNum
  },
  props: {
    fontSize: {
      type: Number,
      default: 14,
    },
  },

  data() {
    return {
      dataList: [
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
      ],
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.module-jcrw {
  width: 375px;
  height: 3.2292rem;
  display: flex;
  flex-direction: column;
}
.module-layout {
  width: 100%;
  padding-top: 38px;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding-left: 26px;
} 
</style>
