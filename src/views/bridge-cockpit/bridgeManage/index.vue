<template>
  <div class="bridgeManage-page">  
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 1,
      // navFirstLeft: 0,
      navList: [
        {
          name: "基础设施",
          url: "/bridge-cockpit/bridgeManage/infrastructure",
        },
        {
          name: "检查养护",
          url: "/bridge-cockpit/bridgeManage/maintenance",
        },
        {
          name: "养护全景",
          url: "/bridge-cockpit/bridgeManage/maintenance-panoramic",
        },
      ],
    };
  },
  computed: {
    navFirstLeft() {
      return 100 / (this.navList.length + 1);
    },
    activeNavLeft() {
      return this.activeIndex * this.navFirstLeft + this.navFirstLeft + "%";
    },
  },
  watch: {
    $route: {
      handler(val) {
        const activeIndex = this.navList.findIndex(
          (data) => data.url === val.path
        );
        this.activeIndex = activeIndex;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    activeNav(data, index) {
      this.activeIndex = index;
      setTimeout(() => {
        this.$nextTick(() => {
          this.$router.push(data.url);
        });
      }, 500);
    },
  },


};
</script>
<style lang="scss" scoped>
.bridgeManage-page {
  position: relative;

 
}
</style>
