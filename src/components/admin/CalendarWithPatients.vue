<template>
  <CalendarBase :from="from" :until="until" fullWidth>
    <template v-slot="{ date, hour }">
      <CalendarPatientSticker :data="getData(date, hour)" @open-modal="openModal"/>
    </template>
  </CalendarBase>

  <CalendarPatientStickerModal
    v-if="modalFormData"
    :isOpen="isOpenCalendarPatientStickerModal"
    :formData="modalFormData"
    @update:formData="onUpdateScheduleItem"
    @delete:formData="onDeleteScheduleItem"
    @close="closeModal"
  />
</template>

<script lang="ts">
import {
  defineComponent, ref, nextTick, computed,
} from 'vue';
import CalendarBase from '@/components/CalendarBase.vue';
import CalendarPatientSticker from '@/components/admin/CalendarPatientSticker.vue';
import CalendarPatientStickerModal from '@/components/admin/CalendarPatientStickerModal.vue';
import { PatientFormData } from '@/types';
import { createDate } from '@/utils';
import { useAdminCalendar } from '@/composables/useAdminCalendar';

export default defineComponent({
  components: {
    CalendarBase,
    CalendarPatientSticker,
    CalendarPatientStickerModal,
  },

  emits: ['update:formData', 'delete:formData'],

  setup() {
    const {
      from,
      until,
      schedule,
      nonWorkingDates,
      onUpdateScheduleItem,
      onDeleteScheduleItem,
    } = useAdminCalendar();

    const getData = (date: Date, hour: number) => schedule.value[createDate(date, hour).getTime()];

    const modalFormData = ref<PatientFormData>();
    const isOpenCalendarPatientStickerModal = ref(false);

    const openModal = (formData: PatientFormData) => {
      modalFormData.value = formData;

      nextTick(() => {
        isOpenCalendarPatientStickerModal.value = true;
      });
    };

    const closeModal = () => {
      isOpenCalendarPatientStickerModal.value = false;
    };

    const excludedDates = computed(() => Object.keys(nonWorkingDates.value).map(Number));

    return {
      from,
      until,
      modalFormData,
      isOpenCalendarPatientStickerModal,
      schedule,
      excludedDates,
      getData,
      openModal,
      closeModal,
      onUpdateScheduleItem,
      onDeleteScheduleItem,
    };
  },
});
</script>
