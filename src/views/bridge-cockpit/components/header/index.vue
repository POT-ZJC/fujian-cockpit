<template>
  <div class="bigdata-header">
    <div class="header-left">
      <template v-if="pageType === '2'">
        <div class="left-title">
          {{ title }}
        </div>
        <div class="goBack-button"  @click="$router.push('/bridge-cockpit/home')" ><i class="el-icon-s-home"></i>上一级</div>
      </template>

      <template v-else>
        <div class="left-title">
          福建省长大桥梁 <span class="title-special">省级</span>平台-养护驾驶舱
        </div>
        <el-select style="width:1.2rem" v-model="currentUnit" @change="areaChange" size="medium" placeholder="下一级">
          <el-option :label="'厦漳大桥'" value="厦漳大桥"></el-option>
        </el-select>
      </template>

      <!-- <router-link to="/bridge-cockpit/bridgeManage" style="color: #33ccc2"
        >桥梁管理</router-link
      > -->

      <div class="stripe-bg">
        <div v-for="index in 20" class="stripe-item" :key="index"></div>
      </div>
    </div>
    <div class="header-right">
      <SwitchBox :active="'year'" />
      <img src="./img/tianqi.png" alt="" class="header-weather" />
      <el-divider direction="vertical"></el-divider>

      <div><img src="./img/driver.png" alt class="user-img " /></div>

      <el-dropdown @command="handleCommand" class="header-user">
        <!-- <img src="./img/user.png" alt height="0.312rem" width="0.312rem" class="cp" /> -->
        <span class="el-dropdown-link">
          <span class="user-name"> {{ userName }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-divider direction="vertical"></el-divider>
      <div class="header-date">
        <div class="date-time">22:30</div>
        <div class="date-ymd">2020年10月1日</div>
      </div>
    </div>
  </div>
</template>
<script>
import SwitchBox from "../switchBox";
export default {
  components: {
    SwitchBox,
  },
  data() {
    return {
      userName: "用户名",
      currentUnit: "",
      title: "",
      pageType: "",
    };
  },
  watch: {
    $route: {
      handler(val) {
        // pageTitle
        this.pageType = val.meta.type || "";
        this.title = val.meta.pageTitle || "";
        switch (val.path) {
          case "/bigdata-cockpit/home":
            return null;
          case "/bridge-bigdata/home":
            return null;
          default:
            return null;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    handleCommand(cmd) {
      switch (cmd) {
        case "loginOut":
          this.$store.dispatch("user/logout");
          this.$router.push(`/login`);
          break;
        default: 
          return null;
      }
    },
    areaChange(){
      this.$router.push('/bridge-cockpit/bridgeManage/maintenance-panoramic')
      this.$nextTick(()=>{
        this.currentUnit=''
      })
    }
  },
};
</script>
<style lang="scss" scoped>
//  @import "./img/stripe-bg.svg";
.bigdata-header {
  height: 0.937rem;
  // padding: 0.260rem;
  border-top: 1px solid #3272cc; /*no*/
  border-bottom: 1px solid #184579; /*no*/
  .header-left {
    display: flex;
    float: left;
    height: 0.416rem;
    padding-left: 0.291rem;
    margin-top: 0.26rem;
    align-items: center;
    .left-title {
      margin-right: 15px;
      height: 0.416rem;
      // margin: 0;
      font-size: 40px;
      font-weight: 700;
      line-height: 0.416rem;
      letter-spacing: 6px;
      color: #03c0f3;
      background: linear-gradient(#00cff3, #068be3);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      .title-special {
        color: #fece43;
        -webkit-text-fill-color: #fece43;
      }
    }
    .goBack-button {
      border-radius: 2px; /*no*/
      cursor: pointer;
      width: 122px;
      height: 36px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background: #053377;
      border: 2px solid #33ccc2; /*no*/
      font-size: 20px;
      font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
      font-weight: 700;
      color: #ffffff;
      line-height: 40px;
      letter-spacing: 2px; /*no*/
      text-align: center;
      .el-icon-s-home {
        color: #00ffde;
        font-size: 16px;
      }
    }

    /deep/.el-select {
      z-index: 1;
      width: 122px;
    }
    // /deep/.el-select--medium {
    //   height: 40px;
    // }
    //选择公司下拉框
    /deep/.el-input__inner {
      height: 40px;
      font-size: 0.208rem;
      line-height: 0.375rem;
      border: 2px solid #33ccc2; /*no */
      background: #053377;
      input {
        // background-color: #113d75;
        background: #053377;
      }
    }

    // /deep/ .el-icon-arrow-up {
    //     &::before {
    //         content: '\E60B' !m;
    //     }
    // }

    &::after {
      clear: both;
      content: "";
    }
    .stripe-bg {
      position: relative;
      height: 0.385rem;
      display: flex;
      background: linear-gradient(90deg, rgba(6, 21, 28, 0.2) 4%, #06151c 87%);
      // background: url("~./img/stripe-bg.svg") no-repeat;
      opacity: 0.4;
      .stripe-item {
        flex-shrink: 0;
        height: 100%;
        margin: 0 5px;
        width: 6px;
        background: #485a66;
        transform: skew(22deg);
      }
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        left: -5px;
        height: 100%;
        background: linear-gradient(
          to right,
          rgba(5, 20, 27, 0.7),
          rgba(5, 20, 27, 0) 80%
        );
      }
    }
  }
  .header-right {
    display: flex;
    float: right;
    height: 0.416rem;
    margin-top: 0.26rem;
    overflow: visible;
    align-items: center;
    &::after {
      clear: both;
      content: "";
    }
    /deep/.el-divider {
      background-color: #2b5693;
    }
    /deep/.el-divider--vertical {
      width: 2px;
      height: 2em;
      margin: 0 0.2rem;
    }
  }
  .header-user {
    padding: 0 0.208rem;
    color: #fff;
    .user-name {
      font-size: 18px;
    }
  }
  .header-weather {
    height: 0.416rem;
    padding: 0 0.208rem;
  }
  .header-date {
    width: 1.408rem;
    height: 0.52rem;
    .date-time {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-size: 0.25rem;
      font-weight: 500;
      color: #f7d04a;
    }
    .date-ymd {
      font-size: 0.166rem;
    }
  }
}
</style>
