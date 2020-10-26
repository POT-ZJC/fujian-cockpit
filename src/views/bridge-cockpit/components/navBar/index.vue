<template>
  <div class="page-nav-layout">
    <div class="page-nav">
      <div class="nav-active" :style="`left:${activeNavLeft}`">
        <div class="nav-active-pie"><div class="nav-acitve-point"></div></div>
      </div>
      <div
        v-for="(item, index) in navList"
        class="nav-item "
        :style="`left:${navFirstLeft + index * navFirstLeft}%`"
        :key="item.name"
        @click="activeNav(item, index)"
      >
        <div class="nav-item-point"></div>
        <span class="nav-name" :to="item.url">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // navList: {
    //   type: Array,
    //   default() {
    //     return [];
    //   },
    // },
  },
  data() {
    return {
      activeIndex: 1,
      navList: [
        {
          name: "基础设施",
          url: "/bridge-cockpit/bridgeManage/infrastructure",
        },
        {
          name: "养护全景",
          url: "/bridge-cockpit/bridgeManage/maintenance-panoramic",
        },
        {
          name: "检查养护",
          url: "/bridge-cockpit/bridgeManage/maintenance",
        },
      ],
    };
  },
  computed: {
    navFirstLeft() {
      // console.log(100 / (this.navList.length + 1), "navFirstLeft");
      return 100 / (this.navList.length + 1);
    },
    activeNavLeft() {
      // console.log(
      //   this.activeIndex * this.navFirstLeft + this.navFirstLeft + "%",
      //   "activeNavLeft"
      // );
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
.page-nav-layout {
  margin: 0 auto;
  height: 0;
  width: 1130px;
  width: 100%;
  position: relative;
}
.page-nav {
  top: 50px;
  left: 0;
  width: 100%;
  position: absolute;
  height: 2px; /*no*/
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 2px; /*no*/
    background: linear-gradient(
      68deg,
      rgba(2, 5, 42, 0) 0%,
      #00ffde 50%,
      rgba(2, 5, 42, 0) 100%
    );
  }
  .nav-item {
    z-index: 3;
    cursor: pointer;
    width: 0;
    height: 0;
    text-align: center;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-item-point {
      flex-shrink: 0;
      width: 10px;
      height: 10px;
      background: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.85); /*no*/
      border-radius: 10px;
      &:hover {
        box-shadow: -1px 6px 24px 7px rgba(0, 255, 222, 0.48);
      }
    }
    .nav-name {
      position: absolute;
      top: 0.3125rem;
      width: 0;
      display: flex;
      white-space: nowrap;
      justify-content: center;
      left: 50%;
      font-size: 0.208333rem;
      font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
      font-weight: 700;
      color: #ffffff;
    }
  }
  .nav-active {
    position: absolute;
    z-index: 4;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1px; /*no*/
    transition: left 0.5s;
    // animation: aictveNav linear;
    .nav-active-pie {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      flex-shrink: 0;
      height: 50px;
      border-radius: 50px;
      background: rgba(0, 255, 222, 0.4);
      border: 1px solid #00ffde;
      box-shadow: -1px 6px 24px 7px rgba(0, 255, 222, 0.48);
    }
    .nav-acitve-point {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      border-radius: 50px;
      background: #00ffde;
      border: 4px solid #00ffde;
      box-shadow: -1px 6px 24px 7px rgba(0, 255, 222, 0.56);
    }
  }
}
</style>
