<template>
    <button type="button" :class="rootClasses" :disabled="disabled">
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface Props {
    outline?: boolean;
    disabled?: boolean;
    small?: boolean;
}

const { outline, disabled, small } = defineProps<Props>();

const rootClasses = computed(() => ({
    small,
    outline,
    h3: true,
}));
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
        border-color: $color-pink-700;
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
