export const useSchedule = () => {
    const URL = '/schedule';
    const { postRequest, getRequest } = useAPI();

    const addToSchedule = (formData: Tech.PatientFormData): Promise<boolean> => postRequest(URL, formData);

    const getCurrentSchedule = (): Promise<number[]> => getRequest(URL);

    return {
        addToSchedule,
        getCurrentSchedule,
    }
}
