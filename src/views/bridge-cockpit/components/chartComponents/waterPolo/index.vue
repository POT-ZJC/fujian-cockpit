<template>
  <div :ref="refName" class="water-polo"></div>
</template>

<script>
import "echarts-liquidfill";
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "WaterPolo",
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
      var value = 0.7;
      var data = [value, value, value];
      let option = {
        series: [
          {
            type: "liquidFill",
            data: [0.6, 0.5, 0.4, 0.3],
            radius: "80%",
            center: ["50%", "50%"],
            itemStyle: {
              shadowBlur: 0
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 3,
                borderColor: "#156ACF",
                shadowBlur: 20
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "green",
                  insideColor: "yellow",
                  fontSize: 40
                }
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.water-polo {
  width: inherit;
  height: inherit;
}
</style>