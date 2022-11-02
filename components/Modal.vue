<template>
    <ClientOnly>
        <Teleport to=".modals">
            <transition
                name="slide-down"
                @after-leave="emit('after-leave')"
                appear
            >
                <div v-if="props.isOpen" class="modal">
                    <NuxtLayout>
                        <template #before-title>
                            <slot name="before-title" />
                        </template>

                        <template #default>
                            <slot />
                        </template>

                        <template #title>
                            <slot name="title" />
                        </template>
                    </NuxtLayout>
                </div>
            </transition>
        </Teleport>
    </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["after-leave", "close"]);
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
    transition: transform 250ms ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(100%);
}
</style>
