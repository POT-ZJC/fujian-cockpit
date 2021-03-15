import Vue from "vue";
const obj = {
  selectControlObj: {},
};
const store = Vue.observable(obj);
let hasInit = false;

function updateState(key, is) {
  let selectControlObj = { ...store.selectControlObj };
  for (let i in selectControlObj) {
    if (i === key) {
      selectControlObj[key] = is || false;
    } else {
      selectControlObj[i] = false;
    }
  }
  store.selectControlObj = selectControlObj;
}
function eventFn() {
  let selectControlObj = { ...store.selectControlObj };
  for (let i in selectControlObj) {
    // if (i === key) {
    //   selectControlObj[key] = is || false;
    // } else {
    selectControlObj[i] = false;
    // }
  }
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
