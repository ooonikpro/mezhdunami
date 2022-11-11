<template>
  <div class="layout" :class="{ white: !withGradient }">
    <Gradient v-if="withGradient" />

    <div class="layout-container">
      <template v-if="withGradient">
        <Logo class="logo" />
      </template>

      <template v-else>
        <Head />

        <slot name="before-title" />

        <h1 class="mb-24">
          <slot name="title" />
        </h1>
      </template>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { turnOffAnimation } = usePageAnimation();
const setBodyColor = useBodyBg();
const statusBar = useStatusBar();
const { withGradient } = defineProps({
  withGradient: {
    type: Boolean,
    default: false
  }
});

onBeforeMount(() => {
  if (withGradient) {
    setBodyColor('#F3BAB3');
    statusBar.setWhite();
  } else {
    setBodyColor('white');
    statusBar.setBlack();
  }
});

onMounted(turnOffAnimation);
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
        top: -3rem;
        content: "";
        position: absolute;
        z-index: 1;
        display: block;
        mix-blend-mode: multiply;
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(1.2);
    }

    &:before {
        left: -6rem;
        width: 23rem;
        height: 43rem;
        background-image: url("@/assets/img/pero-1.png");
        opacity: 0.7;
    }

    &::after {
        right: -4rem;
        width: 23rem;
        height: 39rem;
        background-image: url("@/assets/img/pero-2.png");
    }

    &.white {
        &::before,
        &::after {
            opacity: 0.4;
        }
    }
}

.layout-container {
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow-x: hidden;
    scroll-behavior: smooth;
    padding: 2.4rem 1.2rem;

    @include fullscreen {
        padding-bottom: 2.4rem;
    }

    &::-webkit-scrollbar {
        width: 0;
        opacity: 0;
    }
}

h2 {
    text-align: center;
}
</style>
