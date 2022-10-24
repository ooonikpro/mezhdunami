export const useSchedules = () => {
    const URL = '/api/schedules';

    const { data: schedule, ...resultFetch } = useFetch(URL);

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
        ...resultFetch,
        data: computed(() => schedule.value.data),
        addToSchedule,
    }
}
