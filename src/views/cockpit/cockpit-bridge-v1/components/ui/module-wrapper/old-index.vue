<template>
  <div class="cockpit-module">
    <div class="module-head">
      <div class="title-bg">
        <div class="top-left-style"></div>
        <div class="top-right-style"></div>
        <div class="top-bottom-style"></div>

        <slot name="head-title"></slot>
      </div>
      <div class="head-right">
        <slot name="head-right"></slot>
      </div>
    </div>
    <div class="content-wrapper">
      <slot></slot>
    </div>
    <div class="bottom-border1"></div>
    <div class="bottom-border2"></div>
  </div>
</template>

<style lang="scss" scoped>
.cockpit-module {
  // background-image: url("./img/bg.png");
  // background-position: top left;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  // background-color: rgba(0,137,255,0.1);
  background-repeat: no-repeat;
  //左侧边框
  background-image: linear-gradient(to right, #3a6489 torem(15px), #3a6489 100%),
    //右侧边框-1
      linear-gradient(to right, #3a6489 0, #3a6489 100%),
    //右侧边框-2
      linear-gradient(to right, #3a6489 0, #3a6489 100%),
    //顶部边框-1
      linear-gradient(to bottom, #3a6489 0, #3a6489 100%),
    //顶部边框-2
      linear-gradient(to bottom, #3a6489 0, #3a6489 100%),
    //底部边框
      linear-gradient(to bottom, #3a6489 0, #3a6489 100%),
    //顶部转折
      linear-gradient(
        -45deg,
        transparent torem(8px),
        #3a6489 torem(8px),
        #3a6489 calc(0.08rem + 1px),
        transparent calc(0.08rem + 1px)
      ),
    //右上转折
      linear-gradient(
        45deg,
        transparent torem(8px),
        #3a6489 torem(8px),
        #3a6489 calc(0.08rem + 1px),
        transparent calc(0.08rem + 1px)
      ),
    //右侧转折
      linear-gradient(
        -45deg,
        transparent torem(8px),
        #3a6489 torem(8px),
        #3a6489 calc(0.08rem + 1px),
        transparent calc(0.08rem + 1px)
      ),
    //左下转折
      linear-gradient(
        45deg,
        transparent torem(8px),
        #3a6489 torem(8px),
        #3a6489 calc(0.08rem + 1px),
        transparent calc(0.08rem + 1px)
      ),
    // 右下转折
      linear-gradient(
        -45deg,
        transparent torem(8px),
        #3a6489 torem(8px),
        #3a6489 calc(0.08rem + 1px),
        transparent calc(0.08rem + 1px)
      );
  // linear-gradient(-45deg, #3a6489 0, #3a6489 100%);
  /*边框大小*/
  //左侧边框
  background-size: 1px calc(100% - 0.3rem),
    //右侧边框-1
      1px calc(100% - 0.62rem),
    //右侧边框-2
      1px 0.24rem,
    //顶部边框-1
      calc(100% - 1.1rem) 1px,
    //顶部边框-2
      calc(1rem - 0.25rem) 1px,
    //底部边框
      calc(100% - 0.35rem) 1px,
    //顶部转折
      torem(12px) torem(12px),
    //右上转折
      torem(12px) torem(12px),
    //右侧转折
      torem(12px) torem(12px),
    //左下转折
      torem(12px) torem(12px),
    //右下转折
      torem(12px) torem(12px); 
  /*边框定位*/
  //左侧边框
  background-position: 0 calc(100% - 0.12rem),
    //右侧边框-1
      calc(100% - 0.12rem) calc(100% - 0.12rem),
    //右侧边框-2
      100% 0.15rem,
    //顶部边框-1
      torem(12px) 0.15rem,
    //顶部边框-2
      calc(100% - 0.12rem) 0.03rem,
    //底部边框
      torem(12px) 100%,
    //顶部转折
      calc(100% - 0.86rem) 0.03rem,
    //右上转折
      100% 0.03rem,
    //右侧转折
      100% 0.39rem,
    //左下转折
      0 100%,
    //右下转折
      calc(100% - 0.12rem) 100%;
  // padding: torem(40px) torem(12px) torem(12px) 0;
  padding-top: torem(40px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  // border-radius: torem(5px);
  //   overflow: hidden;
  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: torem(12px);
    padding: torem(12px);
    // border-left: 1px solid #3a6489;
    // border-right: 1px solid #3a6489;
  }

  .module-head {
    margin-left: 1px;
    position: absolute;
    box-sizing: border-box;
    padding: torem(12px);
    top: 0;
    left: 0;
    height: torem(54px);
    width: 100%;

    // border-top: 1px solid #3a6489;
    // border-right: 1px solid #3a6489;
    // .head-top-line {
    //   position: absolute;
    //   top: 12px;
    //   right: 90px;
    //   width: 110px;
    //   border-top: 1px solid #3a6489;
    // }
    // .head-topRight-border {
    //   position: absolute;
    //   top: 2;
    //   right: 12px;
    // }
    .title-bg {
      // overflow: hidden;
      position: absolute;
      padding: torem(5px) torem(15px);
      left: -1px;
      z-index: 1;
      top: 0;
      height: torem(52px);
      // margin-left: torem(12px);
      width: torem(170px);
      box-sizing: border-box;
      background: #00baff;
      border-left: none;
      clip-path: polygon(
        0 torem(12px),
        torem(12px) 0,
        torem(158px) 0,
        100% torem(12px),
        100% torem(40px),
        torem(12px) torem(40px),
        0 torem(52px)
      );
      &::after {
        content: "";
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        clip-path: polygon(
          1px torem(13px),
          torem(13px) 1px,
          torem(157px) 1px,
          calc(100% - 1px) torem(13px),
          calc(100% - 1px) torem(39px),
          torem(11px) torem(39px),
          1px torem(50px)
        );
        background: linear-gradient(#014382 10%, #021132 100%);
      }
      // calc(100% - 10px)
      // .top-left-style {
      //   position: absolute;
      //   top: 0;
      //   left: -0.12rem;
      //   clip-path: polygon(0 torem(12px), 100% 0, 100% torem(40px), 0 100%);
      //   width: torem(12px);
      //   height: torem(52px);
      //   // transform: skewY(40deg);
      //   background: linear-gradient(#014382 0%, #021132 100%);
      //   box-sizing: border-box;
      //   border-left:1px solid #00baff;
      //   border-top:1px solid #00baff;
      //   border-bottom:1px solid #00baff;

      // }
      // .top-right-style {
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   width: torem(20px);
      //   height: torem(12px);
      //   transform: skewX(-40deg);
      //   border-left: 1px solid #00baff;
      // }
      // .top-bottom-style {
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   width: 100%;
      //   height: torem(20px);
      //   transform: skewX(40deg);
      //   border-left: 1px solid #00baff;
      //   border-top: 1px solid #00baff;
      // }
    }
    .head-right {
      margin-left: 1.6rem;
      margin-top: 0.05rem;
      width: calc(100% - 1.6rem);
      text-align: right;
    }
  }
}
</style>
