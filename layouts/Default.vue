<template>
  <div class="layout">
    <Gradient v-if="withGradient" />

    <div class="layout-container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { withGradient } = defineProps({
  withGradient: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: $color-pink-100;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    display: block;
    opacity: 0.5;
    mix-blend-mode: multiply;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:before {
    top: -5rem;
    left: 0;
    width: 23rem;
    height: 43rem;
    background-image: url("@/assets/img/pero-1.png");
    animation: layout-1 10s ease infinite;
  }

  &::after {
    top: 0;
    right: 0;
    width: 23rem;
    height: 39rem;
    background-image: url("@/assets/img/pero-2.png");
    animation: layout-2 10s ease infinite;
  }
}

.layout-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  overflow-x: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
    opacity: 0;
  }
}

@keyframes layout-1 {
  50% {
    transform: translate(-1rem, 1rem) rotate(10deg);
  }

  to {
    transform: translate(0, 0);
  }
}

@keyframes layout-2 {
  50% {
    transform: translate(1rem, -1rem) rotate(-10deg);
  }

  to {
    transform: translate(0, 0);
  }
}
</style>
