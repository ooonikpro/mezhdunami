<template>
  <div class="doctor-details" :class="{ reverted: props.reverted }">
    <span class="h6">Врач-косметолог</span>
    <p class="h3">
      Овечкина
    </p>
    <p>Елена Максимовна</p>
  </div>
</template>

<script lang="ts" setup>
interface DoctorDetailsProps {
    reverted?: boolean;
}

const props = defineProps<DoctorDetailsProps>();
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
