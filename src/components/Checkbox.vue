<template>
  <label>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    >
    <span class="checkbox">
      <i class="i-check">
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.7071 0.292893C20.0976 0.683417 20.0976 1.31658 19.7071 1.70711L7.5 13.9142L0.292893 6.70711C-0.0976311 6.31658 -0.0976311 5.68342 0.292893 5.29289C0.683417 4.90237 1.31658 4.90237 1.70711 5.29289L7.5 11.0858L18.2929 0.292893C18.6834 -0.0976311 19.3166 -0.0976311 19.7071 0.292893Z"
            fill="white"
          />
        </svg>
      </i>
    </span>
    <span class="h4 label">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
    },

    emits: ["update:modelValue"],
  });
</script>

<style lang="scss" scoped>
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  .checkbox {
    display: flex;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 4px;
    border: 1px solid $color-pink-700;
    background: transparent;
    margin-right: 1.2rem;
    @include transition;

    svg {
      margin: auto;
    }
  }

  .i-check {
    opacity: 0;
    @include transition;
  }

  input:checked ~ .checkbox {
    background-color: $color-pink-700;

    .i-check {
      opacity: 1;
    }
  }
</style>
