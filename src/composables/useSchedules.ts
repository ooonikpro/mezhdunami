import axios from 'axios';
import { computed, ref } from 'vue';
import { useCalendar } from '@/composables/useCalendar';

const URL = '/api/schedules';

const excludedDates = ref<ScheduleFilters['excludedDates']>([]);
const isLoading = ref(false);

export const useSchedules = () => {
  const { getScheduleForMonth } = useCalendar();

  const fetchData = async () => {
    isLoading.value = true;

    try {
      const response = await axios.get<ResponseAPI<ScheduleFilters>>(URL)
        .then(({ data }) => data);

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

  const addToSchedule = async (formData: PatientFormData) => {
    const response = await axios.post<ResponseAPI<boolean>>(URL, formData)
      .then(({ data }) => data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return true;
  };

  return {
    fetchData,
    isLoading,
    schedule,
    addToSchedule,
  };
};
