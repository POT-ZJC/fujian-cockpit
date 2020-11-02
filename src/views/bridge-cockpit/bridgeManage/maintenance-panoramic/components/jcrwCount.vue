<template>
  <!-- jcrw-检查任务 -->
  <div class="module-jcrw module-pub">
    <moduleTitle title="检查任务" />
    <checkCountNum :dataList="dataList" />
  </div>
</template>
<script>
import moduleTitle from "@/views/bridge-cockpit/components/moduleTitle";
import checkCountNum from "@/views/bridge-cockpit/components/checkCountNum";
export default {
  components: {
    moduleTitle,
    checkCountNum,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  watch: {
    id(val) {
      this.$nextTick(() => {
        this.setData();
      });
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
  methods: {
    setData() {
      this.dataList.forEach((a) => {
        const countNum_minNum = 400,
          countNum_maxNum = 1000;
        const ratioNum_minNum = 50,
          ratioNum_maxNum = 100;

        const countNum_value = Math.floor(
          Math.random() * (countNum_maxNum - countNum_minNum + 1) +
            countNum_minNum
        );
        const ratioNum_value = Math.floor(
          Math.random() * (ratioNum_maxNum - ratioNum_minNum + 1) +
            ratioNum_minNum
        );
        a.countNum = countNum_value;
        a.ratioNum = ratioNum_value;
      });
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.module-jcrw {
  width: 377px;
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
