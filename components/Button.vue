<template>
  <button type="button" :class="rootClasses" :disabled="disabled" class="h3">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const { outline, disabled } = defineProps({
  outline: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const rootClasses = computed(() => ({
  outline,
}));
</script>

<style lang="scss" scoped>
button {
  width: 100%;
  height: 6.4rem;
  border: none;
  background-color: $color-pink-700;
  color: $color-white;
  outline: none;
  border-radius: 4px;
  text-align: left;
  padding: 2.4rem 1.2rem 1rem;
  cursor: pointer;

  &.outline {
    height: 4.6rem;
  }
}
</style>
