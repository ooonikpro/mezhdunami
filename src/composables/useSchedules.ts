import { computed, ref } from 'vue';
import type { PatientFormData, ResponseAPI, ScheduleFilters } from '@/types';
import { useCalendar } from '@/composables/useCalendar';
import { addToSchedule, fetchScheduleFilter } from '@/providers/guest/schedule.provider';

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

  const insertOneSchedule = async (formData: PatientFormData) => {
    const res = await addToSchedule(formData);

    fetchData();

    return res;
  };

  return {
    fetchData,
    isLoading,
    schedule,
    insertOneSchedule,
  };
};
