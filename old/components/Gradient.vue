<template>
  <div class="gradient"></div>
</template>

<style lang="scss" scoped>
.gradient {
  position: absolute;
  inset: 0;
  z-index: 0;
  @include gradient;
}
</style>
