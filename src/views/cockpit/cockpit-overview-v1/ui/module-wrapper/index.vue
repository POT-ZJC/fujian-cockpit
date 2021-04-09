<template>
  <div class="cockpit-module">
    <div class="module-head">
      <div class="title-bg">
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
  padding-top: torem(40px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  background-image: linear-gradient(
      261deg,
      #041527 0%,
      #07192a 50%,
      #091c2d 100%
    ),
    linear-gradient(#19364f, #19364f);
  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .module-head {
    // margin-left: 1px;
    position: absolute;
    box-sizing: border-box;
    // padding: torem(12px);
    top: 0;
    left: 0;
    // width: calc(100% + 2px);
    width: 100%;
    height: torem(40px);
    padding: 0 torem(20px);
    border: solid 1px #003868;
    border-top: none;
    background-image: linear-gradient(
        -1deg,
        #071019 0%,
        #04233e 50%,
        #00396a 100%
      ),
      linear-gradient(#101d2b, #101d2b);
    background-blend-mode: normal, normal;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: torem(16px);
      background-image: url("./img/title-bg.png"); //no-repeat
      background-position: left top;
      background-size: 100% 100%;
      background-size: no-repeat;
    }
    .title-bg {
      width: torem(170px);
      display: flex;
      position: absolute;
      top: 0;
      left: torem(26px);
      // padding: 0 torem(30px);
      align-items: center;
      height: 100%;
      box-sizing: border-box;
    }
    .head-right {
      margin-left: 1.6rem;
      margin-top: 0.05rem;
      width: calc(100% - 1.6rem);
      text-align: right;
      display: flex;
      justify-content: flex-end;
      /deep/.el-scrollbar__wrap {
        padding-bottom: 17px;
      }
    }
  }
}
/deep/.select-active {
  .select-txt {
    color: #6ff5fe;
  }
  &::after {
    border-top-color: #6ff5fe !important;
  }
}
/deep/.cockpit-select {
  color: #fff;
}
</style>
