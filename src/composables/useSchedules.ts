import { computed } from 'vue';
import { useCalendar } from '@/composables/useCalendar';

const URL = '/api/schedules';

export const useSchedules = () => {
    const { getScheduleForMonth } = useCalendar();

    const { data, refresh: refreshSchedule, pending: isLoading } = useFetch<Tech.ResponseAPI<Tech.ScheduleFilters>>(URL);

    const excludedDates = computed(() => data.value.data.excludedDates || []);

    const schedule = computed(() => getScheduleForMonth({ excludedDates: excludedDates.value }))

    const addToSchedule = async (formData: Tech.PatientFormData) => {
        const { data, execute } = useFetch(URL, {
            method: 'POST',
            body: formData
        });

        await execute();

        if (!data.value.success) {
            throw new Error(data.value.message);
        }

        return true
    };

    return {
        isLoading,
        schedule,
        refreshSchedule,
        addToSchedule,
    }
}
