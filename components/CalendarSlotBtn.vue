<template>
    <button
        ref="button"
        class="calendar-slot-btn h4"
        :class="{ active: props.isSelected }"
    >
        <transition name="slide-left" mode="out-in">
            <span v-if="props.isSelected">Выбрано</span>

            <span v-else>Свободно</span>
        </transition>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps<{ isSelected: boolean }>();

const button = ref<HTMLButtonElement | null>(null);

onMounted(() => {
    if (props.isSelected) {
        setTimeout(() => {
            button.value.scrollIntoView({
                inline: "center",
                block: "nearest",
                behavior: "smooth",
            });
        }, 100);
    }
});
</script>


<style lang="scss" scoped>
.calendar-slot-btn {
    width: 14rem;
    height: 100%;
    background-color: $color-pink-700;
    border: 1px solid $color-pink-700;
    border-radius: 4px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    padding: 0.4rem 0.8rem;
    opacity: 1;
    cursor: pointer;
    @include transition;
    overflow: hidden;

    span {
        color: $color-white;
    }

    &.active {
        background-color: $color-white;

        span {
            color: $color-pink-700;
        }

        .slide-left-enter-active,
        .slide-left-leave-active {
            @include transition;
        }

        .slide-left-leave-to {
            opacity: 0;
            transform: translateY(-100%);
        }

        .slide-left-enter-from {
            opacity: 0;
            transform: translateY(100%);
        }
    }
}
</style>
