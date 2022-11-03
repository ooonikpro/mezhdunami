<template>
    <div ref="el" class="accordion" :class="{ open: isOpen }" :id="id">
        <a :href="link" class="accordion-head h3" @click="toggle">
            <h3 class="accordion-title">
                <slot name="title" />
            </h3>

            <i class="angle" :class="angleClasses">
                <svg
                    width="17"
                    height="34"
                    viewBox="0 0 17 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L16 17L1 33"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </i>
        </a>

        <transition name="expand">
            <div v-show="isOpen" class="accordion-body">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
interface AccordionProps {
    id: string;
}

const props = defineProps<AccordionProps>();
const route = useRoute();

const angleClasses = computed(() => ({
    up: isOpen.value,
    down: !isOpen.value,
}));

const link = computed(() => `#${props.id}`);

const isOpen = ref(false);
const el = ref<HTMLDivElement>();
const toggle = () => (isOpen.value = !isOpen.value);

onMounted(() => {
    isOpen.value = route.hash === link.value;

    if (isOpen.value) {
        el.value.scrollIntoView({ block: "start" });
    }
});
</script>


<style lang="scss" scoped>
.accordion {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include transition;
    gap: 1.6rem;
    color: $color-green-700;
    background-color: $color-pink-300;
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
    padding: 2.4rem 5.2rem 2.4rem 2.4rem;
    color: $color-pink-700;
}

.accordion-title {
    font-weight: 400;
    padding-right: 1rem;
}

.angle {
    position: absolute;
    top: 50%;
    bottom: 0;
    right: 2rem;
    transform-origin: center;
    @include transition;

    &.down {
        transform: translateY(-50%) scale(0.6) rotate(90deg);
    }

    &.up {
        transform: translateY(-50%) scale(0.6) rotate(-90deg);
    }
}

.accordion-body {
    padding: 0 2.4rem 2.4rem;

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
