<template>
    <div class="layout">
        <Gradient v-if="withGradient" />

        <div class="layout-container">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { setAnimate } = usePageAnimation();
const setBodyColor = useBodyBg();
const { withGradient } = defineProps({
    withGradient: {
        type: Boolean,
        default: false,
    },
});

onBeforeMount(() => {
    if (withGradient) {
        setBodyColor("#F3BAB3");
    } else {
        setBodyColor("white");
    }
});

onMounted(() => {
    setTimeout(() => setAnimate(false), 500);
});
</script>

<style lang="scss" scoped>
.layout {
    position: absolute;
    inset: 0;
    background-color: $color-white;
    overflow: hidden;
    z-index: 2;

    &::before,
    &::after {
        top: -5rem;
        content: "";
        position: absolute;
        z-index: 1;
        display: block;
        mix-blend-mode: multiply;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    &:before {
        left: -5rem;
        width: 23rem;
        height: 43rem;
        background-image: url("@/assets/img/pero-1.png");
        opacity: 0.7;
    }

    &::after {
        right: -5rem;
        width: 23rem;
        height: 39rem;
        background-image: url("@/assets/img/pero-2.png");
    }
}

.layout-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 2.4rem 1.2rem;

    &::-webkit-scrollbar {
        width: 0;
        opacity: 0;
    }
}
</style>
