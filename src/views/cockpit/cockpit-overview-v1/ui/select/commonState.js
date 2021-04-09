import Vue from "vue";
const obj = {
  selectControlObj: {},
};
const store = Vue.observable(obj);
let hasInit = false;
let currentKey = "";
function updateState(key, visible) {
  let selectControlObj = { ...store.selectControlObj };
  currentKey = key;
  selectControlObj[key] = visible || false;
  store.selectControlObj = selectControlObj;
}
function eventFn() {
  let selectControlObj = { ...store.selectControlObj };
  selectControlObj[currentKey] = false;
  store.selectControlObj = selectControlObj;
}
function initData(key) {
  store.selectControlObj[key] = false;
  if (!hasInit) {
    document.querySelector("body").addEventListener("click", eventFn, false);
    hasInit = true;
  }
}
function clear(key) {
  delete store.selectControlObj[key];
}
export { clear, initData, updateState, store };
