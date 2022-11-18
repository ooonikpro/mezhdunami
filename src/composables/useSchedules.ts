import { computed, ref } from 'vue';
import type { PatientFormData, ResponseAPI, ScheduleFilters } from '@/types';
import { useCalendar } from '@/composables/useCalendar';
import { addToSchedule, fetchScheduleFilter } from '@/providers/schedule.provider';

const excludedDates = ref<ScheduleFilters['excludedDates']>([]);
const isLoading = ref(false);

export const useSchedules = () => {
  const { getScheduleForMonth } = useCalendar();

  const fetchData = async () => {
    isLoading.value = true;
    excludedDates.value = await fetchScheduleFilter();
    isLoading.value = false;
  };

  const schedule = computed(() => getScheduleForMonth({ excludedDates: excludedDates.value }));

  const insertOneSchedule = (formData: PatientFormData) => addToSchedule(formData);

  return {
    fetchData,
    isLoading,
    schedule,
    insertOneSchedule,
  };
};
