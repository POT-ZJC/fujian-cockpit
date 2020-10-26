<template>
    <div class="module-title-box tc">
        <div class="module-title">{{ title }}</div>
        <div class=""></div>
        <div class="title-link"><i class="el-icon-right" /></div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '-'
        }
    }
}
</script>
<style lang="scss" scoped>
.module-title-box {
    position: relative;
    padding: 0.15rem 0.4167rem 0.1rem 0.2083rem;
    flex-shrink: 0;
}
.module-title {
    position: relative;
    width: 100%;
    // width: 0.7292rem;
    height: 0.2188rem;
    font-size: 0.1667rem;
    font-weight: 700;
    // line-height: 21px;
    letter-spacing: 1px;
    color: #fff;
    text-align: center;

    &::after {
        position: absolute;
        top: 0.2604rem;
        left: calc(50% - 0.3646rem);
        width: 0.7292rem;
        height: 2px;
        background: linear-gradient(
            68deg,
            rgba(2, 5, 42, 0) 0%,
            #00ffde 50%,
            rgba(2, 5, 42, 0) 100%
        );
        content: '';
    }
}
.title-link {
    position: absolute;
    top: 0.125rem;
    right: 0.125rem;
    height: 100%;
    font-size: 0.25rem;
    line-height: 100%;
    color: #21ded3;
}
</style>
