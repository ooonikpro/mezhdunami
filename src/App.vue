<template>
  <router-view v-slot="{ Component }">
    <transition name="page">
      <component :is="Component" />
    </transition>
  </router-view>

  <div class="modals" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from 'vue';
import { usePageAnimation } from '@/composables/usePageAnimation';

export default defineComponent({
  setup() {
    const { isAnimate, isReverse } = usePageAnimation();

    onBeforeMount(() => {
      watch(
        isAnimate,
        () => {
          if (isAnimate.value) {
            document.documentElement.classList.add('page-animate');
          } else {
            document.documentElement.classList.remove('page-animate');
          }
        },
        { immediate: true },
      );

      watch(
        isReverse,
        () => {
          if (isReverse.value) {
            document.documentElement.classList.add('reversed');
          } else {
            document.documentElement.classList.remove('reversed');
          }
        },
        { immediate: true },
      );
    });
  },
});
</script>

<style lang="scss">
  @import "@/assets/css/main.scss";
</style>
