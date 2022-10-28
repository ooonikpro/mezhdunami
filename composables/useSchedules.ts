const URL = '/api/schedules';

export const useSchedules = () => {
    const fetchSchedule = () => useFetch<Tech.ResponseAPI<Tech.Schedule>>(URL);

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
        fetchSchedule,
        addToSchedule,
    }
}
