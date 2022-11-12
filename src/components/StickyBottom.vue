<template>
  <div
    class="sticky-bottom"
    :class="{ sticky: isSticky }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isSticky: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
  .sticky-bottom {
    margin-left: -1.2rem;
    margin-right: -1.2rem;
    background-color: $color-pink-100;
    padding: 1.2rem 1.2rem 1.6rem 1.2rem;

    &.sticky {
      position: sticky;
      bottom: -2.4rem;

      @include fullscreen {
        bottom: 0rem;
      }
    }
  }
</style>
