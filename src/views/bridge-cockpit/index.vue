<template>
  <div class="bridge-cockpit-page">
    <Header />

    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "./components/header";
import { computedFontSize } from "./components/htmlFontSize";
import { mapMutations } from "vuex";
export default {
  components: {
    Header,
  },
  data() {
    return {
      // htmlFontSize: 96, // 默认在1920 宽度的屏幕 ，1920 html根字体=96
      htmlEl: document.querySelector("html"),
    };
  },
  mounted() {
    // window.documentElement.style.fontSize = '160px'
    window.onresize = () => {
      // this.htmlFontSize = computedFontSize(this.htmlEl)
      this.UPDATE_HTMLFONTSIZE(computedFontSize(this.htmlEl));
    };
    // 动态计算窗口大小，换html算根字体
    this.UPDATE_HTMLFONTSIZE(computedFontSize(this.htmlEl));
    this.$nextTick(() => {
      setTimeout(() => {
        this.UPDATE_HTMLFONTSIZE(computedFontSize(this.htmlEl));
      }, 500);
    });
    
  },
  methods: {
    ...mapMutations(["UPDATE_HTMLFONTSIZE"]),
  },
  destroyed() {
    this.htmlEl.style.fontSize = "14px";
    this.UPDATE_HTMLFONTSIZE(14);
    window.onresize = () => null;
  },
};
</script>
<style lang="scss" scoped>
.box {
  margin: 0 auto;
}
html {
  font-size: 160px;
}
</style>
<style lang="scss">
@import "./bigdata-style.scss";
</style>
