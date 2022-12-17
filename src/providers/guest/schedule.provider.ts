import { ResponseAPI, PatientFormData, ScheduleFilters } from '@/types';
import axios from 'axios';
import { API_URL, BASE_API_URL } from '@/constants/urls';

const httpClient = axios.create({
  baseURL: BASE_API_URL(),
  validateStatus: (status) => status === 200,
});

export const fetchScheduleFilter = async () => {
  const { data, success, message } = await httpClient.get<ResponseAPI<ScheduleFilters>>(API_URL.SCHEDULE).then(({ data }) => data);

  if (success) {
    return data.excludedDates;
  }

  throw new Error(message);
};

export const addToSchedule = async (formData: PatientFormData) => {
  const { data, success, message } = await httpClient.post<ResponseAPI<boolean>>(API_URL.SCHEDULE, formData).then(({ data }) => data);

  if (success) {
    return data;
  }

  throw new Error(message);
};
