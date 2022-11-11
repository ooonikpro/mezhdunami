<template>
  <div id="app">
    <NuxtPage />
    <div class="modals" />
  </div>
</template>

<script lang="ts" setup>
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
    { immediate: true }
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
    { immediate: true }
  );
});
</script>
