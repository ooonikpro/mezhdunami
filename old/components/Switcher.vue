<template>
  <div class="switcher"
:class="{ small }">
    <div
      v-for="option in props.options"
      :key="option.value"
      :class="['option', { active: props.modelValue === option.value }]"
      @click="setActive(option.value)"
    >
      <span class="h4">{{ option.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SwithcerProps {
    options: Array<LabelValue<any>>;
    modelValue: any;
    small?: boolean;
}

const props = defineProps<SwithcerProps>();

const emit = defineEmits(["update:modelValue"]);
const setActive = (value: any) => emit("update:modelValue", value);
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
