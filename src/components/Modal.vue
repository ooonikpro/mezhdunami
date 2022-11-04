<template>
  <Teleport to=".modals">
    <transition
      name="slide-down"
      appear
      @after-leave="$emit('after-leave')"
    >
      <div
        v-if="isOpen"
        class="modal"
      >
        <Layout>
          <template #before-title>
            <slot name="before-title" />
          </template>

          <template #default>
            <slot />
          </template>

          <template #title>
            <slot name="title" />
          </template>
        </Layout>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/layouts/Layout.vue';

export default defineComponent({
  components: {
    Layout,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['after-leave', 'close'],
});
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
