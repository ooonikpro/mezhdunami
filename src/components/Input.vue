<template>
  <label
    :class="rootClasses"
    class="input"
  >
    <span class="h5 label">{{ label }}</span>

    <IconTriangle
      v-if="isSelect"
      class="triangle"
    />

    <input
      ref="input"
      v-model="value"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="isSelect"
      :maxlength="maxlength"
      @focus="onFocus"
      @blur="onBlur"
    >

    <IconValid
      v-if="!disabled && isValid"
      class="status-valid"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import IconTriangle from '@/components/IconTriangle.vue';
import IconValid from '@/components/IconValid.vue';
import type { HTMLDateInputElement } from '@/types';

export default defineComponent({
  components: {
    IconTriangle,
    IconValid,
  },

  props: {
    type: {
      type: String,
      default: 'text',
      validator: (val: string) => ['text', 'select', 'tel', 'date'].includes(val),
    },

    label: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: String,
      default: null,
    },

    maxlength: {
      type: Number,
      default: null,
    },

    validator: {
      type: Function,
      default: (val: string) => !!val,
    },

    transform: {
      type: Function,
      default: (val: string) => val,
    },
  },

  emits: ['update:modelValue', 'focus', 'blur'],

  setup(props, { emit }) {
    const isSelect = computed<boolean>(() => props.type === 'select');
    const focused = ref(false);

    const value = computed({
      get() {
        return props.modelValue;
      },

      set(val: string) {
        emit('update:modelValue', props.transform(val));
      },
    });

    const isValid = computed(() => props.validator(value.value));

    const input = ref<HTMLDateInputElement>();

    const rootClasses = computed(() => ({
      disabled: props.disabled,
      focused,
      select: isSelect.value,
    }));

    const onFocus = () => {
      focused.value = true;
      input.value?.showPicker();
      emit('focus');
    };

    const onBlur = () => {
      focused.value = false;

      emit('blur');
    };

    const inputType = computed(() => {
      if (props.type === 'select') return 'text';

      return props.type;
    });

    return {
      rootClasses,
      isSelect,
      focused,
      isValid,
      value,
      onFocus,
      onBlur,
      inputType,
    };
  },
});
</script>

<style lang="scss" scoped>
  .input {
    position: relative;
    width: 100%;
    height: 8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid rgba($color-pink-700, 0.25);
    border-radius: 4px;
    background-color: rgba($color-white, 0.2);
    margin-bottom: 2.4rem;
    @include transition;

    &.focused {
      border-color: $color-pink-700;
    }

    &.select {
      &,
      * {
        cursor: pointer;
      }

      input {
        padding-left: 3.2rem;
      }
    }

    &.disabled {
      opacity: 0.5;

      &,
      * {
        cursor: not-allowed;
      }
    }
  }

  .label {
    position: absolute;
    top: 1rem;
    left: 1.2rem;
    width: 100%;
    font-weight: 300;
    margin-bottom: 1.2rem;
  }

  input {
    display: flex;
    align-items: flex-end;
    flex: 1 1 auto;
    height: 100%;
    border: 0;
    outline: none;
    color: $color-pink-700;
    background: none;
    font-size: 1.8rem;
    padding: 4.5rem 4rem 1rem 1.2rem;
    text-overflow: ellipsis;

    &::placeholder {
      color: rgba($color-pink-700, 0.5);
    }

    &[type="date"]::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }
  }

  .triangle {
    position: absolute;
    bottom: 1.6rem;
    left: 1.2rem;
    width: 1.2rem;
    height: 0.8rem;
    margin-right: 0.8rem;
  }

  .status-valid {
    position: absolute;
    bottom: 1.6rem;
    right: 1.2rem;
  }
</style>
