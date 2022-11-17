import { computed, ref } from 'vue';
import { useCalendar } from '@/composables/useCalendar';
import type { PatientFormData, ResponseAPI, ScheduleFilters } from '@/types';

const URL = '/api/schedules';

const excludedDates = ref<ScheduleFilters['excludedDates']>([]);
const isLoading = ref(false);

export const useSchedules = () => {
  const { getScheduleForMonth } = useCalendar();

  const fetchData = async () => {
    isLoading.value = true;

    try {
      const response = await fetch(URL).then<ResponseAPI<ScheduleFilters>>((response) => response.json());

      if (response.success) {
        excludedDates.value = response.data.excludedDates;
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      console.error(e);

      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const schedule = computed(() => getScheduleForMonth({ excludedDates: excludedDates.value }));

  const insertOneSchedule = async (formData: PatientFormData) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(formData),
    }).then<ResponseAPI<boolean>>((response) => response.json());

    if (!response.success) {
      throw new Error(response.message);
    }

    return true;
  };

  return {
    fetchData,
    isLoading,
    schedule,
    insertOneSchedule,
  };
};
