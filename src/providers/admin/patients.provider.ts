import axios from 'axios';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';
import { Patient, ResponseAPI } from '@/types';

const httpClient = axios.create({
  baseURL: BASE_ADMIN_API_URL(),
});

export const fetchAllPatients = async (query?: string): Promise<Patient[]> => {
  try {
    const response = await httpClient.get<ResponseAPI<Patient[]>>(ADMIN_API_URL.PATIENTS, {
      params: {
        query,
      },
    }).then(({ data }) => data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data.map((patient) => ({
      ...patient,
      createdAt: new Date(patient.createdAt),
    }));
  } catch (e) {
    console.error(e);
  }

  return [];
};
