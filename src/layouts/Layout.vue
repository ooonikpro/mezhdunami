<template>
  <div
    class="layout"
    :class="{ white: !withGradient }"
  >
    <div class="layout-container">
      <template v-if="withGradient">
        <Logo class="logo" />
      </template>

      <template v-else>
        <Head v-if="!hideHead"/>
      </template>

      <slot name="before-title" />

      <h1 v-if="$slots.title?.().length" class="mb-24">
        <slot name="title" />
      </h1>

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Logo from '@/components/Logo.vue';
import Head from '@/components/Head.vue';

import { usePageAnimation } from '@/composables/usePageAnimation';

export default defineComponent({
  components: {
    Logo,
    Head,
  },

  props: {
    withGradient: {
      type: Boolean,
      default: false,
    },

    hideHead: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const { turnOffAnimation } = usePageAnimation();

    onMounted(turnOffAnimation);
  },
});
</script>

<style lang="scss" scoped>
  .layout {
    position: absolute;
    inset: 0;
    background-color: var(--bg-color);
    overflow: hidden;
    z-index: 2;

    &::before,
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      display: block;
      mix-blend-mode: multiply;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      transform: scale(1.5);
      opacity: 0.8;
    }

    &:before {
      top: 2rem;
      left: -12rem;
      width: 23rem;
      height: 43rem;
      background-image: url("@/assets/img/pero-1.webp");
    }

    &::after {
      top: 2rem;
      right: -7rem;
      width: 23rem;
      height: 39rem;
      background-image: url("@/assets/img/pero-2.webp");
      opacity: 0.6;
    }

    &.white {
      &::before,
      &::after {
        opacity: 0.2;
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
  h1 {
    text-align: center;
  }
</style>
