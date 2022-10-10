<template>
    <ClientOnly>
        <Teleport to=".modals">
            <transition name="slide-down" appear>
                <div v-if="isOpen" class="modal">
                    <NuxtLayout>
                        <slot />
                    </NuxtLayout>
                </div>
            </transition>
        </Teleport>
    </ClientOnly>
</template>

<script lang="ts" setup>
const { isOpen } = defineProps<{ isOpen: boolean }>();
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    inset: 0;
    z-index: 999;
    background-color: $color-pink-100;
}

.slide-down-enter-active,
.slide-down-leave-active {
    @include transition;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-100%);
}
</style>
