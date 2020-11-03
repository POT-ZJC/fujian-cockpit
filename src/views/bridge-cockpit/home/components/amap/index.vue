<template>
  <div id="container" style="width:100%;height:100%" class="container"></div>
</template>
<script>
import poi_red from "./img/point-red.png";
import poi_green from "./img/point-green.png";
import poi_yellow from "./img/point-yellow.png";
import tip_bg from "./img/tip-bg.svg";
// import {
// projectNumberByProvince,
// structureNumberByType,
// deviceNumberByType,
// facilityEarlyWarningQuantityStatistics,
// statisticsOfEquipmentLayout,
// todaySWarningStatistics,
// websocketUrl,
// getGis
// } from '@api/home'
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  watch: {
    id(val) {
      this.$nextTick(() => {
        this.loopPlayMarkers();
      });
    },
  },
  data() {
    return {
      map: null,
      poi_Arr: [
        {
          name: "厦门大桥",
          addr: [118.102497, 24.557011],
        },
        {
          name: "厦漳大桥",
          addr: [117.953236, 24.437039],
        },
        {
          name: "泉州湾大桥",
          addr: [118.695328, 24.813429],
        },
        {
          name: "集美大桥",
          addr: [118.133139, 24.566769],
        },
        {
          name: "杏林大桥",
          addr: [118.087691, 24.557753],
        },
      ],
      markers_Arr: [],
      currentMarkerIndex: -1,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    //轮播坐标点
    loopPlayMarkers() {
      if (this.currentMarkerIndex !== -1) {
        this.markers_Arr[this.currentMarkerIndex].setLabel(null); // 关闭当前的点标记，打开下一个点标记
        if (this.currentMarkerIndex >= this.markers_Arr.length - 1) {
          this.currentMarkerIndex = 0;
        } else {
          ++this.currentMarkerIndex;
        }
      } else {
        this.currentMarkerIndex = 0;
      }

      this.openPoiLabel(this.markers_Arr[this.currentMarkerIndex]);
      this.$nextTick(() => {
        setTimeout(() => {
          this.map.setCenter(this.poi_Arr[this.currentMarkerIndex].addr);
        }, 200);
      });
    },
    initMap() { 

      let map = new AMap.Map("container", {
        mapStyle: "amap://styles/f546773a54957542ed38579c54b84d16",
        // viewMode: "3D",
        resizeEnable: true,
        // features: ["bg", "road"],
        center: [119.306239,26.075302],
        zoom: 7,
      });
      /*设置云南区域背景色*/
      let areaItemTotal = 0;
      let backColorArr = [
        "#002e38",
        "#016b83",
        "#014655",
        "#016b83",
        "rgba(76,245,246,0.53)",
      ];
      let getColorByAdcode = function(adcode) {
        ++areaItemTotal;
        const randomNIndex =
          areaItemTotal -
          Math.floor(areaItemTotal / backColorArr.length) * backColorArr.length;

        return backColorArr[randomNIndex];
      };
      //350000 =350000福建省
      let disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [350000],
        depth: 1,
        opacity: 0.7,
        styles: {
          // height: [0, 300000],
          // opacity: 0.86
          fill: function(properties, b, c, d) {
            let adcode = properties.adcode;
            return getColorByAdcode();
          },
          "province-stroke": "#319fb6",
          "city-stroke": "#319fb6", // 中国地级市边界
          "county-stroke": "#319fb6", // 中国区县边界
        },
      });

      disProvince.setMap(map);
      /*设置区域背景色-结束*/
      /*生成坐标点-开始 */

      let markers = this.poi_Arr.map((data) => {
        let temp = new AMap.Marker({
          map: map,
          name: data.name,
          icon: poi_red,
          position: [data.addr[0], data.addr[1]],
          offset: new AMap.Pixel(-20, -30),
          // content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
          direction: "right", // 设置文本标注方位
        });
        temp.on("mouseover", (e) => {
          this.openPoiLabel(temp);
        });
        temp.on("mouseout", (e) => {
          temp.setLabel(null);
        });
        temp.on("click", (e) => {
          temp.setLabel(null);
          return null;
          // _this.$router.push({
          //   path: "/monitorView/structure",
          //   query: {
          //     id: marker.weather.id,
          //   },
          // });
        });
        temp.name = data.name;
        return temp;
      });
      this.markers_Arr = markers;
      this.map = map;
      console.log(markers);
      /*设置坐标点-结束 */
    },
    openPoiLabel(temp) {
      temp.setLabel({
        offset: new AMap.Pixel(153, -28), // 设置文本标注偏移量
        // <p>${setIcon}项目状态：${status}</p>
        // style ="color: ${color}"
        content: `
				<div  class="poi-content" >
				<div  class="poi-titel" >${temp.name}</div>
				<div class="txt">发布了任务单详情</div>
				<div class="link">查看详情>></div>
				</div> 
				<div class="map-poi-line-1" ></div>
				<div class="map-poi-line-2" ></div>
												`, // 设置文本标注内容
        direction: "right", // 设置文本标注方位
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .amap-marker-label {
  background-image: url("~./img/tip-bg.svg");
  background-color: rgba(255, 255, 255, 0);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  //   padding: 15px 15px 10px 10px;
  width: 198px; /*no */
  height: 138px; /*no */
  /*overflow: hidden;*/
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  position: relative;
  cursor: pointer;
  .map-poi-line-1 {
    position: absolute;
    width: 100px; /*no */
    height: 1px; /*no */
    background: red;
    top: 123px; /*no */
    z-index: 1111;
    left: -186px; /*no */
  }
  .map-poi-line-2 {
    position: absolute;
    width: 150px; /*no */
    height: 1px; /*no */
    background: red;
    top: 71px; /*no */
    z-index: 1111;
    left: -110px; /*no */
    transform: rotate(-45deg);
  }
  .poi-content {
    padding: 30px; /*no */
  }
  .poi-titel {
    height: 30px; /*no */
    font-size: 18px; /*no */
    font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
    font-weight: 700;
    text-align: left;
    line-height: 24px; /*no */
    letter-spacing: 1px; /*no */
    color: #fb5a7a;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .txt {
    height: 19px; /*no */
    font-size: 16px; /*no */
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #eeeeee;
    line-height: 19px; /*no */
    letter-spacing: 1px; /*no */
  }
  .link {
    margin-top: 16px; /*no */
    height: 15px; /*no */
    font-size: 12px; /*no */
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #00ffde;
    line-height: 14px; /*no */
    letter-spacing: 1px; /*no */
  }
  svg {
    width: 16px; /*no */
    height: 16px; /*no */
    margin-right: 5px; /*no */
    vertical-align: bottom;
  }
}
</style>
<style>
.amap-info-content.amap-info-outer {
  background-color: #27272b;
  color: #f0f2ff;
  width: 100px;
}
.bottom-center .amap-info-sharp {
  border-top: 8px solid #27272b;
}
.bottom-center button {
  border: none;
  color: #2181ff;
  float: right;
  background: transparent;
}
.amap-info-close {
  color: #606166;
}
.amap-logo{
display: none!important;
}
.amap-copyright{
opacity:0;
}
</style>
