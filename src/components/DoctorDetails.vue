<template>
  <div
    class="doctor-details"
    :class="{ reverted: reverted }"
  >
    <span class="h6">Врач-косметолог</span>
    <p class="h3">
      Овечкина
    </p>
    <p>Елена Максимовна</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      reverted: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style lang="scss" scoped>
  .doctor-details {
    display: flex;
    flex-direction: column;
    font-size: 1.8rem;
    line-height: 1.1;

    &.reverted {
      text-align: right;
    }
  }
</style>
