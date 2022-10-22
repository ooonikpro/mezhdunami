<template>
    <div class="accordion" :class="{ open: isOpen }">
        <div class="accordion-head h3" @click="toggle">
            <div class="accordion-title">
                <slot name="title" />
            </div>

            <img
                src="@/assets/img/angle.svg"
                class="angle"
                :class="angleClasses"
            />
        </div>

        <transition name="expand">
            <div v-if="isOpen" class="accordion-body">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
const angleClasses = computed(() => ({
    up: isOpen.value,
    down: !isOpen.value,
}));

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
</script>


<style lang="scss" scoped>
.accordion {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include transition;
    gap: 1.6rem;
    padding: 2.4rem 5.2rem 2.4rem 2.4rem;
    color: $color-green-700;
    background-color: $color-green-200;
    border-radius: 4px;
    max-height: 15rem;

    &.open {
        max-height: 500rem;
    }
}

.accordion-head {
    display: flex;
    position: relative;
    cursor: pointer;
}

.accordion-title {
    padding-right: 1rem;
}

.angle {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -2.7rem;
    margin: auto;
    transform-origin: center;
    @include transition;

    &.down {
        transform: scale(0.6) rotate(90deg);
    }

    &.up {
        transform: scale(0.6) rotate(-90deg);
    }
}

.accordion-body {
    &.expand-enter-active,
    &.expand-leave-active {
        @include transition;
    }

    &.expand-enter-from,
    &.expand-leave-to {
        opacity: 0;
        transform: translateY(-1rem);
    }
}
</style>
