<template>
    <div class="home-layout">
        <div class="layout-up">
            <div class="up-left">
                <!-- 上左-基础设施模块 -->
                <jcssPie :fontSize="htmlFontSize" />
                <!-- 上左-机电设备模块 -->
                <jdsbPie :fontSize="htmlFontSize" />
            </div>

            <div class="up-center">
                <showNumber :fontSize="htmlFontSize" />

                <!-- 中间-地图 -->
                <ChinaMap :fontSize="htmlFontSize" />
            </div>

            <div class="up-right">
                <!-- 病害管理 -->
                <bhglBar :fontSize="htmlFontSize" />
                <!-- 养护任务 -->
                <yhrwLine :fontSize="htmlFontSize" />
            </div>
        </div>
        <div class="layout-down">
            <!-- 考核指标 -->
            <khzbRadar :fontSize="htmlFontSize" class="down-left" />
            <!-- 技术状况评定 -->
            <jszkpdBar :fontSize="htmlFontSize" class="down-center" />
            <!-- 计量支付 -->
            <jlzfLine :fontSize="htmlFontSize" class="down-right" />
        </div>
        <!-- <ChartsUtilBlock width="15.06" isMain> -->

        <!-- </ChartsUtilBlock> -->
    </div>
</template>
<script>
// import ChartsUtilBlock from '../components/chartComponents/ChartsUtilBlock'
import ChinaMap from '../components/chartComponents/ChinaMap'
import jcssPie from './components/jcssPie'
import jdsbPie from './components/jdsbPie'

import { mapState } from 'vuex'
export default {
    components: {
        // ChartsUtilBlock,
        ChinaMap,
        jdsbPie,
        jcssPie,
        jszkpdBar: () => import('./components/jszkpdBar'),
        showNumber: () => import('./components/showNumber'),
        bhglBar: () => import('./components/bhglBar'),
        yhrwLine: () => import('./components/yhrwLine'),
        khzbRadar: () => import('./components/khzbRadar'),
        jlzfLine: () => import('./components/jlzfLine')
    },
    computed: {
        ...mapState(['htmlFontSize'])
    },
    watch: {
        htmlFontSize(val) {
            console.log(val)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-layout {
    // min-width: 100%;
    min-height: 100%;
    // padding: 0.0938rem;
    padding: 10px 8px 18px 8px;
    margin: 0 auto;
    .layout-up {
        display: flex;
        width: 100%;
        height: 6.6rem;
        // justify-content: space-between;
        .up-left {
            width: 3.8958rem;
            flex-shrink: 0;
        }
        .up-center {
            position: relative;
            width: 11.7708rem;
            height: 100%;
            margin: 0 0.125rem;
            flex-shrink: 0;
        }
        .up-right {
            width: 3.8958rem;
            flex-shrink: 0;
        }
    }
    .layout-down {
        display: flex;
        width: 100%;
        height: 3.2708rem;
        margin-top: 0.1875rem;
        .down-left {
            flex-shrink: 0;
        }
        .down-center {
            margin: 0 0.125rem;
            flex-shrink: 0;
        }
        .down-right {
            flex-shrink: 0;
        }
    }
}
</style>
