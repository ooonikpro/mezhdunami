<template>
  <div class="head">
    <img
      src="@/assets/img/mezhdunami-pink.svg"
      alt="Между нами"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Head',
});
</script>

<style lang="scss" scoped>
.head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7.2rem;
    margin-bottom: 2.4rem;
    border-bottom: 1px solid rgba($color-pink-700, .5);

    img {
        width: 30rem;
    }
}
</style>
