<template>
  <div :ref="refName" class="continuous-charts"></div>
</template>

<script>
export default {
  name: "ContinuousCharts",
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
      [
        { value: "900", name: "汽油" },
        { value: "700", name: "柴油" },
        { value: "300", name: "煤油" },
        { value: "800", name: "润滑油" },
        { value: "400", name: "石蜡油" },
        { value: "200", name: "其他" }
      ];
      let data = [
        {
          name: "品类",
          children: [
            {
              name: "汽油",
              value: 15,
              children: [
                {
                  name: "1号汽油",
                  value: 2
                },
                {
                  name: "2号汽油",
                  value: 5,
                  children: [
                    {
                      name: "2-1号汽油",
                      value: 2
                    }
                  ]
                },
                {
                  name: "3号汽油",
                  value: 4
                }
              ]
            },
            {
              name: "柴油",
              children: [
                {
                  name: "1号柴油",
                  value: 4
                }
              ]
            },
            {
              name: "煤油",
              value: 10,
              children: [
                {
                  name: "1号煤油",
                  value: 5,
                  itemStyle: {
                    // color: "red"
                  }
                },
                {
                  name: "2号煤油",
                  value: 1
                }
              ]
            },
            {
              name: "润滑油",
              value: 10,
              children: [
                {
                  name: "1号润滑油",
                  value: 5,
                  itemStyle: {
                    // color: "red"
                  }
                },
                {
                  name: "2号润滑油",
                  value: 1
                }
              ]
            },
            {
              name: "石蜡油",
              value: 10,
              children: [
                {
                  name: "1号石蜡油",
                  value: 5,
                  itemStyle: {
                    // color: "red"
                  }
                },
                {
                  name: "2号石蜡油",
                  value: 1
                }
              ]
            }
          ]
        },
        {
          name: "石蜡油",
          children: [
            {
              name: "1号石蜡油",
              children: [
                {
                  name: "1-1号石蜡油",
                  value: 3
                },
                {
                  name: "1-2号石蜡油",
                  value: 4,
                  children: [
                    {
                      name: "1-2-1号石蜡油",
                      value: 2
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "其他",
          children: [
            {
              name: "其他",
              children: [
                {
                  name: "其他",
                  value: 1
                },
                {
                  name: "其他",
                  value: 2
                }
              ]
            }
          ]
        }
      ];
      let option = {
        visualMap: {
          type: "continuous",
          min: 0,
          max: 10,
          inRange: {
            color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"]
          }
        },
        series: {
          type: "sunburst",
          data: data,
          radius: [0, "90%"],
          label: {
            rotate: "radial"
          }
        }
      };
      this.myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.continuous-charts {
  width: inherit;
  height: inherit;
}
</style>