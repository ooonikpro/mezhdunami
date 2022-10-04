<template>
  <label :class="{ disabled, focused }">
    <span class="h5">{{ label }}</span>

    <input
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="notEdit"
      @focus="focused = true"
      @blur="focused = false"
      v-model="_value"
    />
  </label>
</template>

<script lang="ts" setup>
const { label, placeholder, disabled, modelValue, type } = defineProps({
  type: {
    type: String,
    default: "text",
    validator: (val: string) => ["text", "select", "phone"].includes(val),
  },

  label: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const notEdit = ref(false);
const focused = ref(false);

const _value = ref(modelValue);
</script>

<style lang="scss" scoped>
label {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
  height: 8rem;
  border: 1px solid rgba($color-pink-700, 0.25);
  border-radius: 4px;
  padding: 1rem 1.2rem;
  background-color: rgba($color-white, 0.2);
  @include transition;

  &.focused {
    border-color: $color-pink-700;
  }
}

span {
  width: 100%;
  font-weight: 300;
  margin-bottom: 1.2rem;
}

input {
  width: 100%;
  border: 0;
  outline: none;
  color: $color-pink-700;
  height: 2.4rem;
  background: none;
  font-size: 1.8rem;
  line-height: 2.4rem;

  &::placeholder {
    color: rgba($color-pink-700, 0.5);
  }
}
</style>
