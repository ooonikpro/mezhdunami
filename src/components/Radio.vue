<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      v-model="localValue"
    >
    <span class="radio">

    </span>
    <span class="h4 label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      required: true,
    },

    modelValue: {
      type: [String, Number],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const localValue = computed({
      get() {
        return props.modelValue;
      },

      set(val) {
        emit('update:modelValue', val);
      },
    });

    return {
      localValue,
    };
  },
});
</script>

<style lang="scss" scoped>
  label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  .radio {
    flex: 0 0 auto;
    display: flex;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    border: 2px solid $color-pink-700;
    background: transparent;
    margin-right: 1.2rem;
    @include transition;

    &:after {
      content: "";
      width: 2rem;
      height: 2rem;
      display: block;
      border-radius: 2rem;
      margin: auto;
      background-color: $color-white;
      @include transition;
    }
  }

  input:checked ~ .radio {
    background-color: $color-pink-700;

    &:after {
      width: 1rem;
      height: 1rem;
    }
  }
</style>
