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
  background-color: #1e2e47;
  border-radius: torem(4px);
  border: solid 1px #384a67;
  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .module-head {
    margin-left: 1px;
    position: absolute;
    box-sizing: border-box;
    // padding: torem(12px);
    top: -2px;
    left: -2px;
    width: calc(100% + 2px);
    height: torem(40px);
    background-image: linear-gradient(
        261deg,
        #112038 0%,
        #1b2c46 50%,
        #263958 100%
      ),
      linear-gradient(#1e2e47, #1e2e47);
    background-blend-mode: normal, normal;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
    border-radius: torem(4px);
    border: solid 1px #384a67;
    .title-bg {
      width: torem(170px);
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 torem(10px);
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
    color: #69a8f6;
  }
  &::after {
    border-top-color: #69a8f6 !important;
  }
}
/deep/.cockpit-select {
  background-image: linear-gradient(
      261deg,
      #11223d 0%,
      #13375e 50%,
      #154f87 100%
    ),
    linear-gradient(#1e2e47, #1e2e47);
  background-blend-mode: normal, normal;
}
</style>
