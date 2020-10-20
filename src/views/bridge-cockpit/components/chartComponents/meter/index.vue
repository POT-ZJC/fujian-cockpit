<template>
  <div :ref="refName" class="meter-charts"></div>
</template>

<script>
export default {
  name: "Meter",
  components: {},
  props: {
    refName: {
      type: String,
      default: ""
    },

    chartsName: {
      type: String,
      default: ""
    }
  },
  computed: {},
  mounted() {
    this.createCharts();
  },
  methods: {
    createCharts: function() {
      const _this = this;
      this.myChart = this.$echarts.init(this.$refs[this.refName]);
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 60, name: "剩余量" }]
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.meter-charts {
  width: inherit;
  height: inherit;
}
</style>