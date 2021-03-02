<template>
  <div class="cockpit-module">
    <div class="module-head">
      <slot name="head"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.cockpit-module {
  background: linear-gradient(
    to bottom,
    rgba(7, 15, 101, 0.7) 0%,
    rgba(7, 15, 101, 0.2) 100%
  );
  padding: torem(40px) torem(8px) torem(8px) torem(8px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: torem(5px);
  //   overflow: hidden;
  .module-head {
    position: absolute;
    box-sizing: border-box;
    padding: torem(8px);
    top: 0;
    left: 0;
    height: torem(50px);
    width: 100%;
  }
}
</style>
