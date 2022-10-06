<template>
  <div class="switcher">
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

<script setup lang="ts">
const { options, modelValue } = defineProps<{
  options: Array<{ label: string; value: any }>;
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue"]);
const setActive = (value: any) => emit("update:modelValue", value);
</script>

<style lang="scss" scoped>
.switcher {
  display: flex;
  gap: 0.4rem;
  border: 1px solid rgba($color-pink-700, 0.25);
  height: 6.4rem;
  border-radius: 4px;
  padding: 0.4rem;
  overflow: hidden;
}

.option {
  position: relative;
  display: flex;
  flex: 1 1 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  @include transition;

  &.active {
    background-color: $color-pink-700;
    cursor: auto;

    span {
      color: $color-white;
    }
  }
}
</style>
