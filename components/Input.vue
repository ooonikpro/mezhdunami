<template>
  <label :class="{ disabled, focused, select: isSelect }">
    <span class="label h5">{{ label }}</span>

    <span v-if="isSelect" class="triangle" />

    <input
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="isSelect"
      :maxlength="maxlength"
      @focus="onFocus"
      @blur="onBlur"
      v-model="value"
    />
  </label>
</template>

<script lang="ts" setup>
const { label, placeholder, disabled, modelValue, type } = defineProps({
  type: {
    type: String,
    default: "text",
    validator: (val: string) => ["text", "select", "tel"].includes(val),
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

const isSelect = computed(() => type === "select");
const focused = ref(false);

const _value = ref(modelValue);

const value = computed({
  get() {
    return _value.value;
  },

  set(val: string) {
    _value.value = val;

    emit("update:modelValue", _value.value);
  },
});

const onFocus = () => {
  focused.value = true;
};

const onBlur = () => {
  focused.value = false;

  if (type === "tel" && value.value) {
    value.value = value.value
      .replace(/\D/g, "")
      .split("")
      .reduce((p, n) => p.replace("x", n), "+x (xxx) xxx xx-xx");
  }
};

const inputType = computed(() => {
  if (type === "select") return "text";

  return type;
});

const maxlength = computed(() => {
  if (type === "tel") return 12;

  return null;
});
</script>

<style lang="scss" scoped>
label {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  border: 1px solid rgba($color-pink-700, 0.25);
  border-radius: 4px;
  padding: 1rem 1.2rem;
  background-color: rgba($color-white, 0.2);
  @include transition;

  &.focused {
    border-color: $color-pink-700;
  }

  &.select {
    &,
    * {
      cursor: pointer;
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
  width: 100%;
  font-weight: 300;
  margin-bottom: 1.2rem;
}

input {
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

.triangle {
  width: 1.2rem;
  height: 0.8rem;
  margin-right: 0.8rem;
  background: url("@/assets/img/triangle.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
