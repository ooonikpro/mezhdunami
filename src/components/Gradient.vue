<template>
  <div class="gradient" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Gradient',
});
</script>

<style lang="scss" scoped>
.gradient {
  position: absolute;
  inset: 0;
  z-index: 0;
  @include gradient;
}
</style>
