<template>
  <div v-if="isShow" class="patient-sticker" :style="styles" @click="$emit('open-modal', data)">
    <b class="h5">{{ procedures }}</b>
    <span class="h6">{{ name }}</span>
    <span class="h6">{{ phone }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { PatientFormData } from '@/types';
import { getNames, getTotalDurationInHours } from '@/utils';

export default defineComponent({
  props: {
    data: {
      type: Object as () => PatientFormData,
      default: () => ({}),
    },
  },

  setup(props) {
    const isShow = computed(() => Object.keys(props.data).length);
    const name = computed(() => props.data?.name);
    const phone = computed(() => props.data?.phone);
    const procedures = computed(() => getNames(props.data?.procedures || []));
    const duration = computed(() => getTotalDurationInHours(props.data?.procedures));

    const colors = ['#be99ff', '#56accc8c', '#e77f9f', '#cf7fe7', '#7fe7c9', '#d2bce0', '#e7927f', '#cc5677'];
    const color = computed(() => colors[(props.data?.procedures?.length || 1)]);

    const styles = computed(() => ({
      height: `${100 * duration.value}%`,
      'background-color': color.value,
    }));

    return {
      isShow,
      name,
      phone,
      procedures,
      color,
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.patient-sticker:not(:empty) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.8rem;
  color: black;
  border-radius: 4px;
}
</style>
