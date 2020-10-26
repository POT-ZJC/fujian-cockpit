<template>
    <div class="show-number">
        <div class="number-item" v-for="item in list" :key="item.name">
            <div class="item-title">{{ item.name }}</div>
            <div class="module-pub item-content">
                <div class="content-up">
                    <span class="content-number">{{ item.number }}</span
                    >{{ item.unit }}
                </div>
                <div>
                    年同比
                    <span class="content-compared"
                        >↑{{ item.comparedNumber }}{{ item.comparedUnit }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    name: '管控里程',
                    number: 1348,
                    unit: '公里',
                    comparedNumber: 311, //对比数字
                    comparedUnit: '公里' //对比单位
                },
                {
                    name: '养护投资金额',
                    number: 2,
                    unit: '亿',
                    comparedNumber: 1956, //对比数字
                    comparedUnit: '万' //对比单位
                },
                {
                    name: '管控项目',
                    number: 66,
                    unit: '个',
                    comparedNumber: 11, //对比数字
                    comparedUnit: '个' //对比单位
                },
                {
                    name: '法人单位',
                    number: 14,
                    unit: '个',
                    comparedNumber: 1, //对比数字
                    comparedUnit: '个' //对比单位
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.show-number {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	z-index:1;
	display: flex;
    width: 100%;
    height: 1.25rem;
    justify-content: space-between;

    .number-item {
        width: 2.2917rem;
        margin: 0 24px;
        height: 100%;
        border-radius: 0.0625rem;
        display: flex;
        flex-direction: column;
        .item-title {
            font-size: 0.1458rem;
            font-weight: 700;
            flex-shrink: 0;
            line-height: 0.3333rem;
            color: #edf4fb;
            text-align: left;
        }
        .item-content { 
            // height: 0.9167rem;
            flex: 1;
            padding: 0.1rem 0.2083rem;
            font-size: 0.125rem;
            color: #edf4fb;
            border-radius: 0.0625rem;
            .content-up {
                position: relative;
                padding-right: 0.4167rem;
                &::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0.4167rem;
                    height: 0.3125rem;
                    background: url('./img/num-file.png') no-repeat;
                    background-color: rgba(255, 255, 255, 0.2);
                    background-position: center center;
                    background-size: 55%;
                    border-radius: 0.2083rem;
                    content: '';
                }
            }
            .content-number {
                margin-right: 0.125rem;
                // font-family: DINEngschriftStd;
                font-size: 0.3125rem;
                color: #fdce44;
            }
            .content-compared {
                font-size: 0.125rem;
                color: #df3141;
            }
        }
    }
}
</style>
