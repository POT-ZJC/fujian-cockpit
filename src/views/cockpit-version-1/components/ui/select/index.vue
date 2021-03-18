<template>
  <div
    class="cockpit-select"
    @click.stop="openSelect"
    :class="{ open: optionVisible, 'select-active': value }"
  >
    <div class="select-txt">
      {{ currentData.label || currentData.value || placeholder }}
    </div>
    <div class="select-clear">
      <svg
        @click.stop="selectEvent({ value: '' })"
        v-if="hasClear && value"
        t="1615513776037"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1773"
        width="32"
        height="32"
      >
        <path
          d="M512 39.384615C250.092308 39.384615 39.384615 250.092308 39.384615 512s210.707692 472.615385 472.615385 472.615385 472.615385-210.707692 472.615385-472.615385S773.907692 39.384615 512 39.384615z m96.492308 488.369231l153.6 153.6c7.876923 7.876923 7.876923 19.692308 0 27.569231l-55.138462 55.138461c-7.876923 7.876923-19.692308 7.876923-27.569231 0L525.784615 610.461538c-7.876923-7.876923-19.692308-7.876923-27.56923 0l-153.6 153.6c-7.876923 7.876923-19.692308 7.876923-27.569231 0L261.907692 708.923077c-7.876923-7.876923-7.876923-19.692308 0-27.569231l153.6-153.6c7.876923-7.876923 7.876923-19.692308 0-27.569231l-155.56923-155.56923c-7.876923-7.876923-7.876923-19.692308 0-27.569231l55.138461-55.138462c7.876923-7.876923 19.692308-7.876923 27.569231 0l155.569231 155.569231c7.876923 7.876923 19.692308 7.876923 27.56923 0l153.6-153.6c7.876923-7.876923 19.692308-7.876923 27.569231 0l55.138462 55.138462c7.876923 7.876923 7.876923 19.692308 0 27.56923l-153.6 153.6c-5.907692 7.876923-5.907692 19.692308 0 27.569231z"
          p-id="1774"
          fill="#69a8f6"
        ></path>
      </svg>
    </div>
    <div class="select-option" v-show="optionVisible">
      <el-scrollbar class="scrollbar">
        <div
          :class="{
            'option-active': value === item.value || value === item.label,
          }"
          :title="item.label || item.value"
          class="option-item"
          v-for="(item, index) in optionData"
          @click.stop="selectEvent(item, index)"
          :key="index"
        >
          {{ item.label || item.value }}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { clear, initData, updateState ,store } from "./commonState";
export default {
  name: "cockpit-select",
  props: {
    placeholder: "",
    value: String,
    hasClear: {
      type: Boolean,
      default: true,
    },
    optionData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    optionVisible() {
      return store.selectControlObj[this.key];
    },
  },
  watch: {
    value(val, newVal) {
      // if (val !== newVal) {
      for (let i = 0; i < this.optionData.length; i++) {
        const obj = this.optionData[i];
        if (obj.value && val === obj.value) {
          this.currentData = obj;
          return;
        }
        if (!obj.value && obj.label === val) {
          this.currentData = obj;
          return;
        }
        this.currentData = {};
      }
      // }
    },
    // optionVisible(val) {
    //   console.log("eventFn", this.optionVisible, val);
    // },
  },
  model: {
    prop: "value",
    event: "input",
  },
  data() {
    return {
      currentData: {},
      // optionVisible: false,
      clearShow: false,
      isType: false,
      key: "select-" + Math.random(),
    };
  },
  created() {
    initData(this.key);
  },
  mounted() {
    const val = this.value;
    if (val) {
      for (let i = 0; i < this.optionData.length; i++) {
        const obj = this.optionData[i];
        if (obj.value && val === obj.value) {
          this.currentData = obj;
          break;
        }
        if (!obj.value && obj.label === val) {
          this.currentData = obj;
          break;
        }
      }
    }
  },
  beforeDestroy() {
    clear(this.key);
    // document
    //   .querySelector("body")
    //   .removeEventListener("click", this.eventFn, false);
  },
  methods: {
    selectEvent(data, index) {
      // console.log('this.value',data,this.value)
      if (this.value !== data.value) {
        this.$emit("input", data.value || data.label || "");
        this.$emit("change", data, index);
      }
      // this.optionVisible = false;
      updateState(this.key)
      // return false
    },
    openSelect() { 
          updateState(this.key,!this.optionVisible)
     
    },
    // eventFn(e) {
    //   console.log('21321',e)
    //   // debugger
    //   if (this.isType ) {
    //     this.optionVisible = true;
    //     this.isType = false;
    //   } else {
    //     this.optionVisible =false
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.cockpit-select {
  cursor: pointer;
  display: inline-block;
  // border: 1px solid #00baff;
  position: relative;
  min-width: 0.36rem;
  max-width: 1rem;
  font-size: torem(16px);
  color: #fff;
  text-align: left;
  background-color: cornflowerblue;
  padding: torem(2px) torem(13px);
  padding-right: 0.22rem;
  &::after {
    content: "";
    position: absolute;
    right: torem(5px);
    top: calc(50% - 0.03rem);
    width: 0;
    height: 0;
    border-width: torem(4px);
    border-bottom-width: 0;
    border-color: transparent;
    border-top-color: #fff;
    border-style: solid;
    transition: transform 0.2s;
    // transform: rotate(90deg);
  }
  .select-txt {
    overflow: hidden;
    width:100% ;
  }
  .select-clear {
    position: absolute;
    z-index: -1;
    top: calc(50% - 0.08rem);
    right: torem(3px);
    width: torem(18px);
    line-height: torem(16px);
    height: torem(18px);
    svg {
      border-radius: torem(16px);
      background-color: #154f87;
      width: torem(18px);
      height: torem(18px);
    }
  }
  &:hover {
    .select-clear {
      z-index: 1;
    }
  }
  .scrollbar {
    // max-height: torem(200px);
    min-width: torem(76px);
    // max-height: 2rem;
  }
  /deep/.el-scrollbar__wrap {
    // padding-bottom: 17px;
    height: 100%;
    max-height: 2rem;
  }
  // .el-scrollbar__bar.is-vertical {
  //   background-color: #76eefb;
  // }
  /deep/.el-scrollbar__thumb {
    background-color: #154f87;
  }
  .select-option {
    cursor: pointer;
    position: absolute;
    top: 100%;
    left: 0;
    max-height: torem(200px);
    z-index: 111;
    margin-top: torem(8px);
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.4);
    &::before {
      content: "";
      position: absolute;
      top: torem(-7px);
      left: torem(14px);
      width: 0;
      height: 0;
      border-width: torem(9px);
      border-top-width: 0;
      // border-color: transparent transparent #014382 transparent;
      border-color: transparent;
      border-bottom-color: #112035;
      border-style: solid;
    }
  }
  .option-item {
    min-width: 0.8rem;
    // margin: torem(10px) 0;
    border-top: 1px solid #333;
    padding: torem(7px) torem(10px);
    font-size: torem(16px);
    background-color: #112035;
    color: cornflowerblue;
    max-width: torem(180px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-child(1) {
      border-top: none;
    }
    &:hover {
      color: #fff;
      background-color: #00baff;
    }
  }
  .option-active {
    background-color: #00baff;
    color: #fff;
  }
}
.open {
  &::after {
    transform: rotate(180deg);
    transition: transform 0.2s;
  }
}
</style>
