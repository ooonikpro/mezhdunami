<template>
  <div class="patient-card-mini" :class="[gender]">
    <div class="card-name">
      <p class="phone">{{ phone }}</p>
      <p class="name h3">{{ name }} {{ lastName }}</p>
    </div>

    <span class="created-at">От {{ getLocaleDate(createdAt) }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Patient } from '@/types';
import { useCalendar } from '@/composables/useCalendar';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<Patient['name']>,
      required: true,
    },

    lastName: {
      type: String as PropType<Patient['lastName']>,
      required: true,
    },

    phone: {
      type: String as PropType<Patient['phone']>,
      required: true,
    },

    gender: {
      type: String as PropType<Patient['gender']>,
      required: true,
    },

    createdAt: {
      type: Date as PropType<Patient['createdAt']>,
      required: true,
    },
  },

  setup() {
    const { getLocaleDate } = useCalendar();

    return {
      getLocaleDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.patient-card-mini {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem;
  border-radius: 4px;
  cursor: pointer;

  &.female {
    background-color: rgba(pink, 0.3);
  }

  &.male {
    background-color: rgba(blue, .5);
  }
}

.card-name {
  position: relative;
  bottom: -0.8rem;
}

.created-at {
  text-align: right;
  font-size: 1rem;
}
</style>
