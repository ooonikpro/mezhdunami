<template>
  <div id="app">
    <Gradient />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { isAnimate } = usePageAnimation();

onBeforeMount(() => {
  watch(
    isAnimate,
    () => {
      if (isAnimate.value) {
        document.documentElement.classList.add("page-animate");
      } else {
        document.documentElement.classList.remove("page-animate");
      }
    },
    { immediate: true }
  );
});
</script>
