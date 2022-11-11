<template>
  <div
    class="switcher"
    :class="{ small }"
  >
    <div
      v-for="option in options"
      :key="option.value"
      :class="['option', { active: modelValue === option.value }]"
      @click="setActive(option.value)"
    >
      <span class="h4">{{ option.label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import type { LabelValue } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array as () => LabelValue<any>[],
      required: true,
    },

    modelValue: {
      required: true,
    },

    small: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const setActive = (value: any) => emit('update:modelValue', value);

    return {
      setActive,
    };
  },
});
</script>

<style lang="scss" scoped>
  .switcher {
    display: flex;
    gap: 0.4rem;
    border: 1px solid rgba($color-pink-700, 0.1);
    height: 6.4rem;
    border-radius: 4px;
    padding: 0.4rem;
    overflow: hidden;

    &.small {
      height: 4rem;
      padding: 0.1rem;

      .option {
        border-radius: 4px;
        line-height: 3.8rem;
      }
    }
  }

  .option {
    position: relative;
    flex: 1 1 50%;
    cursor: pointer;
    border-radius: 4px;
    @include transition;
    text-align: center;
    line-height: 5.8rem;

    &.active {
      background-color: $color-pink-700;
      cursor: auto;

      span {
        color: $color-white;
      }
    }
  }
</style>
