<template>
    <div class="sticky-bottom" :class="{ sticky: props.isSticky }">
        <slot />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ isSticky: boolean }>();
</script>


<style lang="scss" setup>
.sticky-bottom {
    margin-left: -1.2rem;
    margin-right: -1.2rem;
    background-color: $color-white;
    padding: 1.2rem 1.2rem 1.6rem 1.2rem;

    &.sticky {
        position: sticky;
        bottom: -7rem;
    }
}
</style>
