<template>
  <div class="list-scroll" :id="refId">
    <div class="news-list" :ref="refId+'list'" :class="isMain?'ccc':''">
      <ul :ref="refId+'1'">
        <li v-for="(item, index) in newDataList" :key="index" class="cp" @click="itemClick(item)">
          <span class="toh project-name" :title="item.name">{{item.name||""}}</span>
          <span>{{item.date||""}}</span>
        </li>
      </ul>
      <ul :key="refId+'2'" :ref="refId+'2'" v-if="newDataList.length>=showMaxNum">
        <li v-for="(item, index) in newDataList" :key="index" class="cp" @click="itemClick(item)">
          <span class="toh project-name" :title="item.name">{{item.name||""}}</span>
          <span>{{item.date||""}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListScroll",
  props: {
    refId: {
      type: String,
      default: String(Math.floor(Math.random() * 100))
    },
    dataLength: {
      type: Number,
      default: 0
    },
    showMaxNum: {
      type: Number,
      default: 7
    },
    text: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    isMain: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newDataList: []
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.dealData();
      this.startResize();
    });
  },
  methods: {
    createData: function() {
      let arr = [];
      const { dataLength, text, unit } = this;
      for (let i = 0; i < dataLength; i++) {
        arr.push({
          name: text + "-" + Number(Math.floor(Math.random() * 100) + 1) + unit,
          date: "2020-1-12"
        });
      }
      return arr;
    },
    dealData: function() {
      if (
        !this.dataList ||
        (this.dataList.length == 0 && this.dataLength === 0)
      ) {
        return;
      } else if (this.dataLength > 0) {
        this.newDataList = this.createData();
        this.startScrolling();
        return;
      }
      this.newDataList = this.dataList;
      if (this.dataList.length >= this.showMaxNum) {
        this.startScrolling();
      }
    },
    startResize: function() {
      this.$nextTick(() => {
        let currentDom = this.$refs[this.refId + "list"];
        // currentDom.style.width =
        //   (this.width ? this.width : currentDom.parentNode.offsetWidth / 100) +
        //   "rem";
        currentDom.style.height =
          (this.height
            ? this.height
            : currentDom.parentNode.offsetHeight / 100) -
          0.2 +
          "rem";
      });
    },
    startScrolling: function() {
      const _this = this;
      const area = this.$refs[this.refId + "list"];
      const con1 = this.$refs[this.refId + "1"];
      const con2 = this.$refs[this.refId + "2"];
      // con2.innerHTML = con1.innerHTML;
      function scrollUp() {
        if (area.scrollTop >= con1.offsetHeight - 1) {
          area.scrollTop = 0;
        } else {
          area.scrollTop++;
        }
      }
      const time = 50;
      this.mytimer = setInterval(scrollUp, time);
      area.onmouseover = function() {
        if (_this.mytimer) {
          clearInterval(_this.mytimer);
          _this.mytimer = null;
        }
      };
      area.onmouseout = function() {
        _this.mytimer = setInterval(scrollUp, time);
      };
    },
    itemClick: function(item) {
      // this.$modal.show("newsDetail", { title: item.name, isWhite: true });
      this.$emit("callback", item);
    }
  },
  beforeDestroy() {
    if (this.mytimer) {
      clearInterval(this.mytimer);
      this.mytimer = null;
    }
  }
};
</script>

<style lang="less" scoped>
.ccc {
  color: #ccc !important;
}
.list-scroll {
  display: flex;
  width: inherit;
  flex-direction: column;
  // .chart-title {
  // padding: 0.07rem 0.14rem;
  // }
  .news-list {
    display: flex;
    width: inherit;
    padding: 0 0.14rem;
    overflow: hidden;
    overflow-x: auto;
    font-size: 0.14rem;
    color: #666;
    flex-direction: column;
    justify-content: start;

    li {
      display: flex;
      padding: 0.03rem 0;
      margin-top: 0.18rem;
      flex-direction: row;
      &:hover {
        color: #0090ff;
      }
      .project-name {
        width: 70%;
      }
    }
  }
}
</style>