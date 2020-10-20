<template>
    <div class="bigdata-switch-box">
        <div
            @click="onSwitch(item)"
            :class="{ 'bigdata-_active': currentIndex === item.active }"
            class="bigdata-switch-button "
            v-for="(item, index) in dataList"
            :key="item.active"
        >
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // data: {
        //     type: Array,
        //     default: () => []
        // },
        active: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentIndex: '',
            dataList: [
                {
                    name: '年',
                    active: 'year'
                },
                {
                    name: '月',
                    active: 'month'
                }
            ]
        }
    },
    mounted() {
        this.currentIndex = this.active
    },
    methods: {
        onSwitch(data) {
            this.currentIndex = data.active
            this.$emit('change', data)
        }
    }
}
</script>
<style lang="scss" scoped>
.bigdata-switch-box {
    display: flex;

    .bigdata-switch-button {
        width: 0.75rem;
        height: 0.416rem;
        // padding: 0 0.291rem;
        font-size: 0.166rem;
		line-height: 0.416rem;
        color: #edf7ff;
        text-align: center;
		cursor: pointer;
        background-color: #0c3560;
        border: 1px solid #1f395a;/*no*/
        border-radius: 3px;
    }
    .bigdata-_active {
        font-weight: 600;
        color: #fff;
        background: linear-gradient(#14f6db, #3028f3);
        border: 1px solid #14f6db;/*no*/
    }
}
</style>
