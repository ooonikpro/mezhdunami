import {
  ResponseAPI, PatientFormData, Patient,
} from '@/types';
import axios from 'axios';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';

const httpClient = axios.create({
  baseURL: BASE_ADMIN_API_URL(),
  validateStatus: (status) => status === 200,
});

export const fetchSchedule = async () => {
  const { data, success, message } = await httpClient.get<ResponseAPI<PatientFormData[]>>(ADMIN_API_URL.SCHEDULE).then(({ data }) => data);

  if (success) {
    return data;
  }

  throw new Error(message);
};

export const updatePatientFormData = async (formData: PatientFormData) => {
  const { data, success, message } = await httpClient.put<ResponseAPI<boolean>>(ADMIN_API_URL.SCHEDULE, formData).then(({ data }) => data);

  if (success) {
    return data;
  }

  throw new Error(message);
};

export const deletePatientFormData = async (id: Patient['_id']) => {
  const { data, success, message } = await httpClient.delete<ResponseAPI<boolean>>(`${ADMIN_API_URL.SCHEDULE}/${id}`).then(({ data }) => data);

  if (success) {
    return data;
  }

  throw new Error(message);
};
