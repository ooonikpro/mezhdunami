<template>
  <button
    type="button"
    :class="rootClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    outline: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    small: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const rootClasses = computed(() => ({
      small: props.small,
      outline: props.outline,
      h3: true,
    }));

    return {
      rootClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
  button {
    width: 100%;
    height: 6.4rem;
    border: none;
    background-color: $color-pink-700;
    border: 1px solid transparent;
    color: $color-white;
    outline: none;
    border-radius: 4px;
    text-align: left;
    padding: 2.4rem 1.2rem 1rem;
    cursor: pointer;
    @include transition;

    &.outline {
      background-color: transparent;
      border-color: rgba($color-pink-700, .5);
      color: $color-pink-700;
    }

    &.small {
      padding-top: 0;
      padding-bottom: 0;
      height: 4.6rem;
    }

    &.disabled,
    &:disabled,
    &[disabled] {
      cursor: not-allowed;
      border-color: transparent;
      color: rgba($color-pink-700, 0.5);

      &:not(.outline) {
        background-color: rgba($color-pink-700, 0.1);
      }
    }
  }
</style>
