<template>
    <div class="accordion">
        <div class="accordion-head h2" @click="toggle">
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
    min-height: 1;
    @include transition;
    gap: 1.6rem;
    padding: 2.4rem;
    color: $color-green-700;
    background-color: $color-green-200;
    border-radius: 4px;
}

.accordion-head {
    display: flex;
    position: relative;
    cursor: pointer;
}

.accordion-title {
    margin-right: 2.4rem;
}

.angle {
    position: absolute;
    top: 50%;
    right: 0;
    transform-origin: center;
    @include transition;

    &.down {
        transform: scale(0.8) translateY(-50%) rotate(90deg);
    }

    &.up {
        transform: scale(0.8) translateY(-50%) rotate(-90deg);
    }
}
</style>
